'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields')
const postFormTemplate = require('../templates/post-form.handlebars')

const store = require('./../store')

// event handler listens for when 'create post' button is clicked
const showFormForCreate = () => {
  store.creatingPost = true
  $('#create-post-button').hide()
  const postFormHtml = postFormTemplate()
  $('#post-board').hide()
  $('#post-form').html(postFormHtml)
}

const showFormForEdit = () => {
  store.creatingPost = false
  $('#post-board').hide()
  $('#create-post-button').hide()
  // const postFormHtml = postFormTemplate()
  // $('#post-form').html(postFormHtml)
}

const onCreateOrEditPost = (event) => {
  console.log(event.target)
  if (store.creatingPost === true) {
    onCreatePost(event)
  } else {
    onEditPostStart(event)
  }
}

// event handler listens for when 'create post' form submit is clicked
const onCreatePost = (event) => {
  console.log(event)
  const data = getFormFields(event.target)
  const post = {
    'post': {
      'title': data.title,
      'author': data.author,
      'body': data.body,
      'post_date': '2020/02/02'
    }
  }
  console.log(post)
  api.createPost(post)
    .then(function () {
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
  showFormForCreate,
  showFormForEdit,
  onCreatePost,
  onCreateOrEditPost,
  onIndexPosts,
  onDeletePost,
  onEditPostStart,
  onEditPostSubmit
}
