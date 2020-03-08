'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields')
const postFormTemplate = require('../templates/post-form.handlebars')

const store = require('./../store')

// initial page display
const displayLoggedOutHome = () => {
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create-post-button').hide()
  $('#index-all-posts-button').hide()
  $('#index-my-posts-button').hide()
  $('#create-post-form').hide()
  $('#edit-post-form').hide()
  onIndexAllPosts()
}

// create post event handlers on app load
const eventHandlers = () => {
  $('#create-post-button').on('click', showFormForCreate)
  $('.edit-post').on('click', showFormForEdit)
  $('#index-all-posts-button').on('click', onIndexAllPosts)
  $('#index-my-posts-button').on('click', onIndexMyPosts)
  $('#post-content').on('submit', '.create-form', function (event) {
    event.preventDefault()
    onCreateOrEditPost(event)
  })
  $('#post-content').on('click', '.remove-post', onDeletePost)
  $('#post-content').on('click', '.edit-post', onEditPostStart)
}

// event handler listens for when 'create post' button is clicked
const showFormForCreate = () => {
  store.creatingPost = true
  $('#create-post-button').hide()
  $('#post-content').empty()
  $('post-content').show()
  const postFormHtml = postFormTemplate()
  $('#post-content').html(postFormHtml)
}

const showFormForEdit = () => {
  store.creatingPost = false
  $('#post-content').empty()
  $('#create-post-button').hide()
}

const onCreateOrEditPost = (event) => {
  if (store.creatingPost === true) {
    onCreatePost(event)
  } else {
    onEditPostStart(event)
  }
}

// event handler listens for when 'create post' form submit is clicked
const onCreatePost = (event) => {
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
      onIndexAllPosts(event)
    })
    .catch(ui.failure)
}

const onEditPostStart = (event) => {
  $('#post-content').empty()
  const postFormHtml = postFormTemplate()
  console.log(postFormHtml)
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

const onIndexAllPosts = () => {
  api.indexAllPosts()
    .then(ui.onIndexAllPostsSuccess)
    .catch(ui.failure)
}

const onIndexMyPosts = () => {
  api.indexMyPosts()
    .then(ui.onIndexMyPostsSuccess)
    .catch(ui.failure)
}

const onDeletePost = (event) => {
  event.preventDefault()
  api.deletePost(event)
    .then(function () {
      onIndexAllPosts(event)
    })
    .catch(ui.failure)
}

module.exports = {
  eventHandlers,
  displayLoggedOutHome,
  showFormForCreate,
  showFormForEdit,
  onCreatePost,
  onCreateOrEditPost,
  onIndexAllPosts,
  onDeletePost,
  onEditPostStart,
  onEditPostSubmit
}
