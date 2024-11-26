const player1 = "Pink";
const player2 = "Green";
let currentPlayer = player1;

let gameOver = false;
let gameBoard;
let currentColumn;

const rows = 6;
const columns = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    gameBoard = [];
    currentColumn = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece)
            document.getElementById("gameBoard").append(tile);
        }

        gameBoard.push(row);
    }
}

function restartGame() {
    gameOver = false;
    currentPlayer = player1;
    document.getElementById("gameBoard").innerHTML = '';

    let status = document.getElementById("status");
    status.innerHTML = `<span class="pink">Player 1</span>'s move`;
    gameBoard = [];
    currentColumn = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece)
            document.getElementById("gameBoard").append(tile);
        }

        gameBoard.push(row);
    }
}

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", restartGame);

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currentColumn[c];
    if (r < 0) {
        return;
    }

    gameBoard[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    let status = document.getElementById("status");
    if (currentPlayer == player1) {
        tile.classList.add("player-1");
        currentPlayer = player2;
        status.innerHTML = `<span class="green">Player 2</span>'s move`;
    } else {
        tile.classList.add("player-2");
        currentPlayer = player1;
        status.innerHTML = `<span class="pink">Player 1</span>'s move`;
    }

    r -= 1;
    currentColumn[c] = r;

    checkWinner();
}

function checkWinner() {
    //horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (gameBoard[r][c] != ' ') {
                if (gameBoard[r][c] == gameBoard[r][c+1] && 
                    gameBoard[r][c+1] == gameBoard[r][c+2] && 
                    gameBoard[r][c+2] == gameBoard[r][c+3]) {
                        setWinner(r, c);
                        return;
                    }
            }
        }
    }

    //vertically
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (gameBoard[r][c] != ' ') {
                if (gameBoard[r][c] == gameBoard[r+1][c] && 
                    gameBoard[r+1][c] == gameBoard[r+2][c] && 
                    gameBoard[r+2][c] == gameBoard[r+3][c]) {
                        setWinner(r, c);
                        return;
                    }
            }
        }
    }

    //diagonally
    for (let r = 0; r < rows - 3; r++){
        for (let c = 0; c < columns - 3; c++) {
            if (gameBoard[r][c] != ' ') {
                if (gameBoard[r][c] == gameBoard[r+1][c+1] &&
                    gameBoard[r+1][c+1] == gameBoard[r+2][c+2] &&
                    gameBoard[r+2][c+2] == gameBoard[r+3][c+3]) {
                        setWinner(r, c);
                        return;
                    }
            }
        }
    }

    //anti diagonaly
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (gameBoard[r][c] != ' ') {
                if (gameBoard[r][c] == gameBoard[r-1][c+1] && 
                    gameBoard[r-1][c+1] == gameBoard[r-2][c+2] && 
                    gameBoard[r-2][c+2] == gameBoard[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

}

function setWinner(r, c) {
    let winner = document.getElementById("status");
    if (gameBoard[r][c] == player1) {
        winner.innerHTML = `<span class="pink">Player 1</span>'s wins!`;
    } else {
        winner.innerHTML = `<span class="green">Player 2</span>'s wins!`;
    }

    gameOver = true;
}
