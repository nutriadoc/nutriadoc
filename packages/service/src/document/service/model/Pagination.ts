export default interface Pagination<T> {
  total: number

  currentPage: number

  lastPage: number

  pageSize: number

  data: T[]
}