/* eslint-env browser, es6 */
/* eslint-disable no-unused-vars */
/* global browser */

const BASE_URL = 'https://pinboard.in'

function saveToPinboard (options) {
  if (options === undefined) options = {}
  if (options.toReadLater === undefined) options.toReadLater = false
  if (options.description === undefined) options.description = ''

  browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
    let tab = tabs[0]

    let url = tab.url
    let title = tab.title
    let description = options.description || ''
    let pinboardUrl = BASE_URL + '/add?'
    let next = encodeURIComponent('/close')

    let fullUrl = pinboardUrl + 'next=' + next +
      '&url=' + encodeURIComponent(url) +
      '&description=' + encodeURIComponent(description) +
      '&title=' + encodeURIComponent(title)

    if (options.toReadLater) {
      // add URL to Pinboard's "to read" list, without asking for description and tags
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
  })
}

function saveToReadLater () {
  saveToPinboard({toReadLater: true})
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
