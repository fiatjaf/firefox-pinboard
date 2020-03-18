/* eslint-env browser, es6 */
/* eslint-disable no-unused-vars */
/* global browser */

const BASE_URL = 'https://pinboard.in'

function saveToPinboard (options = {url: '', title: '', description: '', readLater: false}) {
  let {url, title, description, readLater} = options

  let pinboardUrl = BASE_URL + '/add?'
  let next = encodeURIComponent('/close-firefox-pinboard')

  let fullUrl = pinboardUrl + 'next=' + next +
    '&url=' + encodeURIComponent(url) +
    '&description=' + encodeURIComponent(description) +
    '&title=' + encodeURIComponent(title)

  if (readLater) {
    fullUrl = pinboardUrl + 'later=yes&noui=yes&next=' + next +
      '&url=' + encodeURIComponent(url) +
      '&title=' + encodeURIComponent(title)
  }

  browser.windows.create({
    url: fullUrl,
    width: 660,
    height: 400,
    type: 'popup'
  })
}

function saveToReadLater (options) {
  saveToPinboard({...options, readLater: true})
}

function openUnreadBookmarks () {
  browser.tabs.create({
    url: BASE_URL + '/toread/'
  })
}

function openAllBookmarks () {
  browser.tabs.create({
    url: BASE_URL
  })
}
