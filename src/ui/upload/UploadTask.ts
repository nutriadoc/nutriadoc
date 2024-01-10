import Task from "../task/Task.ts"
// import DataStore from "../../core/data/DataStore.ts";

export default class UploadTask extends Task {

  // protected dataStore: DataStore

  protected _file: File

  protected _endpoint: string

  public constructor(file: File, endpoint: string) {
    super()
    this._file = file
    this._endpoint = endpoint
  }

  public get file(): File {
    return this._file
  }

  async run(): Promise<void> {


    // this.dataStore.put(ref, blob).then(() => { })
  }

}