let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let isTwoPlayer = true;
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('gameStatus');
const resetButton = document.getElementById('resetBtn');
const twoPlayerBtn = document.getElementById('twoPlayerBtn');
const computerBtn = document.getElementById('computerBtn');

// Initialize the game
function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    twoPlayerBtn.addEventListener('click', () => setMode(true));
    computerBtn.addEventListener('click', () => setMode(false));
    updateStatus();
}

function setMode(isTwoPlayerMode) {
    isTwoPlayer = isTwoPlayerMode;
    resetGame();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    playTurn(clickedCell, clickedCellIndex);

    if (!isTwoPlayer && currentPlayer === "O" && gameActive) {
        setTimeout(playComputerTurn, 500);
    }
}

function playTurn(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkForWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
}

function playComputerTurn() {
    let availableCells = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    
    if (randomIndex !== undefined) {
        const computerCell = document.querySelector(`[data-index='${randomIndex}']`);
        playTurn(computerCell, randomIndex);
    }
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }
}

function updateStatus() {
    if (gameActive) {
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    cells.forEach(cell => (cell.textContent = ""));
    updateStatus();
}

// Initialize the game when the page loads
initializeGame();