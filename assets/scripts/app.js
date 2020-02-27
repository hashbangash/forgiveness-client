'use strict'

// import event handlers
const postEvents = require('./posts/events')
const authEvents = require('./auth/events')

$(() => {
  // initial page display
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create-post-button').hide()
  $('#index-posts-button').hide()
  $('#create-post-form').hide()

  // create auth event handlers
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('submit', authEvents.onSignOut)

  // create post event handlers
  $('#create-post-button').on('click', postEvents.showForm)
  $('#create-post-form').on('submit', postEvents.onCreatePost)
  $('#index-posts-button').on('click', postEvents.onIndexPosts)
  $('.post-board').on('click', '.remove-post', postEvents.onDeletePost)
  $('.post-board').on('click', '.edit-post', postEvents.onEditPost)
})
