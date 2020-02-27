'use strict'

// const store = require('./../store')
// contains most all of the jQuery to update the webpage
const indexPostsTemplate = require('../templates/post-listing.handlebars')

const onCreatePostSuccess = function (response) {
  $('#message').text(`post successfully created!`)
}

const onIndexPostsSuccess = function (response) {
  $('#message').text(`generated existing posts!`)
  const indexPostsHtml = indexPostsTemplate({ posts: response.posts })
  $('#post-board').html(indexPostsHtml)
}

const failure = function (error) {
  console.log(error)
  $('#message').text(`sorry, error on our end. please try again.`)
}

const clearPosts = () => {
  $('#post-board').empty()
}

module.exports = {
  onCreatePostSuccess,
  onIndexPostsSuccess,
  failure,
  clearPosts
}
