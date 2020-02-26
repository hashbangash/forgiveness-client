'use strict'

const store = require('./../store')
const config = require('./../config')

// make an AJAX call and return response
const signUp = function (data) {
  // ajax takes in one option (object)
  return $.ajax({
    url: `${config.apiUrl}/sign-up`,
    method: 'POST',
    data: data
  })
}

const signIn = function (data) {
  // ajax takes in one option (object)
  return $.ajax({
    url: `${config.apiUrl}/sign-in`,
    method: 'POST',
    data: data
  })
}

const changePassword = function (data) {
  // ajax takes in one option (object)
  return $.ajax({
    url: `${config.apiUrl}/change-password`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: data
  })
}

const signOut = function () {
  // ajax takes in one option (object)
  return $.ajax({
    url: `${config.apiUrl}/sign-out`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
