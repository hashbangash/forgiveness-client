'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields')
const postFormCreate = require('../templates/post-form-create.handlebars')
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
  $('#index-all-posts-button').on('click', onIndexAllPosts)
  $('#index-my-posts-button').on('click', onIndexMyPosts)
  $('#post-content').on('click', '.remove-post', onDeletePost)
  $('#post-content').on('click', '.edit-post', onEditPostStart)

  // the 2nd parameter to these handlers is the optional
  // selector that doesn't exist yet, but will exist
  // with #post-content once handlebars creates them.
  // because they are forms, use an anonymous function to
  // preventDefault before sending them on.
  $('#post-content').on('submit', '.create-form', function (event) {
    event.preventDefault()
    onCreateOrEditPost(event)
  })
  $('#post-content').on('submit', '.update-form', function (event) {
    event.preventDefault()
    onEditPostSubmit(event)
  })
}

// event handler listens for when 'create post' button is clicked
const showFormForCreate = () => {
  store.creatingPost = true
  $('#create-post-button').hide()
  $('#post-content').empty()
  const postFormHtml = postFormCreate()
  $('#post-content').html(postFormHtml)
}

// a similar form is used for creating and editing
// so we funnel control flow through here
const onCreateOrEditPost = (event) => {
  if (store.creatingPost === true) {
    onCreatePost(event)
  } else {
    onEditPostStart(event)
  }
}

// event handler listens for when 'create post'
// form submit is clicked
const onCreatePost = (event) => {
  const data = getFormFields(event.target)
  const post = {
    'post': {
      'title': data.title,
      'author': data.author,
      'body': data.body
    }
  }
  // anonymous function allows two lines to be written
  // and callback not to be invoked till response comes back
  // to .then()
  api.createPost(post)
    .then(function () {
      onIndexAllPosts(event)
    })
    .catch(ui.failure)
}

// when a user begins to update a post
const onEditPostStart = (event) => {
  store.creatingPost = false
  const id = $(event.target).data('id')
  api.showPost(id)
    .then(ui.onShowPostSuccess)
    .catch(ui.failure)
}

// when a user submits an edited post
const onEditPostSubmit = (event) => {
  const data = getFormFields(event.target)
  const id = store.post.post.id
  const post = {
    'post': {
      'title': data.title,
      'author': data.author,
      'body': data.body
    }
  }
  // anonymous function allows two lines to be written
  // and callback not to be invoked till response comes back
  // to .then()
  api.editPost(post, id)
    .then(function () {
      store.editingPost = true
      onIndexAllPosts(event)
    })
    .catch(ui.failure)
}

// get list of all posts
const onIndexAllPosts = () => {
  api.indexAllPosts()
    .then(ui.onIndexAllPostsSuccess)
    .catch(ui.failure)
}

// get list of just one user's posts
const onIndexMyPosts = () => {
  api.indexMyPosts()
    .then(ui.onIndexMyPostsSuccess)
    .catch(ui.failure)
}

// delete a user's post
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
  onCreatePost,
  onCreateOrEditPost,
  onIndexAllPosts,
  onDeletePost,
  onEditPostStart,
  onEditPostSubmit
}
