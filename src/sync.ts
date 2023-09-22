import { remoteOpGuard } from './context'
import { createOperationMap } from './background/operation'
import { socket } from './background/socket'

export function queryVideo(): HTMLVideoElement | null {
  return [...document.querySelectorAll('video')].sort((a, b) => a.height - b.height)[0] || null
}

export function initSynchronizer() {
  const v = queryVideo()

  if (!v) return

  const opMap = createOperationMap(v)

  v.onplay = remoteOpGuard(() => {
    socket.send({ op: 'play' })
  })

  v.onpause = remoteOpGuard(() => {
    socket.send({ op: 'pause' })
  })

  v.onseeked = remoteOpGuard(() => {
    socket.send({
      op: 'seeked',
      data: { currentTime: v.currentTime },
    })
  })

  socket.on('connect', () => {
    socket.emit('join-room', 'abc123')
  })

  socket.on('message', (data) => {
    console.log(socket.id, data)
    opMap[data.op]?.(data.data)
  })
}
