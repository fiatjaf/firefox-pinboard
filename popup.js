/* global browser */

document.getElementById('saveToPinboard').addEventListener('click', saveToPinboard)
document.getElementById('unreadBookmarks').addEventListener('click', unreadBookmarks)
document.getElementById('allBookmarks').addEventListener('click', allBookmarks)

const BASE_URL = 'https://pinboard.in'

function saveToPinboard () {
  browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
    let tab = tabs[0]

    let url = tab.url
    let title = tab.title
    let description = tab.description || ''
    let pinboardUrl = BASE_URL + '/add?'

    let fullUrl = pinboardUrl + 'showtags=yes' + '&url=' + encodeURIComponent(url) +
      '&description=' + encodeURIComponent(description) +
      '&title=' + encodeURIComponent(title)

    browser.tabs.create({
      url: fullUrl,
      index: tab.index + 1,
      active: true
    })
  })
}

function unreadBookmarks () {
  window.open(BASE_URL + '/toread/')
}

function allBookmarks () {
  window.open(BASE_URL)
}
