'use strict'

const store = require('./../store')

const onSignUpSuccess = function (response) {
  $('#message').text(`${response.user.email} successfully signed up!`)
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#message').removeClass()
  $('#message').addClass('success-message')
}

const onSignUpFailure = function (response) {
  $('#message').text(`sign up failed. try again.`)
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#message').removeClass()
  $('#message').addClass('failure-message')
}

const onSignInSuccess = function (response) {
  $('#message').text(`${response.user.email} successfully signed in!`)
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#change-password').show()
  $('#sign-out').show()
  $('#create-post-button').show()
  store.user = response.user
}

const onSignInFailure = function (response) {
  $('#message').text(`sign in failed. try again.`)
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
}

const onChangePasswordSuccess = function (response) {
  $('#message').text(`successfully changed password!`)
  $('#change-password').trigger('reset')
}

const onChangePasswordFailure = function (response) {
  $('#message').text(`change password failed. try again.`)
  $('#change-password').trigger('reset')
}

const onSignOutSuccess = function (response) {
  $('#message').text(`successfully signed out!`)
  $('#sign-out').trigger('reset')
  $('#change-password').trigger('reset')
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#sign-in').show()
  $('#sign-up').show()
  $('#play-button').hide()
  $('#game-board').hide()
  $('#get-games-started-button').hide()
  $('#get-games-started-message').hide()
  $('#get-games-finished-button').hide()
  $('#get-games-finished-message').hide()

  // set the locally stored user data to null
  store.user = null
}

const onSignOutFailure = function (response) {
  $('#message').text(`sign out failed. try again.`)
  $('#sign-out').trigger('reset')
  $('#sign-in').trigger('reset')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}
