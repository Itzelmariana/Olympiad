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
        <Link to='/'>
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
            <Modal.Title>How to Play</Modal.Title>
          </Modal.Header>
          <Modal.Body> Welcome to Olympiad! We are a community of trivia fanatics. 
            Sign up or login to flex your trivia knowledge! Once you have created 
            your account, you can begin by selecting the single player option. 
            You can also invite friends by selecting the multiplayer option. This game 
            was insprired by the poplular trivia board game, Marathon, played in Mexico!
            <br></br>
            <br></br>
            The objective is to win against your own ignorance. To play, answer the multiple choice questions correctly to 
            advance your token forward towards the finish line. If you answer a question
            incorrectly, the oppsoing token, representing your ignorance, will move towards their 
            finish line. Whichever token reaches the finish line first, wins! Will you 
            be brave enough and challenge your own ignorance?
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
