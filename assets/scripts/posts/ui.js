'use strict'

const store = require('./../store')
// contains most all of the jQuery to update the webpage
const indexPostsTemplate = require('../templates/post-listing.handlebars')

const onIndexPostsSuccess = function (response) {
  if (store.creatingPost === true) {
    $('#post-form').hide()
    $('#create-post-button').show()
    $('#message').text(`post successfully created!`)
  } else {
    $('#message').text(`generated existing posts!`)
  }
  const indexPostsHtml = indexPostsTemplate({ posts: response.posts })
  $('#post-board').html(indexPostsHtml)
}

const failure = function (error) {
  console.log(error)
  $('#message').text(`sorry, error on our end. please try again.`)
}

module.exports = {
  onIndexPostsSuccess,
  failure
}
