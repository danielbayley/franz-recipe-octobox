'use strict'
const path = require('path')

const select = (pattern) => {
  const selector = `[class$=sidebar] .filter[href${pattern}] .label`
  const notifications = document.querySelector(selector)
  if (notifications) { return parseInt(notifications.innerHTML) }
}

module.exports = (Franz) => {

  Franz.injectCSS(path.join(__dirname, 'inject.css'))

  return Franz.loop(() => {
    let mentions, unread
    if (/[&?](?!per_page|unread=false)/.test(document.URL)) {
      const list = document.querySelectorAll('.notification.active')
      const notifications = Array.from(list)
      mentions = unread = notifications.length
    } else {
      mentions = select('*=mention')
      unread = select('*="unread=true"')
    }
    return Franz.setBadge(mentions, unread)
  })
}
