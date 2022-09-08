import React, { useState, useEffect } from 'react';
// Open a WebSocket to the origin server.
//import io from 'socket.io-client';
//const socket = io.connect("http://localhost:3002")

let screenWidth = window.innerWidth / 2;
let screenHeight = window.innerHeight / 4;

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
    setNewX(props.location.location, newX);
    setNewOpponentX(props.locationOpponent.locationOpponent, newOpponentX);
    const pawn = new Image();
    pawn.src = '/pawn1.png';

    const pawn2 = new Image();
    pawn2.src = '/pawn2.png';

    class Token {
      constructor() {
        this.x = 0 + newX;
        this.y = 0 + newY;
      }
      exist() {
        ctx.drawImage(
          pawn,
          newX,
          newY,
          window.innerWidth / 10 / 2,
          window.innerHeight / 5 / 2
        );
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
        this.y = screenHeight / 2;
      }
      exist() {
        ctx.drawImage(
          pawn2,
          newOpponentX,
          this.y,
          window.innerWidth / 10 / 2,
          window.innerHeight / 5 / 2
        );
        // ctx.drawImage(pawn2, newX, newY, 600, 600, newX, newY, pawn.width*ratio, pawn.height*ratio);
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
    const sizeBoard = document.querySelector('canvas');

    window.addEventListener(
      'resize',
      function () {
        screenWidth = window.innerWidth / 2;
        screenHeight = window.innerHeight / 2;
        console.log('WINDOW RESIZED');
        sizeBoard.width = screenWidth;
        sizeBoard.height = screenHeight;
      },
      3000
    );

    function draw() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Create gradient
      var grd = ctx.createLinearGradient(100, 0, ctx.canvas.width, 0);
      grd.addColorStop(0, 'black');
      grd.addColorStop(0.25, 'grey');
      grd.addColorStop(0.5, 'grey');
      grd.addColorStop(0.75, 'grey');
      grd.addColorStop(1, 'white');

      // Fill with gradient
      ctx.fillStyle = grd;
      ctx.fillRect(
        0,
        ctx.canvas.height / 2,
        ctx.canvas.width,
        ctx.canvas.height / 2
      );

      // Create gradient
      var grd2 = ctx.createLinearGradient(100, 0, ctx.canvas.width, 0);
      grd2.addColorStop(0, 'red');
      grd2.addColorStop(0.25, 'yellow');
      grd2.addColorStop(0.5, 'green');
      grd2.addColorStop(0.75, 'blue');
      grd2.addColorStop(1, 'violet');

      // Fill with gradient
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 2);

      // Create vertical grid lines
      for (let i = 0; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo((screenWidth / 10) * i, 0);
        ctx.lineTo((screenWidth / 10) * i, screenHeight);
        ctx.stroke();
      }
      for (let i = 0; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (screenHeight / 2) * i);
        ctx.lineTo(screenWidth, (screenHeight / 2) * i);
        ctx.stroke();
      }

      opponent.update();
      player.update();

      // socket.emit("move", { player })
      requestAnimationFrame(draw);
    }
    const player = new Token();
    const opponent = new Opponent();

    // CONTROLS FRAMERATE AND ANIMATE - NO TOUCHY!
    let fpsInterval, startTime, now, then, elapsed;

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
  }, [
    props.location.location,
    newX,
    props.locationOpponent.locationOpponent,
    newOpponentX,
  ]);
  // ============================================

  // CREATES THE CANVAS
  return <canvas ref={canvas} width={screenWidth} height={screenHeight} />;
  // =========================
};

export default Canvas;
