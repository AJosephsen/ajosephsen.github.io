const { Game, Key, Container, Sprite } = PixelJS;

// Create the game instance
const game = new Game(800, 400);

// Create the container to hold the game objects
const container = new Container();

// Create the pong paddle
const paddleWidth = 10, paddleHeight = 100;
const player = new Sprite();
player.setAnchor(0, 0.5);
player.setSize(paddleWidth, paddleHeight);
player.setColor("#FFF");
player.setPosition(0, game.height / 2);

const computer = new Sprite();
computer.setAnchor(1, 0.5);
computer.setSize(paddleWidth, paddleHeight);
computer.setColor("#FFF");
computer.setPosition(game.width, game.height / 2);

// Create the pong ball
const ball = new Sprite();
ball.setAnchor(0.5, 0.5);
ball.setSize(20, 20);
ball.setColor("#FF0000");
ball.setPosition(game.width / 2, game.height / 2);

// Add the game objects to the container
container.addChild(player);
container.addChild(computer);
container.addChild(ball);

// Add the container to the game
game.stage.addChild(container);

// Handle keyboard input
game.onUpdate = function (deltaTime) {
  if (game.keyboard.isKeyDown(Key.Up) && player.y > 0) {
    player.move(0, -10);
  }

  if (game.keyboard.isKeyDown(Key.Down) && player.y < game.height) {
    player.move(0, 10);
  }
};

// Update the game state
game.onUpdate = function (deltaTime) {
  // Move the ball
  ball.move(4, 4);

  // Collision detection with paddles
  if (
    ball.y + ball.height / 2 > player.y - player.height / 2 &&
    ball.y - ball.height / 2 < player.y + player.height / 2 &&
    ball.vx < 0
  ) {
    ball.vx *= -1;
  }

  if (
    ball.y + ball.height / 2 > computer.y - computer.height / 2 &&
    ball.y - ball.height / 2 < computer.y + computer.height / 2 &&
    ball.vx > 0
  ) {
    ball.vx *= -1;
  }

  // Reverse ball direction if it hits top or bottom edges
  if (ball.y + ball.height / 2 > game.height || ball.y - ball.height / 2 < 0) {
    ball.vy *= -1;
  }
};

// Start the game
game.start();
