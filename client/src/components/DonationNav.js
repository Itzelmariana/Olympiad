import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Donation from './Donation';
import donation from '../images/donation.png';

const DonationNav = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='DonationIcon'>
      <Button variant='' onClick={handleShow}>
        <img src={donation} alt='Donation button' width={'90px'} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Support our project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Donation />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DonationNav;
