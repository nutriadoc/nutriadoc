if (typeof process === 'undefined') {
  (window as any)['process'] = {
    env: {
      NODE_ENV: 'production'
    }
  }
}

export * from './main'
export * from './editor'
export * from './document'