import { withRemote } from './context'

export function createOperationMap(video: HTMLVideoElement) {
  const opMap = {
    play: () => video.play(),
    seeked: (data: any) => video.currentTime = data.currentTime,
    pause: () => video.pause(),
  }
  Object.keys(opMap).forEach(key => opMap[key] = withRemote(opMap[key]))
  return opMap
}
