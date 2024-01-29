import UploadService from "./service/UploadService.ts";
import Task from "../task/Task.ts";
import UploadTask from "./UploadTask.ts";
import { Optional } from "@nutriadoc/classes"
import { KeyFile } from "@/core"

export default class MockUploadService implements UploadService {

  protected tasks: Map<string, Task> = new Map()

  get(key: string): Optional<Task> {
    return Optional.ofNullable(this.tasks.get(key))
  }

  upload(_: KeyFile): Task {
    const task = new UploadTask(new File([], 'test'), "")
    let i = 0
    const handle = setInterval(() => {
      task.progress(i, 50)
      i++

      if (i > 50) {
        clearInterval(handle)
        task.success()
      }
    }, 20)

    return task
  }

}