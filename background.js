/* eslint-env browser, es6 */
/* global browser, window, saveToPinboard, saveToReadLater,
   openUnreadBookmarks, openAllBookmarks */

browser.runtime.onMessage.addListener((message, sender) => {
  if (message === 'save-to-pinboard' || message === 'save-to-read-later') {
    saveWithSelection(message)
  } else if (message === 'open-unread-bookmarks') {
    openUnreadBookmarks()
  } else if (message === 'open-all-bookmarks') {
    openAllBookmarks()
  } else if (message === 'close-this') {
    browser.tabs.remove(sender.tab.id)
  }
})

browser.commands.onCommand.addListener((command) => {
  if (command === 'save-to-pinboard' || command === 'save-to-read-later') {
    saveWithSelection(command)
  }
})

function saveWithSelection (command) {
  getSelection((results) => {
    let description = results[0]
    saveBookmark(command, {description: description})
  }, () => {
    saveBookmark(command)
  })
}

function saveBookmark (command, options) {
  if (command === 'save-to-pinboard') {
    saveToPinboard(options)
  } else if (command === 'save-to-read-later') {
    saveToReadLater()
  }
}

function getSelection (gotSelection, noSelection) {
  let requestSelection = browser.tabs.executeScript({
    code: '(' + getSelectionText + ')()',
    allFrames: false
  })
  requestSelection.then(gotSelection, noSelection)
}

function getSelectionText () {
  let text = ''
  if (window.getSelection) text = window.getSelection().toString()
  return text
}
