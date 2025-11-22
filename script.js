const board = document.querySelector(".board");
const blockHeight = 30;
const blockWidth = 30;

const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWidth);

const blocks = [];
const snake = [
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
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}

intervalId = setInterval(() => {
  let head = null;
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
    clearInterval(intervalId);
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });
  snake.unshift(head);
  snake.pop();
  render();
}, 500);

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
