'use strict'

const store = require('./../store')
// contains most all of the jQuery to update the webpage
const indexPostsTemplate = require('../templates/post-listing.handlebars')

const onIndexAllPostsSuccess = function (response) {
  if (store.creatingPost === true) {
    $('#post-form').empty()
    $('#create-post-button').show()
    $('#message').text(`Post successfully created!`)
    store.creatingPost = null
  } else {
    $('#message').text(`Viewing all user posts!`)
  }
  if (store.user !== null) {
    $('#index-all-posts-button').hide()
    $('#index-my-posts-button').show()
  }
  const indexPostsHtml = indexPostsTemplate({ posts: response.posts })
  $('#post-content').html(indexPostsHtml)
}

const onIndexMyPostsSuccess = function (response) {
  console.log('made it')
  $('#post-content').empty()
  $('#message').text(`Viewing your posts!`)
  const indexPostsHtml = indexPostsTemplate({ posts: response.posts })
  $('#post-content').html(indexPostsHtml)
  $('#index-all-posts-button').show()
  $('#index-my-posts-button').hide()
}

const failure = function (error) {
  console.log(error)
  $('#message').text(`sorry, error on our end. please try again.`)
}

module.exports = {
  onIndexAllPostsSuccess,
  onIndexMyPostsSuccess,
  failure
}
