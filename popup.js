/* eslint-env browser, es2020 */
/* global browser */

browser.commands.getAll().then((allCommands) => {
  let commandElementMap = {
    'save-to-pinboard': '#saveToPinboard',
    'save-to-read-later': '#saveToReadLater'
  }

  allCommands.forEach((command) => {
    let commandBadge = document.querySelector(`${commandElementMap[command.name]} .badge`)
    commandBadge.innerText = command.shortcut
  })
})

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
