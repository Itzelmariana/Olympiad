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
          <Modal.Body>Describe Rules here...</Modal.Body>
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
