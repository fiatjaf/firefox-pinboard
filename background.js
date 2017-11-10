/* eslint-env browser, es6 */
/* global browser, window, saveToPinboard, saveToReadLater,
   openUnreadBookmarks, openAllBookmarks */

browser.runtime.onMessage.addListener((message, sender) => {
  if (message === 'save-to-pinboard' || message === 'save-to-read-later') {
    saveWithDescription(message)
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
    saveWithDescription(command)
  }
})

function saveWithDescription (command) {
  getDescription((results) => {
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

function getDescription (success, error) {
  browser.tabs.executeScript({
    code: '(' + getSelectionOrDescription + ')()',
    allFrames: false
  }).then(success, error)
}

function getSelectionOrDescription () {
  function getSelectionText () {
    let text = ''
    if (window.getSelection) text = window.getSelection().toString()

    return text
  }

  function getMetaDescription () {
    let meta = window.document.querySelector('meta[name=description]')
    let description = meta
      ? meta.getAttribute('content') || ''
      : ''

    return description
  }

  let selection = getSelectionText()
  let description = getMetaDescription()

  return selection || description
}
