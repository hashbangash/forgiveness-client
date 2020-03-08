'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields')
const postFormTemplate = require('../templates/post-form.handlebars')

const store = require('./../store')

// event handler listens for when 'create post' button is clicked
const showForm = () => {
  $('#create-post-button').hide()
  const postFormHtml = postFormTemplate()
  $('#post-board').hide()
  $('#post-form').html(postFormHtml)
}

const onCreateOrEditPost = (event) => {
  alert('wait!')
  console.log(event.target)
  event.preventDefault()
  if (event.target === 'createPost') {
    onCreatePost()
  } else {
    onEditPostStart()
  }
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

const onEditPostStart = (event) => {
  $('#post-board').hide()
  const postFormHtml = postFormTemplate()
  console.log(postFormHtml)
  // $('#post-board').html(indexPostsHtml)
}

const onEditPostSubmit = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const id = $(event.target).data('id')
  console.log(data, id)
  const post = {
    'post': {
      'title': data.title,
      'author': data.author,
      'body': data.body,
      'post_date': '2020/02/02'
    }
  }
  api.editPost(post, id)
    .then(ui.onEditPostSuccess)
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

module.exports = {
  showForm,
  onCreatePost,
  onCreateOrEditPost,
  onIndexPosts,
  onDeletePost,
  onEditPostStart,
  onEditPostSubmit
}
