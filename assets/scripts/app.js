'use strict'

// import event methods
const postEvents = require('./posts/events')
const authEvents = require('./auth/events')

// run the app!
$(() => {
  postEvents.displayLoggedOutHome()
  authEvents.eventHandlers()
  postEvents.eventHandlers()
})
