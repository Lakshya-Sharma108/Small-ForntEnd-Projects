const board = document.querySelector(".board");
const startBtn = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartBtn = document.querySelector(".btn-restart");


const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");


const blockHeight = 40;
const blockWidth = 40;

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = `00:00`;

highScoreElement.innerText = highScore;

// Calculating how much blocks we can fit in the board
const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)

let intervalId = null;
let timeIntervalId = null;

let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };


const blocks = [];
let snake = [{
    x: 1, y: 3
},];
let direction = "down";


for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        // block.innerText = `${row},${col}`;
        blocks[`${row},${col}`] = block;
    }
}


function renderSnake() {
    let head = null;
    blocks[`${food.x},${food.y}`].classList.add("food");

    if (direction == "left") {
        head = {
            x: snake[0].x,
            y: snake[0].y - 1
        }
    } else if (direction == "right") {
        head = {
            x: snake[0].x,
            y: snake[0].y + 1
        }
    } else if (direction == "down") {
        head = {
            x: snake[0].x + 1,
            y: snake[0].y
        }
    } else if (direction == "up") {
        head = {
            x: snake[0].x - 1,
            y: snake[0].y
        }
    }


    // Check if the snake hits the wall
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(intervalId);

        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";

        return;
    }


    // Check if the snake eats the food
    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.x},${food.y}`].classList.remove("food");
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
        blocks[`${food.x},${food.y}`].classList.add("food");
        snake.unshift(head);

        score += 10;
        scoreElement.innerText = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore.toString());
            // highScoreElement.innerText = highScore;
        }
    }


    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.remove("fill");
    });

    snake.unshift(head);
    snake.pop();



    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.add("fill");
    });
}


startBtn.addEventListener("click", () => {
    modal.style.display = "none";
    intervalId = setInterval(() => {
        renderSnake();
    }, 300);

    timeIntervalId = setInterval(() => {
        // Destructuring the time string into minutes and seconds
        let [min, sec] = time.split(":").map(Number);

        if (sec == 59) {
            min += 1;
            sec = 0;
        } else {
            sec += 1;
        }

        time = `${min}:${sec}`;
        timeElement.innerText = time;
    }, 1000);
});

restartBtn.addEventListener("click", restartGame);


function restartGame() {
    blocks[`${food.x},${food.y}`].classList.remove("food");
    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.remove("fill");
    });

    score = 0;
    time = `00:00`;

    scoreElement.innerText = score;
    timeElement.innerText = time;
    highScoreElement.innerText = highScore;

    modal.style.display = "none";
    direction = "down";
    snake = [{ x: 1, y: 3 }];
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
    intervalId = setInterval(() => {
        renderSnake();
    }, 300);
}


addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
        direction = "up";
    } else if (event.key == "ArrowDown") {
        direction = "down";
    } else if (event.key == "ArrowLeft") {
        direction = "left";
    } else if (event.key == "ArrowRight") {
        direction = "right";
    }
});


// Event listener for mobile controls
document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        direction = btn.getAttribute("data-direction");

        if (direction == "up") {
            direction = "up";
        } else if (direction == "down") {
            direction = "down";
        } else if (direction == "left") {
            direction = "left";
        } else if (direction == "right") {
            direction = "right";
        }
    });
});