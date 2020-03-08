'use strict'

const store = require('./../store')
// contains most all of the jQuery to update the webpage
const indexPostsTemplate = require('../templates/post-listing.handlebars')
const updatePostForm = require('../templates/post-form-update.handlebars')

const onIndexAllPostsSuccess = function (response) {
  if (store.creatingPost === true) {
    $('#post-form').empty()
    $('#create-post-button').show()
    $('#message').text(`Post successfully created!`)
    store.creatingPost = null
  } else if (store.editingPost === true) {
    $('#post-form').empty()
    $('#create-post-button').show()
    $('#message').text(`Post successfully edited!`)
    store.editingPost = null
  } else {
    $('#message').text(`Viewing all user posts!`)
  }
  if (store.user !== null && store.user !== undefined) {
    $('#index-all-posts-button').hide()
    $('#index-my-posts-button').show()
  }
  const indexPostsHtml = indexPostsTemplate({ posts: response.posts })
  $('#post-content').html(indexPostsHtml)
}

const onIndexMyPostsSuccess = function (response) {
  $('#post-content').empty()
  $('#message').text(`Viewing your posts!`)
  const indexPostsHtml = indexPostsTemplate({ posts: response.posts })
  $('#post-content').html(indexPostsHtml)
  $('#index-all-posts-button').show()
  $('#index-my-posts-button').hide()
}

const onShowPostSuccess = function (response) {
  $('#message').text(`Edit your post!`)
  const postFormHtml = updatePostForm({ post: response.post })
  $('#post-content').html(postFormHtml)
  store.post = response
}

const failure = function (error) {
  console.log(error)
  $('#message').text(`Sorry, error on our end. Please try again.`)
}

module.exports = {
  onIndexAllPostsSuccess,
  onIndexMyPostsSuccess,
  onShowPostSuccess,
  failure
}
