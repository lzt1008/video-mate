if (import.meta.hot) {
  import.meta.hot.accept('../content/index', (mod) => {
    console.log(mod)
    chrome.runtime.sendMessage({
      type: 'reload',
    })
  })

  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}
