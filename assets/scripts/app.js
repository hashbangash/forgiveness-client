'use strict'

// import event handlers
const postEvents = require('./posts/events')
const authEvents = require('./auth/events')

$(() => {
  // initial page display
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#message-board').hide()

  // create auth event handlers
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('submit', authEvents.onSignOut)

  // create game event handlers
  $('#play-button').on('click', postEvents.onCreateGame)
  $('#message-board').on('click', postEvents.onUpdateGame)
})
