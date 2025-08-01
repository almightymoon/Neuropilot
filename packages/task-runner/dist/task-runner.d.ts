import { Task, TaskStep, TaskExecutionResult, TaskTemplate, TaskRunnerConfig } from './types';
export declare class TaskRunner {
    private tasks;
    private templates;
    private config;
    private runningTasks;
    constructor(config?: Partial<TaskRunnerConfig>);
    createTask(title: string, description: string, steps: Omit<TaskStep, 'id' | 'status'>[]): Task;
    createTaskFromTemplate(templateId: string, variables: Record<string, any>): Task | undefined;
    private substituteVariables;
    executeTask(taskId: string): Promise<TaskExecutionResult>;
    private executeSteps;
    private getExecutionOrder;
    private executeStep;
    private generateCode;
    private createFile;
    private analyzeCode;
    private runTests;
    private generateDocumentation;
    private executeCustomStep;
    private shouldRetryStep;
    private retryStep;
    private initializeDefaultTemplates;
    getTask(taskId: string): Task | undefined;
    getTasks(): Task[];
    getTemplates(): TaskTemplate[];
    cancelTask(taskId: string): boolean;
}
//# sourceMappingURL=task-runner.d.ts.map