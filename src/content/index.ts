import { onMessage } from 'webext-bridge/content-script'
import type { Message } from '@/popup/types'
import { OperationType } from '@/popup/types'
import { queryVideo } from '@/sync'
import { initSynchronizer, joinRoom } from '@/content/sync'

console.info('[video-mate] Hello world from content script')

onMessage(OperationType.queryVideo, () => {
  return queryVideo()
})

onMessage(OperationType.joinRoom, async (message) => {
  const sync = await joinRoom(message.data.roomId)
  globalThis.sync = sync
  initSynchronizer(sync)

  return sync.room
})

onMessage(OperationType.queryRoom, () => {
  return globalThis.sync?.room
})

onMessage(OperationType.message, (msg) => {
  const socket = globalThis.sync.socket
  console.log(socket)
  const message: Message = {
    op: 'message',
    sender: {
      id: socket.id,
      username: 'haha',
    },
    data: {
      message: msg.data,
    },
    timestamp: new Date().getTime(),
  }
  socket.send(message)
  return message
})
