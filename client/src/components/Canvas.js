import React from 'react';
// Open a WebSocket to the origin server.
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3002")

// let user_connection;
// socket.on('connectToRoom', function (data) {
//   console.log(`Connected to room ${data}`);
//   user_connection = data;

//   // socket.on("move", (data) => {
//   //   console.log(data);
//   // });
// });

let screenWidth = window.innerWidth / 2;
let screenHeight = window.innerHeight / 2;

setInterval(() => {
  const sizeBoard = document.querySelector('canvas');
  // console.log(sizeBoard);
  window.addEventListener('resize', function () {
    screenWidth = window.innerWidth / 2;
    screenHeight = window.innerHeight / 2;
    sizeBoard.width = screenWidth;
    sizeBoard.height = screenHeight;
  });
}, 500);

let newX = 0;
let newY = 0;

// Handle "move" message received through the socket.
socket.on("move", function (data) {
console.log(data)
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA - Sly Marbo");
  // let movement = stats.twentyFive;
  let move;
  move = screenWidth / 10;
  newX = newX + move;
  console.log(newX);
});
const Canvas = () => {

  const canvas = React.useRef();

  React.useEffect(() => {
    const ctx = canvas.current.getContext('2d');

    const pawn = new Image();
    pawn.src = '/pawn.png'

    class Token {
      constructor() {
        this.x = 0 + newX;
        this.y = 0 + newY;
      }
      exist() {
        ctx.drawImage(pawn, newX, newY, (window.innerWidth / 10) / 2, (window.innerHeight / 5) / 2);
      }
      update() {
        if (this.x < 600) {
          this.exist();
          this.x = newX;
          this.x = newY;
        } else {
          this.exist();
          this.x = 0;
        }
      }
    }
    function draw() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      // console.log('draw');

      // Create gradient
      var grd = ctx.createLinearGradient(100, 0, ctx.canvas.width, 0);
      grd.addColorStop(0, 'red');
      grd.addColorStop(0.25, 'yellow');
      grd.addColorStop(0.5, 'green');
      grd.addColorStop(0.75, 'blue');
      grd.addColorStop(1, 'violet');

      // Fill with gradient
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Create vertical grid lines
      for (let i = 0; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(screenWidth / 10 * i, 0);
        ctx.lineTo(screenWidth / 10 * i, screenHeight);
        ctx.stroke();
      }
      player.update()
      // socket.emit("move", { player })
      requestAnimationFrame(draw);

    }
    const player = new Token();

    // CONTROLS FRAMERATE AND ANIMATE - NO TOUCHY!
    let fps, fpsInterval, startTime, now, then, elapsed;

    function startAnimating(fps) {
      fpsInterval = 1000 / fps;
      then = Date.now();
      startTime = then;
      draw();
    }
    startAnimating(30);

    now = Date.now();
    elapsed = now - startTime;
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      draw();
    }
  })
  // ============================================

  // CREATES THE CANVAS
  return (
    <canvas
      ref={canvas}
      width={screenWidth}
      height={screenHeight}
    />
  )
  // =========================
}

export default Canvas;