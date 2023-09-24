import { sendMessage } from 'webext-bridge/background'

chrome.tabs.onActivated.addListener(async (info) => {
  const res = await sendMessage('query-video', {}, `content-script@${info.tabId}`)

  chrome.action.setIcon({
    path: res ? '/icons/icon128_on.png' : '/icons/icon128_off.png',
    tabId: info.tabId,
  })

  globalThis.currentTabId = info.tabId
})


