import React, { useState, useEffect } from 'react';
// Open a WebSocket to the origin server.
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3002")


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

// let newX = 0;
let newY = 0;


const Canvas = (props) => {
  console.log(props.location.location);
  console.log(props.locationOpponent.locationOpponent);
  const canvas = React.useRef();
  const [newX, setNewX] = useState(0);
  const [newOpponentX, setNewOpponentX] = useState(0);
  useEffect(() => {

    const ctx = canvas.current.getContext('2d');
    setNewX(props.location.location, newX)
    setNewOpponentX(props.locationOpponent.locationOpponent, newOpponentX)
    const pawn = new Image();
    pawn.src = '/pawn.png'

    const pawn2 = new Image();
    pawn2.src = '/pawn.png'

    class Token {
      constructor() {
        this.x = 0 + newX;
        this.y = 0 + newY;
      }
      exist() {
        ctx.drawImage(pawn, newX, newY, (window.innerWidth / 10) / 2, (window.innerHeight / 5) / 2);
      }
      update() {
        if (this.x) {
          this.exist();
          this.x = newX;
          this.y = newY;
        } else {
          this.exist();
          this.x = 0;
        }
      }
    }

    class Opponent {
      constructor() {
        this.x = newOpponentX;
        this.y = (screenHeight / 10) * 8;
      }
      exist() {
        ctx.drawImage(pawn2, newOpponentX, this.y, (window.innerWidth / 10) / 2, (window.innerHeight / 5) / 2);
      }
      update() {
        if (this.x) {
          this.exist();
          this.x = newOpponentX;
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
      player.update();
      opponent.update();
      // socket.emit("move", { player })
      requestAnimationFrame(draw);

    }
    const player = new Token();
    const opponent = new Opponent();

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
  }, [props.location.location, newX, props.locationOpponent.locationOpponent,newOpponentX])
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