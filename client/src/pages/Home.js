import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

import logo from '../images/logo.png';
import gif from '../images/torchGif.gif';
import Login from '../components/Login';
import Signup from '../components/Signup';
import logoutIcon from '../images/logout.png';

import './Home.css';




const Home = () => {
  const [state, setState] = useState({
    signupOpen: false,
    loginOpen: false,
  });
  const signupClickHandler = () => {
    setState({
      loginOpen: false,
      signupOpen: !state.signupOpen,
    });
  };
  const loginClickHandler = () => {
    setState({
      loginOpen: !state.loginOpen,
      signupOpen: false,
    });
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className='Home container'>
      <div>
        <Link to='/'>
          <h1 className='align-center text-center'>
            <img src={gif} alt='gif' width={'100px'} />

            <img
              className='m-auto d-sm-block'
              src={logo}
              alt='logo'
              width={'60%'}
            />
          </h1>
        </Link>

        <div>
          {Auth.loggedIn() ? (
            <>
              <div className='align-center text-center'>
                <div className='welcome'>
                  <Link to='/me' className='myLink'>
                    <button className='btn btn-lg btn-primary m-2 mb-4 largeButtonYellow'>
                      Welcome, {Auth.getProfile().data.name}
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to='/singleplayer'>
                    <button className='btn btn-lg btn-primary m-2 mb-4 largeButtonGreen'>
                      Single Player
                    </button>
                  </Link>
                </div>
                <div>
                  {/* <Link to='/multiplayer'>
                    <button className='btn btn-lg btn-success m-2 mb-5 largeButtonBlue'>
                      Multi Player
                    </button>
                  </Link> */}
                  <Link to='/connect'>
                  <button className='btn btn-lg btn-success m-2 mb-5 largeButtonBlue'>
                    Multi Player
                  </button>
                  </Link>
                </div>
              </div>
              <div className=' text-right'>
                <button className='btn btn-lg m-2' onClick={logout}>
                  <img src={logoutIcon} alt='logout' width={'60px'} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='align-center text-center'>
                <div>
                  <Button
                    onClick={loginClickHandler}
                    aria-controls='login-collapse-form'
                    aria-expanded={state.loginOpen}
                    className='btn btn-lg btn-primary m-2 largeButtonGreen'
                  >
                    Login
                  </Button>
                  <Collapse in={state.loginOpen}>
                    <div id='login-collapse-form'>
                      <Login />{' '}
                    </div>
                  </Collapse>
                </div>
                <div className='mt-3'>
                  <Button
                    onClick={signupClickHandler}
                    aria-controls='signup-collapse-form'
                    aria-expanded={state.signupOpen}
                    className='btn btn-lg btn-primary m-2  largeButtonBlue'
                  >
                    Signup
                  </Button>
                  <Collapse in={state.signupOpen}>
                    <div id='signup-collapse-form'>
                      <Signup />
                    </div>
                  </Collapse>
                </div>
                <div className='mt-5'></div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Home;
