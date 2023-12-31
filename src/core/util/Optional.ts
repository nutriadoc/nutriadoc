export default class Optional<T> {

  private readonly _value?: T

  constructor(value?: T) {
    this._value = value
  }

  orElse(defaultValue: T): T {
    return this._value ?? defaultValue
  }

  ifPresent(consumer: (value: T) => void): void {
    if (this._value) {
      consumer(this._value)
    }
  }

  isPresent(): boolean {
    return !!this._value
  }

  get(): T {
    if (this._value) {
      return this._value
    } else {
      throw new Error("No value present")
    }
  }

  static empty<T>(): Optional<T> {
    return new Optional<T>()
  }

  static of<T>(value: T): Optional<T> {
    return new Optional(value)
  }

  static ofNullable<T>(value: T | null | undefined): Optional<T> {
    return value == null ? new Optional<T>(value ?? undefined) : new Optional(value)
  }
}