'use strict'

const store = require('./../store')
const indexPostsTemplate = require('../templates/post-listing.handlebars')
const updatePostForm = require('../templates/post-form-update.handlebars')

const onIndexAllPostsSuccess = function (response) {
  // flow for indexing posts after one was created
  console.log('store', store)
  if (store.creatingPost === true) {
    $('#post-form').empty()
    $('#create-post-button').show()
    $('#message').text(`Post successfully created!`)
    store.creatingPost = null
    // flow for indexing posts after one was edited
  } else if (store.editingPost === true) {
    $('#post-form').empty()
    $('#create-post-button').show()
    $('#message').text(`Post successfully edited!`)
    store.editingPost = null
    // flow if indexing posts after user signs out
  } else if (store.signingOut === true) {
    $('#message').text(`Successfully signed out!`)
    store.signingOut = null
  } else {
    $('#message').text(`Viewing all user posts!`)
  }
  // flow for the logged-out view
  if (store.user !== null && store.user !== undefined) {
    $('#index-all-posts-button').hide()
    $('#index-my-posts-button').show()
  }
  // add html to app
  const indexPostsHtml = indexPostsTemplate({ posts: response.posts })
  $('#post-content').html(indexPostsHtml)
  resetAllForms()
}

// index only the user's posts
const onIndexMyPostsSuccess = function (response) {
  $('#post-content').empty()
  $('#message').text(`Viewing your posts!`)
  const indexPostsHtml = indexPostsTemplate({ posts: response.posts })
  $('#post-content').html(indexPostsHtml)
  $('#index-all-posts-button').show()
  $('#index-my-posts-button').hide()
  resetAllForms()
}

// show a single post
const onShowPostSuccess = function (response) {
  $('#message').text(`Edit your post!`)
  const postFormHtml = updatePostForm({ post: response.post })
  $('#post-content').html(postFormHtml)
  store.post = response
  resetAllForms()
}

// save errors to storage since console logs aren't allowed in this project
const failure = function (error) {
  store.error = error
  $('#message').text(`Sorry, error on our end. Please try again.`)
}

const resetAllForms = function () {
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#change-password').trigger('reset')
  $('#sign-out').trigger('reset')
}

module.exports = {
  onIndexAllPostsSuccess,
  onIndexMyPostsSuccess,
  onShowPostSuccess,
  resetAllForms,
  failure
}
