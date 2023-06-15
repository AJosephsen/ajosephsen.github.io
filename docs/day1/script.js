// Get the canvas element from the DOM
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Create the pong paddle
const paddleWidth = 10, paddleHeight = 100;
const player = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: '#FFF' };
const computer = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: '#FFF' };

// Create the pong ball
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speed: 4, dx: 4, dy: 4, color: '#FF0000' };

// Draw the paddles on the canvas
function drawPaddle(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

// Draw the ball on the canvas
function drawBall(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

// Update the canvas and objects
function update() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the paddles
  drawPaddle(player.x, player.y, player.width, player.height, player.color);
  drawPaddle(computer.x, computer.y, computer.width, computer.height, computer.color);

  // Draw the ball
  drawBall(ball.x, ball.y, ball.radius, ball.color);

  // Move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Collision detection with paddles
  if (
    ball.y + ball.radius > player.y &&
    ball.y - ball.radius < player.y + player.height &&
    ball.dx < 0
  ) {
    ball.dx *= -1;
  }

  if (
    ball.y + ball.radius > computer.y &&
    ball.y - ball.radius < computer.y + computer.height &&
    ball.dx > 0
  ) {
    ball.dx *= -1;
  }

  // Reverse ball direction if it hits top or bottom edges
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }
}

// Update the game state and render the canvas
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
