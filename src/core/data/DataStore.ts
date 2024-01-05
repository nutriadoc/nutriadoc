export default interface DataStore {

  put<T>(key: string, data: T): Promise<void>

  get<T>(key: string): Promise<T>
}