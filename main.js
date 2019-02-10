//
// Declare the variables we'll use to reference the elements on our page.
//
/* statusLabel is the element that will show whose turn it is, and the win or
   tie message at the end of the game. */
let statusLabel = document.getElementById('status');

/* boardButtons is an array of all of the buttons in the game grid. */
let boardButtons;

let resetButton;
/* currentTurn keeps track of who's turn it is.  'X' or 'O'. */
let currentTurn = 'X';

/**
 * main sets up cick handlers and other data to begin playing the game.
 */
function main() {
 
  statusLabel /* = something */;

 
  // Use Array.from to convert the DOMList to a normal Array.
  boardButtons = Array.from(document.querySelectorAll('#board button'));

  resetButton = document.getElementById('reset');
  // Set up event listeners.

  for (let button of boardButtons) {
    
  button.addEventListener('click', onButtonClick);
  }

  resetButton.addEventListener('click', onResetClick);

  // Start the game
  startTurn(currentTurn);
}

function onResetClick(){
  for (let button of boardButtons){
    button.textContent = '';
    button.classList.remove('Value-X');
    button.classList.remove('Value-O');
    button.disabled = false;
  }
  currentTurn = 'X';
  startTurn(currentTurn);
}

//
// Functions to manipulate the page.
//

/**
 * setTurnBodyClass sets a class on the body of the document corresponding to
 * the current turn. This lets us style things on the page differently
 * depending on what players turn it is.
 *
 * @param {string} turn - Which turn to set to.
 */
function setTurnBodyClass(turn) {
  let lastTurn = getNextTurn(turn)
  document.body.classList.remove('turn-' + lastTurn);
  document.body.classList.add('turn-' + turn);
}

/**
 * setStatus changes the status message above the game board.  It is used to
 * let the player know whose turn it is, or when the game is over.
 *
 * @param {string} message - The status message to show.
 */
function setStatus(message) {
 
  statusLabel.textContent = message;
}

/**
 * setGridButtonsDisabled disables all the buttons in the grid.
 */
function setGridButtonsDisabled(disabled) {
  for (let button of boardButtons) {
  button.disabled = disabled
    

  }
}

//
// Event handlers
//

function onButtonClick(event) {
  // event.target is the button the user clicked on.
  let button = event.target;

  
  button.textContent = currentTurn /* = something */;

 
  button.classList.add('value-' + currentTurn);/* + something */

  // Disable the button so it can't be clicked again (won't emit click events).
  button.disabled = true;

  // Check if there was a winner
  let winner = isWinner();

  if (winner) {
    win(winner);

  } else if (isTie()) {
    // If there wasn't a winner, check if there was a tie.
    tie();

  } else {
    // Otherwise, go to the next player's turn
    swapTurn();
  }
}

//
// Functions for manipulating game state.
//

/**
 * getNextTurn returns a string of who's turn is next, given the current turn.
 *
 * @param {string} turn - The current turn.
 * @returns {string} The next turn.
 */
function getNextTurn(turn) {
  if (turn === 'X'){
    return 'O';
  }
  if (turn ==='O'){
    return 'X'
  }
  
}

/**
 * startTurn sets everything up for the current player's turn.
 * @param {string} turn
 */
function startTurn(turn) {
  setTurnBodyClass(turn);
  setStatus('Turn: ' + turn);
}

/**
 * swapTurn moves to the next player's turn.
 */
function swapTurn() {
  currentTurn = getNextTurn(currentTurn);
  startTurn(currentTurn);
}

/**
 * isWinner returns whether there is a winner.
 *
 * @returns {Array|boolean} - An array of winning cells, false otherwise.
 */
function isWinner() {
  
  let lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

for (let line of lines) {
  let first = boardButtons[line[0]].textContent;
  let second = boardButtons[line[1]].textContent;
  let third = boardButtons[line[2]].textContent;



  if (first !== '' && first === second && second === third ) {
    return true;
  }
}
  return false;
}

/**
 * isTie returns whether the game is tied. Call this after checking for a
 * winner.
 *
 * @returns {boolean} - True if the game is tied, false otherwise.
 */
function isTie() {
  
  // no winner.
  for( let button of boardButtons){
    if(button.textContent === '') {
      return false;
    }
  }
  return true;
}

/** win updates the game to display a winner. */
function win(line) {
  setStatus('Player' + ' ' + currentTurn + ' '+ 'Wins!')
  setGridButtonsDisabled(true);
  //alert('YOU WIN!');
  

  

}

/** tie updates the game to a game tie. */
function tie() {
  
  setStatus('Tie!')
}




// Wait until the page is loaded before trying to do stuff.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
