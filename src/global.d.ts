/* eslint-disable no-var */
/* eslint-disable vars-on-top */

import type { Synchronizer } from './popup/types'

declare global {
  var currentTabId: number
  var sync: Synchronizer
}

export * from '@types/chrome'
export {}
