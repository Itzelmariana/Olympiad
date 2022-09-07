import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Link } from 'react-router-dom';
import home from '../images/home.png';

import DonationNav from './DonationNav';

import rules from '../images/rules.png';

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className=' Navbar row fixed-top'>
      <div className='homeNav col col-md-8 col-lg-8 pr-2'>
        <Link
          to='/'
          onClick={() => {
            window.location.href = '/';
          }}
        >
          <img src={home} alt='Home button' width={'90px'} />
        </Link>
      </div>

      <div className='donationNav col col-md-2 col-lg-2 text-right'>
        <DonationNav />
      </div>
      <div className='rulesNav col col-md-2 col-lg-2'>
        <Button variant='' onClick={handleShow}>
          <img src={rules} alt='rules' width={'90px'} />
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <h1>How to Play</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Welcome to Olympiad!</h2>
            <p>
              We are a community of trivia fanatics. Sign up or login to flex
              your trivia knowledge!
            </p>
            <p>
              Once you have created your account, you can begin by selecting the
              single player option. You can also invite friends by selecting the
              multiplayer option. This game was insprired by the poplular trivia
              board game, Marathon, played in Mexico!
            </p>
            <h3>Single Player</h3>
            <p>
              The objective is to win against your own ignorance. To play,
              answer the multiple choice questions correctly to advance your
              token forward towards the finish line. If you answer a question
              incorrectly, the oppsoing token, representing your ignorance, will
              move towards their finish line. Whichever token reaches the finish
              line first, wins! Will you be brave enough and challenge your own
              ignorance?
            </p>
            <h3>Multiplayer Player</h3>
            <p>
              To access the muliplayer game one player should first login. Once
              they are logged in, the player can share their URL with player 2.
              Player 2 should copy and paste the URL into their browser. This
              will give both players access to the player 1's profile. From this
              screen, both players should select the multiplayer option to begin
              playing.
            </p>
            <p>
              Once both players have accessed the game, each player will take
              turns answering the questions. You will be playing against your
              friends! If a player gets a question correct, their game piece
              will move forward towards the finish line. Player 1 and player 2
              will continue taking turns until the first player to reach the end
              wins! You can chat with your friend while you play!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
