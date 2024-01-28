import Task from "../Task.ts";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

class ExampleTask extends Task {

  public completed: boolean = false

  run(): Promise<void> {
    this.completed = true
    return super.run()
  }
}

class DelayTask extends Task {
  public completed: boolean = false

  async run(): Promise<void> {
    await delay(10)
    this.completed = true
    return super.run();
  }
}

class DelayThrowTask extends Task {
  async run(): Promise<void> {
    await delay(10)
    this.throwError()
  }

  protected throwError() {
    this.fail(new Error("test"))
  }
}

describe('Task', () => {
  it('should be tested', async () => {
    const task = new ExampleTask()
    await task.run()

    expect(task.completed).toBe(true)
  })

  it('should throw an instance of Error when running DelayThrowTask', async () => {
    const task = new DelayThrowTask()
    try {
      await task.run()
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })

  it('should ensure that DelayTask is completed', async () => {
    const delay = new DelayTask()
    const f = Task.new(() => {
      const task: DelayTask = tasks.find(DelayTask.name) as DelayTask
      expect(task.completed).toBeTruthy()
    })

    const tasks = new Task([delay, f])
    await tasks.start()
  })

  it("should successfully complete the task when calling the run method of DelayTask", async () => {
    const task = new DelayTask()
    await task.run()
    expect(task.completed).toBe(true)
  })

  it("should trigger the success event and set completed to true when calling the start method of DelayTask", (done) => {
    const task = new DelayTask()
    task.addEventListener('success', _ => {
      expect(task.completed).toBe(true)
      done()
    })
    task.start()

  })

  it("should ensure that task execution takes at least 20ms", (done) => {
    const start = Date.now()

    const task = new Task([
      new DelayTask(),
      new DelayTask(),
    ])

    task.addEventListener('success', () => {
      const exec = Date.now() - start
      expect(exec).toBeGreaterThanOrEqual(20)
      done()
    })
    task.start()


  })
})