// import { initSynchronizer } from '../src/sync'

// initSynchronizer()


// setInterval(async () => {
//   const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
//   await chrome.tabs.sendMessage(tab.id!, { greeting: 'hello' })
// }, 2000)

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log(sender, message)
  ;(async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
    await chrome.tabs.sendMessage(tab.id!, { greeting: 'hello' })
  })()
  return true
})
