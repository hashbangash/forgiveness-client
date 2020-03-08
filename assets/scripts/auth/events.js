'use strict'

const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  // default event reloads page on button click
  event.preventDefault()

  // get user input
  // event.target tells us which item was clicked on the 'submit'
  const form = event.target

  // format data
  const data = getFormFields(form)
  if (data.credentials.password !== data.credentials.password_confirmation) {
    $('#message').show()
    $('#message').text(`passwords don't match. try again.`)
    return ui.onSignUpFailure
  }
  // send to API
  api.signUp(data)
    // handle if API succeeds
    .then(ui.onSignUpSuccess)
    // handle if API fails
    .catch(ui.onSignUpFailure)
}

const onSignIn = function (event) {
  // default event reloads page on button click
  event.preventDefault()

  // get user input
  // event.target tells us which item was clicked on the 'submit'
  const form = event.target

  // format data
  const data = getFormFields(form)

  // send to API
  api.signIn(data)
    // handle if API succeeds
    .then(ui.onSignInSuccess)
    // handle if API fails
    .catch(ui.onSignInFailure)
}

const onChangePassword = function (event) {
  // default event reloads page on button click
  event.preventDefault()

  // get user input
  // event.target tells us which item was clicked on the 'submit'
  const form = event.target

  // format data
  const data = getFormFields(form)

  // send to API
  api.changePassword(data)
    // handle if API succeeds
    .then(ui.onChangePasswordSuccess)
    // handle if API fails
    .catch(ui.onChangePasswordFailure)
}

const onSignOut = function (event) {
  // default event reloads page on button click
  event.preventDefault()

  // get user input
  // event.target tells us which item was clicked on the 'submit'
  const form = event.target

  // format data
  const data = getFormFields(form)

  // send to API
  api.signOut(data)
    // handle if API succeeds
    .then(ui.onSignOutSuccess)
    // handle if API fails
    .catch(ui.onSignOutFailure)
}

const eventHandlers = () => {
  // auth event handlers
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
}

module.exports = {
  eventHandlers,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut
}
