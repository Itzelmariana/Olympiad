import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

import logo from '../images/logo.png';
import gif from '../images/torchGif.gif';
import Login from '../components/Login';
import Signup from '../components/Signup';

import './Home.css';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [openedSignup, setOpenSignup] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className='Home container border border-dark'>
      <div>
        <Link to='/'>
          <h1 className='align-center text-center'>
            <img src={gif} alt='gif' width={'100px'} />

            <img className='m-auto d-sm-block' src={logo} alt='logo' />
          </h1>
        </Link>

        <div>
          {Auth.loggedIn() ? (
            <>
              <div className='align-center text-center'>
                <div>
                  <Link to='/me'>Welcome {Auth.getProfile().data.name}</Link>
                </div>
                <div>
                  <Link to='/singleplayer'>
                    <button className='btn btn-lg btn-primary m-2 mb-4 largeButtons'>
                      Single Player
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to='/multiplayer'>
                    <button className='btn btn-lg btn-success m-2 mb-5 largeButtons'>
                      Multi Player
                    </button>
                  </Link>
                </div>
              </div>
              <div className=' text-right'>
                <button className='btn btn-lg btn-light m-2' onClick={logout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='align-center text-center'>
                <div>
                  <Button
                    onClick={() => setOpen(!open)}
                    aria-controls='login-collapse-form'
                    aria-expanded={open}
                    className='btn btn-lg btn-primary m-2 largeButtons'
                  >
                    Login
                  </Button>
                  <Collapse in={open}>
                    <div id='login-collapse-form'>
                      <Login />{' '}
                    </div>
                  </Collapse>
                </div>
                <div className='mt-3'>
                  <Button
                    onClick={() => setOpenSignup(!openedSignup)}
                    aria-controls='signup-collapse-form'
                    aria-expanded={openedSignup}
                    className='btn btn-lg btn-primary m-2 mb-5 largeButtons'
                  >
                    Signup
                  </Button>
                  <Collapse in={openedSignup}>
                    <div id='signup-collapse-form'>
                      <Signup />
                    </div>
                  </Collapse>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Home;
