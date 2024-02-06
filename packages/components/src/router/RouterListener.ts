import Cargo from "./Cargo"

export default interface RouterListener<T> {

  appear(route: Cargo<T>): void

  pop(removing: Cargo<T>, current: Cargo<T>): void
}