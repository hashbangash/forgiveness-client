'use strict'

// const store = require('./../store')
// contains most all of the jQuery to update the webpage

const onCreatePostSuccess = function (response) {
  $('#message').text(`post successfully created!`)
}

const onCreatePostFailure = function (response) {
  $('#message').text(`sorry, error on our end. please try again.`)
}

module.exports = {
  onCreatePostSuccess,
  onCreatePostFailure
}
