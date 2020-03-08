'use strict'

// import event handlers
const postEvents = require('./posts/events')
const authEvents = require('./auth/events')

$(() => {
  // initial page display
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create-post-button').hide()
  $('#index-all-posts-button').hide()
  $('#index-my-posts-button').hide()
  $('#create-post-form').hide()
  $('#edit-post-form').hide()

  // create auth event handlers
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('submit', authEvents.onSignOut)

  // create post event handlers
  $('#create-post-button').on('click', postEvents.showForm)
  $('#index-all-posts-button').on('click', postEvents.onIndexAllPosts)
  $('#index-my-posts-button').on('click', postEvents.onIndexMyPosts)
  $('#post-form').on('submit', '.create-or-edit-post-submit', postEvents.onCreateOrEditPost)
  $('#post-board').on('click', '.remove-post', postEvents.onDeletePost)
  $('#post-board').on('click', '.edit-post', postEvents.onEditPostStart)

  postEvents.onIndexPosts()
})
