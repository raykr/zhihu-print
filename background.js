let speed = 100

chrome.runtime.onInstalled.addListener((tab) => {
  chrome.storage.sync.set({ speed })
  console.log("Default scroll interval set to %d", `${speed}`)
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.indexOf("zhihu.com") > 0 && tab.url.indexOf("?speed=") == -1) {
    // 通知对应的tab页面url变化了,需要优化为离开立即移除，进入则加载完毕再添加
    if (tab.status === "complete") {
      chrome.storage.sync.get("speed", (data) => {
        let myNewUrl = tab.url.split("?")[0] + "?speed=" + data.speed
        //Update the url here.
        chrome.tabs.update(tab.id, { url: myNewUrl })
      })
    }
  }
})

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content-script.js"],
  })
})
