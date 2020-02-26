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

const updateGame = () => {
  return $.ajax({
    url: `${config.apiUrl}/games/${store.game.id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: store.move
  })
}

const readIndexOfGamesStarted = () => {
  return $.ajax({
    url: `${config.apiUrl}/games`,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: ''
  })
}

const readIndexOfGamesFinished = () => {
  return $.ajax({
    url: `${config.apiUrl}/games?over=true`,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: ''
  })
}

module.exports = {
  createPost,
  updateGame,
  readIndexOfGamesStarted,
  readIndexOfGamesFinished
}
