import { sendMessage } from 'webext-bridge/content-script'
import { io } from 'socket.io-client'
import { createOperationMap } from './operation'
import type { Synchronizer } from '@/popup/types'
import { remoteOpGuard } from '@/context'

export enum VideoStatusType {
  play = 'play',
  pause = 'pause',
  seeked = 'seeked',
}

export function queryVideo(): HTMLVideoElement | null {
  return [...document.querySelectorAll('video')].sort((a, b) => a.height - b.height)[0] || null
}

export function genRandomRoomId() {
  return crypto.randomUUID().split('-').at(-1)!
}

export function joinRoom(id: string): Promise<Synchronizer> {
  return new Promise((resolve) => {
    const socket = io('wss://clear-sheep-19.deno.dev')
    socket.on('connect', () => {
      socket.emit('join-room', id)
      resolve({
        room: {
          id,
          messages: [],
          socketId: socket.id,
        },
        socket,
        videoEl: queryVideo() as HTMLVideoElement,
      })
    })
  })
}

export function initSynchronizer({ socket, videoEl }: Synchronizer) {
  const opMap = createOperationMap(videoEl)

  videoEl.onplay = remoteOpGuard(() => {
    socket.send({
      sender: {
        id: socket.id,
        username: socket.id,
      },
      op: 'play',
      data: { currentTime: videoEl.currentTime },
      timestamp: new Date().getTime(),
    })
  })

  videoEl.onpause = remoteOpGuard(() => {
    socket.send({
      sender: {
        id: socket.id,
        username: socket.id,
      },
      op: 'pause',
      data: { currentTime: videoEl.currentTime },
      timestamp: new Date().getTime(),
    })
  })

  videoEl.onseeked = remoteOpGuard(() => {
    socket.send({
      sender: {
        id: socket.id,
        username: socket.id,
      },
      op: 'seeked',
      data: { currentTime: videoEl.currentTime },
      timestamp: new Date().getTime(),
    })
  })

  socket.on('message', (data) => {
    opMap[data.op]?.(data)
    globalThis.sync.room.messages.push(data)
    console.log('socket: ', data)

    sendMessage('receive-ws', {
      ...data,
      socketId: socket.id,
    }, 'popup')
  })
}
