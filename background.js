/* global browser, saveToPinboard */

browser.commands.onCommand.addListener(function (command) {
  if (command == "save-to-pinboard") {
    saveToPinboard()
  }
})
