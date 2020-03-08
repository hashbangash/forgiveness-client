'use strict'

// import event handlers
const postEvents = require('./posts/events')
const authEvents = require('./auth/events')

$(() => {
  postEvents.displayLoggedOutHome()
  authEvents.eventHandlers()
  postEvents.eventHandlers()
})
