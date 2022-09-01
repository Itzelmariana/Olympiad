import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import rules from '../images/rules.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav className='row fixed-top'>
      <div className='col-6 p-4'>
        {location.pathname !== '/' && (
          <button className='btn btn-dark mb-3' onClick={() => navigate(-1)}>
            &larr;
          </button>
        )}
      </div>
      <div className='col-6 text-right p-4'>
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
    </nav>
  );
};

export default Navbar;
