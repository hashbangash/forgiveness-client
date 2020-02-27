'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields')

const store = require('./../store')

// event handler listens for when 'create post' button is clicked
const showForm = () => {
  $('#create-post-button').hide()
  $('#create-post-form').show()
  $('#message').text('fill out the form to post!')
}

// event handler listens for when 'create post' form submit is clicked
const onCreatePost = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const post = {
    'post': {
      'title': data.title,
      'author': data.author,
      'body': data.body,
      'post_date': '2020/02/02'
    }
  }
  api.createPost(post)
    .then(function () {
      store.routeFromCreatePost = true
      onIndexPosts(event)
    })
    .catch(ui.failure)
}

const onEditPost = (event) => {
  showForm()
  event.preventDefault()
  const data = getFormFields(event.target)
  const post = {
    'post': {
      'title': data.title,
      'author': data.author,
      'body': data.body,
      'post_date': '2020/02/02'
    }
  }
  api.createPost(post)
    .then(function () {
      store.routeFromCreatePost = true
      onIndexPosts(event)
    })
    .catch(ui.failure)
}

const onIndexPosts = () => {
  api.indexPosts()
    .then(ui.onIndexPostsSuccess)
    .catch(ui.failure)
}

const onDeletePost = (event) => {
  event.preventDefault()
  api.deletePost(event)
    .then(function () {
      onIndexPosts(event)
    })
    .catch(ui.failure)
}

const onClearPosts = (event) => {
  event.preventDefault()
  ui.clearPosts()
}

module.exports = {
  showForm,
  onCreatePost,
  onIndexPosts,
  onDeletePost,
  onClearPosts,
  onEditPost
}
