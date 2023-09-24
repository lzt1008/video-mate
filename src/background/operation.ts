import { withRemote } from '../context'
import type { Message } from '@/popup/types'

function calcDelay(timestamp: number) {
  const currentTimestamp = new Date().getTime()
  const delayMs = currentTimestamp - timestamp
  return delayMs / 1000
}  

export function createOperationMap(video: HTMLVideoElement) {
  const opMap: Record<string, (data: Message) => void> = {
    play: (data) => {
      video.currentTime = data.data.currentTime + calcDelay(data.timestamp)
      video.play()
    },
    seeked: (data) => {
      video.currentTime = data.data.currentTime + calcDelay(data.timestamp)
    },
    pause: (data) => {
      video.currentTime = data.data.currentTime + calcDelay(data.timestamp)
      video.pause()
    },
  }
  Object.keys(opMap).forEach(key => opMap[key] = withRemote(opMap[key]))
  return opMap
}
