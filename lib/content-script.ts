import { queryVideo } from '../src/sync'
import { OperationType } from '@/pages/popup/types'

// initSynchronizer()


// setInterval(async () => {
//   const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
//   await chrome.tabs.sendMessage(tab.id!, { greeting: 'hello' })
// }, 2000)

interface Message {
  op: OperationType
  data: Record<string, any>
}

const opMap = {
  [OperationType.queryVideo]: () => {
    return queryVideo()
  },
}

console.log(opMap)

chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
  console.log(message)

  sendResponse({
    video: opMap[message.op](),
  })
  // console.log(sender, message)
  // ;(async () => {
  //   const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  //   await chrome.tabs.sendMessage(tab.id!, { greeting: 'hello' })
  // })()
  // return true
})
