const boardElem = document.getElementById('board');
const statusElem = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board;
let currentPlayer;
let gameActive;

function initializeGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    renderBoard();
    updateStatus();
}

function renderBoard() {
    boardElem.innerHTML = '';
    board.forEach((cell, idx) => {
        const cellElem = document.createElement('div');
        cellElem.classList.add('cell');
        cellElem.textContent = cell;
        cellElem.addEventListener('click', () => handleCellClick(idx));
        boardElem.appendChild(cellElem);
    });
}

function handleCellClick(idx) {
    if (!gameActive || board[idx] !== '') return;
    board[idx] = currentPlayer;
    if (checkWin(currentPlayer)) {
        gameActive = false;
        updateStatus(`${currentPlayer} wins!`);
    } else if (board.every(cell => cell !== '')) {
        gameActive = false;
        updateStatus('It\'s a draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
    renderBoard();
}

function updateStatus(msg) {
    if (msg) {
        statusElem.textContent = msg;
    } else {
        statusElem.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin(player) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // cols
        [0,4,8],[2,4,6]          // diags
    ];
    return winPatterns.some(pattern =>
        pattern.every(idx => board[idx] === player)
    );
}

restartBtn.addEventListener('click', initializeGame);

initializeGame();