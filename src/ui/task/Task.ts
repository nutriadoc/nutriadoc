import TaskProgressEvent from "./TaskProgressEvent.ts";
import TaskSuccessEvent from "./TaskSuccessEvent.ts";
import TaskFailEvent from "./TaskFailEvent.ts";
import ITask from "./ITask.ts";

export default class Task extends EventTarget implements ITask {

  protected _tasks: ITask[] = []

  protected _resolve: Function | null = null

  protected _reject: Function | null = null

  protected _parent?: ITask

  public constructor(tasks: ITask[] = []) {
    super()
    this._tasks = tasks.map(task => { task.parent = this; return task })
  }

  protected async run(): Promise<void> {
  }

  async start(): Promise<void> {

    const promise = new Promise(async (resolve, reject): Promise<void> => {
      this._resolve = resolve
      this._reject = reject

      try {
        await this.run()
      } catch(e) {
        this.fail(e)
      }

      await this.startChildTasks()

      this.onChildrenComplete()

      this.success()
    })

    return promise.then(_ => {})
  }

  onChildrenComplete(): void {

  }

  protected async startChildTasks(): Promise<void> {

    for (let i = 0, length = this._tasks.length; i < length; i++) {
      const task = this._tasks[i]

      // TODO:
      task.addEventListener('progress', _ => {

      })

      try {
        await task.start()
      } catch (e) {
      } finally {
        this.progress(i + 1, length)
      }
    }
  }

  add(task: ITask): void {
    this._tasks.push(task)
  }

  cancel(): void {

  }

  progress(loaded: number, length: number): void {
    this.dispatchEvent(new TaskProgressEvent(loaded, length))
  }

  success(): void {
    this.dispatchEvent(new TaskSuccessEvent())
    this._resolve?.()
  }

  fail(e?: any): void {
    this.dispatchEvent(new TaskFailEvent(e))
    this._reject?.()
  }

  set parent(value: ITask) {
    this._parent = value
  }

  get parent(): ITask | undefined {
    return this._parent
  }

  find<T>(type: string): T {
    return this._tasks.find(t => t.constructor.name === type) as T
  }

  static new(callback: Function, tasks: ITask[] = []): Task {
    const task = new Task(tasks)
    task.run = async () => { callback() }
    return task
  }
}