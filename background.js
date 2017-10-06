/* global browser, saveToPinboard, saveToReadLater */

browser.commands.onCommand.addListener(function (command) {
  if (command == "save-to-pinboard") {
    saveToPinboard()
  }
  if (command == "save-to-read-later") {
    saveToReadLater()
  }

  browser.runtime.onMessage.addListener(function (message, sender) {
    if (message === 'close-this') {
      browser.windows.remove(sender.tab.windowId)
    }
  })
})
