export interface Context {
  isRemoteOp: boolean
}

globalThis.syncContext = { isRemoteOp: false }

export function withRemote<T extends unknown[]>(fn: (...args: T) => any) {
  return (...args: T) => {
    globalThis.syncContext.isRemoteOp = true
    return fn(...args)
  }
}

export function remoteOpGuard<T extends unknown[]>(fn: (...args: T) => any) {
  return (...args: T) => {
    let res: ReturnType<typeof fn>
    if (!globalThis.syncContext.isRemoteOp) res = fn(...args)
    globalThis.syncContext.isRemoteOp = false
    return res
  }
}
