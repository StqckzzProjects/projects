let currentPlayer = 'X';
let gameBoard = [];
let gameOver = false;

const statusDisplay = document.getElementById("status");
const gameBoardElement = document.getElementById("gameBoard");
const gameLogsElement = document.getElementById("gameLogs");

function startGame() {
    resetGame();
    gameOver = false;
    gameBoardElement.innerHTML = '';
    gameBoard = Array(36).fill('');
    createBoard(6); // 6x6 grid for 3-player mode
    currentPlayer = 'X';
    statusDisplay.textContent = `Player X's Turn`;
}

function createBoard(size) {
    gameBoardElement.style.gridTemplateColumns = `repeat(${size}, 60px)`;
    gameBoardElement.style.gridTemplateRows = `repeat(${size}, 60px)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => playerMove(i));
        gameBoardElement.appendChild(cell);
    }
}

function playerMove(cellIndex) {
    if (gameOver || gameBoard[cellIndex]) return;

    gameBoard[cellIndex] = currentPlayer;
    updateBoard();

    logGame(`${currentPlayer} placed on ${cellIndex + 1}`);

    if (checkWinner(currentPlayer)) {
        gameOver = true;
        statusDisplay.textContent = `${currentPlayer} wins!`;
    } else if (gameBoard.every(cell => cell !== '')) {
        gameOver = true;
        statusDisplay.textContent = "It's a Draw!";
    } else {
        currentPlayer = getNextPlayer();
        statusDisplay.textContent = `${currentPlayer}'s Turn`;
    }
}

function getNextPlayer() {
    const players = ['X', 'O', 'Y'];
    const currentIndex = players.indexOf(currentPlayer);
    return players[(currentIndex + 1) % players.length];
}

function updateBoard() {
    const cells = gameBoardElement.children;
    for (let i = 0; i < gameBoard.length; i++) {
        cells[i].textContent = gameBoard[i];
        cells[i].style.color = gameBoard[i] ? 'black' : '';
    }
}

function checkWinner(player) {
    const winLength = 4;
    const size = Math.sqrt(gameBoard.length);

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const index = row * size + col;

            if (col <= size - winLength) {
                if (Array.from({ length: winLength }, (_, i) => gameBoard[index + i]).every(cell => cell === player)) {
                    return true;
                }
            }

            if (row <= size - winLength) {
                if (Array.from({ length: winLength }, (_, i) => gameBoard[index + i * size]).every(cell => cell === player)) {
                    return true;
                }
            }

            if (row <= size - winLength && col <= size - winLength) {
                if (Array.from({ length: winLength }, (_, i) => gameBoard[index + i * (size + 1)]).every(cell => cell === player)) {
                    return true;
                }
            }

            if (row <= size - winLength && col >= winLength - 1) {
                if (Array.from({ length: winLength }, (_, i) => gameBoard[index + i * (size - 1)]).every(cell => cell === player)) {
                    return true;
                }
            }
        }
    }
    return false;

}
function logGame(message) {
    const logItem = document.createElement('li');
    logItem.textContent = message;
    gameLogsElement.appendChild(logItem);
}

function resetGame() {
    gameBoard = [];
    currentPlayer = 'X';
    gameOver = false;
}

startGame();
