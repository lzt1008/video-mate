import { sendMessage } from 'webext-bridge/background'

const iconList = {
  ready: '/icons/icon128_red.png',
  unready: '/icons/icon128_on.png',
  end: '/icons/icon128_red.png',
  sync: '/icons/icon128_green.png',
  connect: '/icons/icon128_yellow.png',
}

chrome.tabs.onActivated.addListener(async (info) => {
  const res = await sendMessage('query-video', {}, `content-script@${info.tabId}`)

  chrome.action.setIcon({
    path: res ? '/icons/icon128_on.png' : '/icons/icon128_off.png',
    tabId: info.tabId,
  })

  globalThis.currentTabId = info.tabId
})

