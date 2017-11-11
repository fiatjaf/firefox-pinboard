/* eslint-env browser, es6 */
/* global browser, window, saveToPinboard, saveToReadLater,
   openUnreadBookmarks, openAllBookmarks */

browser.runtime.onMessage.addListener((message, sender) => {
  if (message === 'save-to-pinboard' || message === 'save-to-read-later') {
    getTabInfo().then((options) => {
      saveBookmark(message, options)
    })
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
    getTabInfo().then((options) => {
      saveBookmark(command, options)
    })
  }
})

function saveBookmark (command, options) {
  if (command === 'save-to-pinboard') {
    saveToPinboard(options)
  } else if (command === 'save-to-read-later') {
    saveToReadLater(options)
  }
}

function getTabInfo () {
  return browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    let tab = tabs[0]
    let info = {
      url: tab.url,
      title: tab.title,
      description: ''
    }

    return getDescription().then((results) => {
      return {...info, description: results[0]}
    }, () => {
      return info
    })
  })
}

function getDescription () {
  function getSelectionOrDescription () {
    let selection = ''
    if (window.getSelection) selection = window.getSelection().toString()

    let meta = window.document.querySelector('meta[name=description]')
    let description = ''
    if (meta) description = meta.getAttribute('content') || ''

    return selection || description
  }

  return browser.tabs.executeScript({
    code: '(' + getSelectionOrDescription + ')()',
    allFrames: false
  })
}
