const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
    } else if (gameState.every(cell => cell !== '')) {
        alert('It\'s a draw!');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerText = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

let gameActive = true;
