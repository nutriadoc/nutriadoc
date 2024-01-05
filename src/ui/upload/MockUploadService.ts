import UploadService from "./UploadService.ts";
import Task from "../task/Task.ts";
import UploadTask from "./UploadTask.ts";
import Optional from "../../core/util/Optional.ts";

export default class MockUploadService implements UploadService {

  protected tasks: Map<string, Task> = new Map()

  get(key: string): Optional<Task> {
    return Optional.ofNullable(this.tasks.get(key))
  }

  upload(_: File, __?: string): Task {
    const task = new UploadTask(new File([], 'test'))
    let i = 0
    const handle = setInterval(() => {
      task.progress(i, 100)
      i++

      if (i > 100) {
        clearInterval(handle)
        task.success()
      }
    }, 100)

    return task
  }

}