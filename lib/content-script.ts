import { onMessage } from 'webext-bridge/content-script'
import { queryVideo } from '../src/sync'
import { OperationType } from '@/pages/popup/types'

// initSynchronizer()


// setInterval(async () => {
//   const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
//   await chrome.tabs.sendMessage(tab.id!, { greeting: 'hello' })
// }, 2000)

// interface Message {
//   op: OperationType
//   data: Record<string, any>
// }

(() => {
  const opMap = {
    [OperationType.queryVideo]: () => {
      return queryVideo()
    },
  }

  console.log(opMap)
  console.info('[video-mate] Hello world from content script')


  onMessage(OperationType.queryVideo, () => {
    return queryVideo()
  })

  onMessage(OperationType.message, () => {
    return {
      from: 'content-script',
    }
  })

})()
