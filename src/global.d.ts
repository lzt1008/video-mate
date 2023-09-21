/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import type { Context } from './context'

declare global {
  var syncContext: Context
}

export * from 'chrome-types'
export {}
