import { v4 as uuidv4 } from 'uuid';
import {
  Task,
  TaskStep,
  TaskStatus,
  TaskStepStatus,
  TaskExecutionResult,
  TaskTemplate,
  TaskRunnerConfig,
} from './types';

export class TaskRunner {
  private tasks: Map<string, Task> = new Map();
  private templates: Map<string, TaskTemplate> = new Map();
  private config: TaskRunnerConfig;
  private runningTasks: Set<string> = new Set();

  constructor(config: Partial<TaskRunnerConfig> = {}) {
    this.config = {
      maxConcurrentTasks: 3,
      maxStepsPerTask: 20,
      timeoutMs: 300000, // 5 minutes
      retryAttempts: 2,
      ...config,
    };

    this.initializeDefaultTemplates();
  }

  // Task Management
  createTask(
    title: string,
    description: string,
    steps: Omit<TaskStep, 'id' | 'status'>[]
  ): Task {
    if (steps.length > this.config.maxStepsPerTask) {
      throw new Error(`Task cannot have more than ${this.config.maxStepsPerTask} steps`);
    }

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      steps: steps.map(step => ({
        ...step,
        id: uuidv4(),
        status: 'pending' as TaskStepStatus,
      })),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.set(task.id, task);
    return task;
  }

  createTaskFromTemplate(
    templateId: string,
    variables: Record<string, any>
  ): Task | undefined {
    const template = this.templates.get(templateId);
    if (!template) return undefined;

    // Validate required variables
    const missingVars = template.variables
      .filter(v => v.required && !(v.name in variables))
      .map(v => v.name);

    if (missingVars.length > 0) {
      throw new Error(`Missing required variables: ${missingVars.join(', ')}`);
    }

    // Substitute variables in step descriptions
    const steps = template.steps.map(step => ({
      ...step,
      id: uuidv4(),
      status: 'pending' as TaskStepStatus,
      description: this.substituteVariables(step.description, variables),
    }));

    return this.createTask(template.name, template.description, steps);
  }

  private substituteVariables(text: string, variables: Record<string, any>): string {
    return text.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
      return variables[varName]?.toString() || match;
    });
  }

  // Task Execution
  async executeTask(taskId: string): Promise<TaskExecutionResult> {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    if (this.runningTasks.size >= this.config.maxConcurrentTasks) {
      throw new Error('Maximum concurrent tasks reached');
    }

    this.runningTasks.add(taskId);
    task.status = 'running';
    task.updatedAt = new Date();

    const result: TaskExecutionResult = {
      taskId,
      status: 'running',
      steps: task.steps,
      totalSteps: task.steps.length,
      completedSteps: 0,
      failedSteps: 0,
      output: {},
      startedAt: new Date(),
    };

    try {
      await this.executeSteps(task, result);
      result.status = 'completed';
      result.completedAt = new Date();
      task.status = 'completed';
    } catch (error) {
      result.status = 'failed';
      result.error = error instanceof Error ? error.message : 'Unknown error';
      result.completedAt = new Date();
      task.status = 'failed';
    } finally {
      task.updatedAt = new Date();
      this.runningTasks.delete(taskId);
    }

    return result;
  }

  private async executeSteps(task: Task, result: TaskExecutionResult): Promise<void> {
    const executionOrder = this.getExecutionOrder(task.steps);

    for (const stepId of executionOrder) {
      const step = task.steps.find(s => s.id === stepId);
      if (!step) continue;

      try {
        step.status = 'running';
        step.startedAt = new Date();
        result.steps = task.steps; // Update reference

        const output = await this.executeStep(step);
        step.output = output;
        step.status = 'completed';
        step.completedAt = new Date();
        result.completedSteps++;

        // Add step output to result
        result.output[step.id] = output;
      } catch (error) {
        step.status = 'failed';
        step.error = error instanceof Error ? error.message : 'Unknown error';
        step.completedAt = new Date();
        result.failedSteps++;

        // Retry logic
        if (this.shouldRetryStep(step)) {
          await this.retryStep(step, result);
        } else {
          throw error;
        }
      }
    }
  }

  private getExecutionOrder(steps: TaskStep[]): string[] {
    const order: string[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (stepId: string) => {
      if (visiting.has(stepId)) {
        throw new Error('Circular dependency detected');
      }
      if (visited.has(stepId)) return;

      visiting.add(stepId);
      const step = steps.find(s => s.id === stepId);
      if (step?.dependencies) {
        for (const depId of step.dependencies) {
          visit(depId);
        }
      }
      visiting.delete(stepId);
      visited.add(stepId);
      order.push(stepId);
    };

    for (const step of steps) {
      if (!visited.has(step.id)) {
        visit(step.id);
      }
    }

    return order;
  }

  private async executeStep(step: TaskStep): Promise<any> {
    switch (step.type) {
      case 'code-generation':
        return await this.generateCode(step);
      case 'file-creation':
        return await this.createFile(step);
      case 'code-analysis':
        return await this.analyzeCode(step);
      case 'testing':
        return await this.runTests(step);
      case 'documentation':
        return await this.generateDocumentation(step);
      case 'custom':
        return await this.executeCustomStep(step);
      default:
        throw new Error(`Unknown step type: ${step.type}`);
    }
  }

  private async generateCode(step: TaskStep): Promise<any> {
    // This would integrate with the AI Core for code generation
    return {
      code: `// Generated code for: ${step.title}`,
      language: 'typescript',
      files: [`${step.title.toLowerCase().replace(/\s+/g, '-')}.ts`],
    };
  }

  private async createFile(step: TaskStep): Promise<any> {
    // This would create actual files in the workspace
    return {
      filePath: step.input?.filePath || 'generated-file.ts',
      content: step.input?.content || '// Generated file content',
      created: true,
    };
  }

  private async analyzeCode(step: TaskStep): Promise<any> {
    // This would analyze existing code
    return {
      analysis: `Analysis of ${step.title}`,
      issues: [],
      suggestions: [],
    };
  }

  private async runTests(step: TaskStep): Promise<any> {
    // This would run tests
    return {
      passed: true,
      totalTests: 1,
      passedTests: 1,
      failedTests: 0,
    };
  }

  private async generateDocumentation(step: TaskStep): Promise<any> {
    // This would generate documentation
    return {
      documentation: `Documentation for ${step.title}`,
      format: 'markdown',
    };
  }

  private async executeCustomStep(step: TaskStep): Promise<any> {
    // This would execute custom step logic
    return {
      customOutput: `Custom execution result for ${step.title}`,
    };
  }

  private shouldRetryStep(step: TaskStep): boolean {
    const retryCount = (step.metadata?.retryCount as number) || 0;
    return retryCount < this.config.retryAttempts;
  }

  private async retryStep(step: TaskStep, result: TaskExecutionResult): Promise<void> {
    const retryCount = ((step.metadata?.retryCount as number) || 0) + 1;
    step.metadata = { ...step.metadata, retryCount };
    
    // Wait before retry
    await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
    
    // Retry the step
    step.status = 'running';
    step.startedAt = new Date();
    step.error = undefined;

    const output = await this.executeStep(step);
    step.output = output;
    step.status = 'completed';
    step.completedAt = new Date();
    result.completedSteps++;
    result.failedSteps--;
  }

  // Template Management
  private initializeDefaultTemplates(): void {
    const templates: TaskTemplate[] = [
      {
        id: 'blog-api',
        name: 'Build Blog API',
        description: 'Create a complete blog API with CRUD operations',
        category: 'backend',
        variables: [
          { name: 'framework', type: 'string', description: 'Framework to use', required: true, defaultValue: 'express' },
          { name: 'database', type: 'string', description: 'Database type', required: true, defaultValue: 'postgres' },
        ],
        steps: [
          {
            title: 'Create Project Structure',
            description: 'Set up the basic project structure for {{framework}}',
            type: 'file-creation',
            input: { filePath: 'package.json' },
          },
          {
            title: 'Generate API Routes',
            description: 'Create CRUD routes for blog posts',
            type: 'code-generation',
            input: { language: 'typescript' },
          },
          {
            title: 'Create Database Schema',
            description: 'Generate database schema for {{database}}',
            type: 'code-generation',
            input: { language: 'sql' },
          },
          {
            title: 'Add Authentication',
            description: 'Implement JWT authentication',
            type: 'code-generation',
            input: { language: 'typescript' },
          },
        ],
      },
    ];

    templates.forEach(template => {
      this.templates.set(template.id, template);
    });
  }

  // Utility Methods
  getTask(taskId: string): Task | undefined {
    return this.tasks.get(taskId);
  }

  getTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getTemplates(): TaskTemplate[] {
    return Array.from(this.templates.values());
  }

  cancelTask(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task || task.status !== 'running') return false;

    task.status = 'cancelled';
    task.updatedAt = new Date();
    this.runningTasks.delete(taskId);
    return true;
  }
} 