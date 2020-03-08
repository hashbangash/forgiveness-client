'use strict'

// access the API's URL via the config file (dev. & prod. URLs)
const config = require('./../config')
const store = require('./../store')

// contains all AJAX calls to the API

const createPost = (data) => {
  return $.ajax({
    url: `${config.apiUrl}/posts`,
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: data
  })
}

const editPost = (post, id) => {
  return $.ajax({
    url: `${config.apiUrl}/posts/${id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: post
  })
}

const indexAllPosts = () => {
  return $.ajax({
    url: `${config.apiUrl}/posts`,
    method: 'GET',
    data: ''
  })
}

const indexMyPosts = () => {
  return $.ajax({
    url: `${config.apiUrl}/posts?user_posts=true`,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: ''
  })
}

const showPost = function (id) {
  return $.ajax({
    url: `${config.apiUrl}/posts/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const deletePost = function (event) {
  const id = $(event.target).data('id')
  return $.ajax({
    url: `${config.apiUrl}/posts/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

module.exports = {
  createPost,
  editPost,
  indexAllPosts,
  indexMyPosts,
  showPost,
  deletePost
}
