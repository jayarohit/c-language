const cells = document.querySelectorAll('.cell');
const messageElement = document.querySelector('.message');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Update the board and check for a winner
function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] === '' && isGameActive) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Set color: X (blue), O (red)
    e.target.style.color = currentPlayer === 'X' ? 'blue' : 'red';

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage();
  }
}

// Check if there is a winner or a draw
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    messageElement.textContent = `Player ${currentPlayer} Wins!`;
    isGameActive = false;
    return;
  }

  if (!board.includes('')) {
    messageElement.textContent = 'Draw!';
    isGameActive = false;
  }
}

// Update the display message
function updateMessage() {
  if (isGameActive) {
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Restart the game
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = 'white'; // Reset color to default
  });
  messageElement.textContent = `Player X's turn`;
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
