export default interface ITask extends EventTarget {

  start(): Promise<void>

  find<T>(type: string): T

  get parent(): ITask | undefined

  set parent(parent: ITask)

  get children(): ITask[]
}