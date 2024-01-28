import * as EventEmitter from "eventemitter3"

const _bindings: WeakMap<object, Bindable> = new WeakMap<object, Bindable>()

export interface Bindable {

  parent?: object

  target?: object,

  property?: any,

  events: EventEmitter.EventEmitter
}

function isPrimitive(value: any): boolean {
  let is =  typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
  if (is) return is
  is = value instanceof String || value instanceof Number || value instanceof Boolean
  return is
}

function toObject(value: any): any {
  if (typeof value === 'string') {
    return new String(value)
  }
  if (typeof value === 'number') {
    return new Number(value)
  }
  if (typeof value === 'boolean') {
    return new Boolean(value)
  }
  return value
}

function copyListeners(target:any, key: string | number | symbol, oldValue: any, newValue: any) {
  const oldBinding = getBinding(oldValue)
  const listeners = oldBinding?.events?.listeners("change")
  oldBinding?.events?.removeAllListeners("change")

  const binding = getBinding(newValue)
  listeners?.forEach?.((listener: any) => binding?.events?.addListener?.('change', listener))
  binding?.events?.emit('change', target, key, newValue, oldValue)
}

function destroy(target: any, key: string | number | symbol, oldValue: any, newValue: any) {
  const binding = getBinding(target)
  if (!binding) return
  binding.events.emit('change', key, oldValue, newValue)
  binding.events.removeAllListeners("change")
}

function set(proxy: object, target: any, p: string | symbol, newValue: any, _: any): boolean {
  const key = p as keyof any

  const anyProxy = proxy as any
  const oldValue = anyProxy[key]

  newValue = _bind(proxy, toObject(newValue))
  target[key] = newValue

  const binding = getBinding(proxy)

  binding?.events?.emit('change', target, key, newValue, oldValue)

  const propertyIsNull = newValue == null
  if (!propertyIsNull)
    copyListeners(target, key, oldValue, newValue)
  else {
    destroy(oldValue, key, oldValue, newValue)
  }

  return true
}

// This function is used to explore the object and bind all the properties
function explore(target: any, proxy: any) {
  if (isPrimitive(target)) return
  Object.keys(target).forEach(key => {
    const k = key as keyof object
    target[k] = _bind(proxy, target[k], key)
  })
}

function _bind(parent: object | undefined, target: any, property?: any/*, aProxy?: any, property?: any*/): any {
  if (target === undefined) return undefined

  let t: any = toObject(target)
  const proxy = new Proxy(
    t,
    {
      get(target: object, property) {
        const key = property as keyof object
        const value = target[key]
        const binding = getBinding(proxy)

        if (typeof binding?.target?.[key] === 'function') {
          return function() {
            return (target[key] as any)!.apply(target, arguments)
          }
        }
        return value
      },
      set(target: object, p: string | symbol, newValue: any, _: any): boolean {
        return set(proxy, target, p, newValue, _)
      },
      apply(target: any, thisArg: any, argArray: any[]): any {
        return target.apply(thisArg, argArray)
      }
    }
  )

  setupBinding(parent, proxy, target, property)
  explore(target, proxy)

  return proxy
}

export function getBinding(target: any): Bindable | undefined {
  return _bindings.get(target)
}

function setupBinding(parent: object | undefined, proxy: any, target: any, property?: any) {
  const bindable = {
    parent,
    target: target,
    events: new EventEmitter.EventEmitter(),
    property
  }

  _bindings.set(proxy, bindable)
  return bindable
}

function copyPropertyValue(from: any, to: any) {
  const fromBinding = getBinding(from)
  if (fromBinding === undefined) {
    return
  }

  fromBinding.events.on("change", (_: any, key: string | number | symbol, newValue: any, __: any) => {

    if (key !== fromBinding.property)
      return

    const bindingOfProperty = getBinding(newValue)
    if (!bindingOfProperty) {
      console.warn("No binding found for value", newValue)
      return
    }
    const property = bindingOfProperty.target

    if (to[key]) {
      to[key] = property
      return
    }

    const bindingOfTo = getBinding(to)
    if (!bindingOfTo) {
      console.warn("No binding found for to", to)
      return
    }
    const objectOfProperty = bindingOfTo.parent as any
    if (!objectOfProperty) {
      console.warn("No binding found for the object of to", objectOfProperty)
      return
    }
    objectOfProperty[key] = property
  })
}

export function bind<T>(target: T | undefined, onChange?: any): T {
  if (typeof onChange === 'function') {
    const binding = getBinding(target)
    binding?.events?.on('change', onChange)
    return target as T
  } else if (onChange !== undefined) {
    copyPropertyValue(target, onChange)
    return target as T
  }

  return _bind(undefined, target)
}

export function change(target: any, value: any): any {
  const binding = getBinding(target)
  if (binding === undefined) {
    return
  }
  const proxyValue = bind(value)
  const bindingOfValue = getBinding(proxyValue)!


  bindingOfValue.events = binding.events

  _bindings.delete(proxyValue)
  _bindings.set(proxyValue, bindingOfValue)

  bindingOfValue.events.emit('change', proxyValue, undefined, binding.target, bindingOfValue.target)

  return proxyValue
}

export function isBinding(target: any): boolean {
  return _bindings.has(target)
}