'use strict'

const store = require('./../store')

// contains most all of the jQuery to update the webpage

const onCreateGameSuccess = function (response) {
  // save the new game state after AJAX call returned a response
  store.game = response.game
  $('#message').text(`new game!`)

  // show board if this is first new game this session
  $('#game-board').show()

  // clear board if this is not the first new game this session
  for (let i = 0; i < 9; i++) {
    const box = `[data-cell-index=${i}]`
    $(`${box}`).text('')
  }
}

const onCreateGameFailure = function (response) {
  $('#message').text(`try again.`)
}

const onUpdateGameSuccess = response => {
  // save the new game state after AJAX call returned a response
  store.game = response.game
  $('#message').text(`added move for ${store.player}`)

  // update the board with a move
  const box = `[data-cell-index=${store.move.game.cell.index}]`
  $(`${box}`).text(store.move.game.cell.value)

  // checks for a win based on the new move
  if (store.numberOfMovesMade > 4) {
    functions.checkForWin()
    functions.checkForTie()
  }

  // game-end messages to user for win and tie
  if (store.game.over) {
    if (store.winner === null) {
      $('#message').text('game tied. click `play` to play again.')
    } else {
      $('#message').text(`${store.winner} wins! click 'play' to play again.`)
    }
  }
}

const onUpdateGameFailure = () => {
  $('#message').text('failed to update game')
}

const onReadIndexOfGamesStartedSuccess = response => {
  store.gamesStarted = response
  $('#message').text(`${store.gamesStarted.games.length} game(s) started`)
}

const onReadIndexOfGamesStartedFailure = () => {
  $('#message').text('failed to get games started')
}

const onReadIndexOfGamesFinishedSuccess = response => {
  store.gamesFinished = response
  $('#message').text(`${store.gamesFinished.games.length} game(s) finished`)
}

const onReadIndexOfGamesFinishedFailure = () => {
  $('#message').text('failed to get games finished')
}

module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onReadIndexOfGamesStartedSuccess,
  onReadIndexOfGamesStartedFailure,
  onReadIndexOfGamesFinishedSuccess,
  onReadIndexOfGamesFinishedFailure
}
