const board = document.querySelector(".board");
const startbutton = document.querySelector(".btn");
const modal = document.querySelector(".modal");
const startGame = document.querySelector(".menu");
const gameOver = document.querySelector(".game-over");
const restartbutton = document.querySelector(".btn-restart");
const blockHeight = 30;
const blockWidth = 30;

const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWidth);

const blocks = [];
let snake = [
  {
    x: 1,
    y: 3,
  },
  {
    x: 1,
    y: 4,
  },
  {
    x: 1,
    y: 5,
  },
];
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

let direction = "right";
let intervalId = null;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    block.innerText = `${row}${col}`;
    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction.includes("left")) {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction.includes("right")) {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction.includes("down")) {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction.includes("up")) {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    // alert("Game Over");
    // modal.style.display = "block";  this method is wrong
    modal.style.display = "flex";
    startGame.style.display = "none";
    gameOver.style.display = "flex";
    clearInterval(intervalId);
  }

  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows), // error by u : dont make food const it was causing the problem make it let
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head);
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });
  snake.unshift(head);
  snake.pop();

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}

function restart() {

  // stop any running interval
  clearInterval(intervalId);

  // remove existing food and snake fills (guard if blocks missing)
  if (blocks[`${food.x}-${food.y}`]) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
  }
  snake.forEach((segment) => {
    const key = `${segment.x}-${segment.y}`;
    if (blocks[key]) blocks[key].classList.remove("fill");
  });

  // hide modal/game-over and prepare to play
  modal.style.display = "none";
  gameOver.style.display = "none";
  startGame.style.display = "none";

  // reset game state
  direction = "right";
  snake = [
    { x: 1, y: 3 },
    { x: 1, y: 4 },
    { x: 1, y: 5 },
  ];

  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };

  // ensure the food cell is marked before rendering loop starts
  if (blocks[`${food.x}-${food.y}`]) {
    blocks[`${food.x}-${food.y}`].classList.add("food");
  }

  // start rendering loop
  intervalId = setInterval(() => {
    render();
  }, 300);

}

// intervalId = setInterval(() => {
//   render();
// }, 500);

addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowDown") {
    // error by u : use = for not == direction cuz we are assigning value to it
    direction = "down";
  } else if (event.key == "ArrowLeft") {
    direction = "left";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  }
});

startbutton.addEventListener("click", () => {
  intervalId = setInterval(() => {
    render();
  }, 300);
  // console.log("ok");
  modal.style.display = "none";
});

restartbutton.addEventListener("click",restart);
