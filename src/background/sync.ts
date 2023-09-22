import { randomUUID } from 'node:crypto'
import { onMessage, sendMessage } from 'webext-bridge/background'
import { type Socket, io } from 'socket.io-client'

export enum VideoStatusType {
  play = 'play',
  pause = 'pause',
  seeked = 'seeked',
}

export function genRandomRoomId() {
  return randomUUID().split('-').at(-1)!
}

export function joinRoom(id: string) {
  const socket = io('wss://clear-sheep-19.deno.dev')
    .on('connect', () => {
      socket.emit('join-room', id)
    })
  return socket
}

export function initSynchronizer(socket: Socket) {
  // from content-script
  onMessage<{ op: string; data: any }>('video-change', ({ data }) => {
    socket.send({
      op: data.op,
      data: data.data,
    })
  })

  // from server
  socket.on('message', (data) => {
    sendMessage('video-op', data, `content-script@${globalThis.currentTabId}`)
  })
}
