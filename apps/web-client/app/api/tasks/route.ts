import { NextRequest, NextResponse } from 'next/server'
import { TaskRunner } from '@neuropilot/task-runner'

const taskRunner = new TaskRunner({
  maxConcurrentTasks: 3,
  timeoutMs: 30000, // 30 seconds
  retryAttempts: 2
})

export async function POST(request: NextRequest) {
  try {
    const { taskType, parameters, template } = await request.json()

    if (!taskType) {
      return NextResponse.json(
        { error: 'Task type is required' },
        { status: 400 }
      )
    }

    // Create task from template
    const task = taskRunner.createTaskFromTemplate(template || 'default', parameters || {})
    
    if (!task) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 400 }
      )
    }

    // Execute the task
    const result = await taskRunner.executeTask(task.id)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Task Runner Error:', error)
    return NextResponse.json(
      { error: 'Failed to execute task' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const taskId = searchParams.get('taskId')

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      )
    }

    // Get task
    const task = taskRunner.getTask(taskId)
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: task.id,
      status: task.status,
      title: task.title,
      description: task.description,
      steps: task.steps,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    })
  } catch (error) {
    console.error('Task Status Error:', error)
    return NextResponse.json(
      { error: 'Failed to get task status' },
      { status: 500 }
    )
  }
} 