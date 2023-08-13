const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocityX = Math.random() * 4 - 2;
    this.velocityY = Math.random() * 4 - 2;
  }

  checkCollisionWithOtherBalls(otherBalls) {
    otherBalls.forEach((otherBall) => {
      if (otherBall !== this) {
        const dx = otherBall.x - this.x;
        const dy = otherBall.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius + otherBall.radius) {
          // Elastic collision logic
          const angle = Math.atan2(dy, dx);
          const speed1 = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
          const speed2 = Math.sqrt(
            otherBall.velocityX ** 2 + otherBall.velocityY ** 2
          );
          const direction1 = Math.atan2(this.velocityY, this.velocityX);
          const direction2 = Math.atan2(
            otherBall.velocityY,
            otherBall.velocityX
          );

          const newVelocityX1 = speed1 * Math.cos(direction1 - angle);
          const newVelocityY1 = speed1 * Math.sin(direction1 - angle);
          const newVelocityX2 = speed2 * Math.cos(direction2 - angle);
          const newVelocityY2 = speed2 * Math.sin(direction2 - angle);

          this.velocityX = newVelocityX2;
          this.velocityY = newVelocityY2;
          otherBall.velocityX = newVelocityX1;
          otherBall.velocityY = newVelocityY1;
        }
      }
    });
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.velocityX *= -1;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.velocityY *= -1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

const balls = [];

function createBall() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 20 + 10;
  const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;

  const ball = new Ball(x, y, radius, color);
  balls.push(ball);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    ball.checkCollisionWithOtherBalls(balls); // Check collision with other balls
    ball.update();
    ball.draw();
  });

  requestAnimationFrame(animate);
}

createBall();
createBall();
createBall();
createBall();
createBall();
createBall();
createBall();
createBall();
createBall();

animate();

let selectedBall = null;

canvas.addEventListener('mousedown', (event) => {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  // Check if user clicked on an existing ball
  selectedBall = balls.find((ball) => {
    const dx = mouseX - ball.x;
    const dy = mouseY - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < ball.radius;
  });

  if (!selectedBall) {
    // Create a new ball at the click position
    const newBall = new Ball(
      mouseX,
      mouseY,
      Math.random() * 20 + 10,
      getRandomColor()
    );
    balls.push(newBall);
  }
});

canvas.addEventListener('mousemove', (event) => {
  if (selectedBall) {
    selectedBall.x = event.clientX - canvas.getBoundingClientRect().left;
    selectedBall.y = event.clientY - canvas.getBoundingClientRect().top;
  }
});

canvas.addEventListener('mouseup', () => {
  selectedBall = null;
});

function getRandomColor() {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;
}
