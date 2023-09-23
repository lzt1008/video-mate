import { onMessage } from 'webext-bridge/content-script'
import { OperationType } from '@/popup/types'
import { queryVideo } from '@/sync'

console.info('[video-mate] Hello world from content script')

onMessage(OperationType.queryVideo, () => {
  return queryVideo()
})
