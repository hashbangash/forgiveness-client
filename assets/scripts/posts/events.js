'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const store = require('./../store')

// event handler listens for when 'play' button is clicked
const onCreateGame = () => {
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

// event handler listens for when 'play' button is clicked
const showForm = () => {
  $('#create-post-button').hide()
  $('#create-post-form').show()
}

// event handler listens for when a tic tac toe box is clicked
const onUpdateGame = event => {
  // event has a property called target
  // target has a HTML data-* attribute I created called #data-cell-index
  const cellIndexStr = event.target.getAttribute('data-cell-index')
  store.cellIndex = parseInt(cellIndexStr, 10)
  const legalMove = functions.checkForLegalMove()

  // if legal move or winning move
  if (legalMove && !store.game.over) {
    // get the index and player (even if game is over) to send to API
    functions.calculateNumMovesMade()
    functions.getPlayer()

    store.numberOfMovesMade++

    // checks for a win based on the new move
    if (store.numberOfMovesMade > 4) {
      functions.checkForWin()
      functions.checkForTie()
    }

    // format the AJAX message's JSON
    store.move = {
      'game': {
        'cell': {
          'index': store.cellIndex,
          'value': store.player
        },
        'over': store.game.over
      }
    }

    // AJAX message is formatted properly in store.move
    api.updateGame()
      .then(ui.onUpdateGameSuccess)
      .catch(ui.onUpdateGameFailure)
  } else
  // if illegal move but game isn't over
  if (!legalMove && !store.game.over) {
    $('#message').text('illegal move. try again.')
  } else
  // if game is already over
  if (store.game.over) {
    $('#message').text('game over. click `play` to play again.')
  }
}

// event handler listens for when get # of games started button clicked
const onReadIndexOfGamesStarted = () => {
  api.readIndexOfGamesStarted()
    .then(ui.onReadIndexOfGamesStartedSuccess)
    .catch(ui.onReadIndexOfGamesStartedFailure)
}

// event handler listens for when get # of games finished button clicked
const onReadIndexOfGamesFinished = () => {
  api.readIndexOfGamesFinished()
    .then(ui.onReadIndexOfGamesFinishedSuccess)
    .catch(ui.onReadIndexOfGamesFinishedFailure)
}

module.exports = {
  onCreateGame,
  onUpdateGame,
  onReadIndexOfGamesStarted,
  onReadIndexOfGamesFinished,
  showForm
}
