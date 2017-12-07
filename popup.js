/* eslint-env browser, es6 */
/* global browser */

document.getElementById('saveToPinboard').addEventListener('click', () => {
  browser.runtime.sendMessage('save-to-pinboard')
})
document.getElementById('saveToReadLater').addEventListener('click', () => {
  browser.runtime.sendMessage('save-to-read-later')
})
document.getElementById('unreadBookmarks').addEventListener('click', () => {
  browser.runtime.sendMessage('open-unread-bookmarks')
})
document.getElementById('allBookmarks').addEventListener('click', () => {
  browser.runtime.sendMessage('open-all-bookmarks')
})
