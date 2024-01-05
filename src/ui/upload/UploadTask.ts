import Task from "../task/Task.ts"
// import DataStore from "../../core/data/DataStore.ts";

export default class UploadTask extends Task {

  // protected dataStore: DataStore

  protected _file: File

  public constructor(file: File) {
    super()
    this._file = file
  }

  public get file(): File {
    return this._file
  }

  async run(): Promise<void> {


    // this.dataStore.put(ref, blob).then(() => { })
  }

}