export interface Task {
  id: string;
  title: string;
  description: string;
  steps: TaskStep[];
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface TaskStep {
  id: string;
  title: string;
  description: string;
  type: TaskStepType;
  status: TaskStepStatus;
  input?: any;
  output?: any;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
  dependencies?: string[]; // IDs of steps that must complete first
  metadata?: Record<string, any>;
}

export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
export type TaskStepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export type TaskStepType = 
  | 'code-generation'
  | 'file-creation'
  | 'code-analysis'
  | 'testing'
  | 'documentation'
  | 'custom';

export interface TaskExecutionResult {
  taskId: string;
  status: TaskStatus;
  steps: TaskStep[];
  totalSteps: number;
  completedSteps: number;
  failedSteps: number;
  output: Record<string, any>;
  error?: string;
  startedAt: Date;
  completedAt?: Date;
}

export interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: Omit<TaskStep, 'id' | 'status' | 'startedAt' | 'completedAt'>[];
  variables: TaskVariable[];
}

export interface TaskVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array';
  description: string;
  required: boolean;
  defaultValue?: any;
}

export interface TaskRunnerConfig {
  maxConcurrentTasks: number;
  maxStepsPerTask: number;
  timeoutMs: number;
  retryAttempts: number;
} 