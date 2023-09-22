import { withRemote } from './context'

export function createOperationMap(video: HTMLVideoElement) {
  const opMap = {
    play: () => video.play(),
    seeked: (data: any) => video.currentTime = data.currentTime,
    pause: () => video.pause(),
    message: async () => {
      // const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
      // await chrome.tabs.sendMessage(tab.id!, { greeting: 'hello' })
    },
  }
  Object.keys(opMap).forEach(key => opMap[key] = withRemote(opMap[key]))
  return opMap
}
