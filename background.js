let speed = 100

chrome.runtime.onInstalled.addListener((tab) => {
  chrome.storage.sync.set({ speed })
  console.log("Default scroll interval set to %d", `${speed}`)
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.indexOf("zhuanlan.zhihu.com") > 0) {
    if (tab.status === "loading") {
      chrome.storage.sync.get("speed", (data) => {
        let myNewUrl = tab.url.split("?")[0] + "?speed=" + data.speed

        if (tab.url.indexOf("?speed=") != -1) {
          var reg = new RegExp("speed=([^&]*)(&|$)")
          var r = tab.url.match(reg)
          if (r != null && decodeURI(r[1]) != data.speed) {
            //Update the url here.
            chrome.tabs.update(tab.id, { url: myNewUrl })
          }
        } else {
          //Update the url here.
          chrome.tabs.update(tab.id, { url: myNewUrl })
        }
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
