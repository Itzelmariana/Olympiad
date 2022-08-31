import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Donation from './Donation';

const Footer = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav className='row fixed-bottom'>
      <div className='col-6  p-4'>
        <Link to='/'>
          <h4>home</h4>
        </Link>
      </div>
      <div className='col-6 text-right p-4'>
        <Button variant='primary' onClick={handleShow}>
          Shop
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Support our project</Modal.Title>
          </Modal.Header>
          <Modal.Body><Donation/></Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </nav>
  );
};

export default Footer;
