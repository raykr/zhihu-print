chrome.storage.sync.get("speed", (data) => {
  document.getElementById(data.speed).checked = true
})

document.getElementById("save").addEventListener("click", function () {
  var radio = document.getElementsByName("speed")
  for (i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      chrome.storage.sync.set({ speed: radio[i].value })
      alert("Save success!")
    }
  }
})
