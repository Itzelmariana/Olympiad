import React from 'react';
import useSound from 'use-sound';
import './Footer.css';

const Footer = () => {
  const chillUrl = '/beep.mp3';

  const [play, { stop }] = useSound(chillUrl, {
    autoplay: false,
    loop: true,
    volume: 0.2,
  });

  return (
    <div className='Footer fixed-bottom text-right'>
      <button onClick={() => play()}>
        <span role='img' aria-label='play button'>
          ▶️
        </span>
      </button>
      <button onClick={() => stop()}>
        <span role='img' aria-label='stop button'>
          ⏹️
        </span>
      </button>
    </div>
  );
};

export default Footer;
