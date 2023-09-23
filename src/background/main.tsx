import { sendMessage } from 'webext-bridge/background'
import { isFirefox } from '@/env'

chrome.offscreen.createDocument({
  url: './dist/background/index.html',
  reasons: [chrome.offscreen.Reason.WORKERS],
  justification: 'Use HMR',
})

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log('background received:', { message, sender })

  if (message.type === 'reload') 
    reload()
})

async function reload() {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  // TODO: remove setTimeout
  setTimeout(() => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      files: [`${isFirefox ? '' : '.'}/dist/content/content-script.js`],
    })
      .then(() => console.log('script injected'))
      .catch(error => console.error(error))
  }, 500)
}

chrome.tabs.onActivated.addListener(async (info) => {
  const res = await sendMessage('query-video', {}, `content-script@${info.tabId}`)

  chrome.action.setIcon({
    path: res ? '/icons/icon128_on.png' : '/icons/icon128_off.png',
    tabId: info.tabId,
  })

  globalThis.currentTabId = info.tabId
})

