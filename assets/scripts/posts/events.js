'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields')
const postFormTemplate = require('../templates/post-form.handlebars')

const store = require('./../store')

const displayLoggedOutHome = () => {
  // initial page display
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create-post-button').hide()
  $('#index-all-posts-button').hide()
  $('#index-my-posts-button').hide()
  $('#create-post-form').hide()
  $('#edit-post-form').hide()
  onIndexAllPosts()
}

const eventHandlers = () => {
  // create post event handlers
  $('#create-post-button').on('click', showFormForCreate)
  $('.edit-post').on('click', showFormForEdit)
  $('#index-all-posts-button').on('click', onIndexAllPosts)
  // #TODO $('#index-my-posts-button').on('click', onIndexMyPosts)
  $('#post-form').on('submit', '.create-form', function (event) {
    event.preventDefault()
    onCreateOrEditPost(event)
  })
  $('#post-board').on('click', '.remove-post', onDeletePost)
  $('#post-board').on('click', '.edit-post', onEditPostStart)
}

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

const onIndexAllPosts = () => {
  api.indexAllPosts()
    .then(ui.onIndexAllPostsSuccess)
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
