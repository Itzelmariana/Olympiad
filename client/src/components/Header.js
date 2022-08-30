import React from 'react';
// import { Link } from 'react-router-dom';

// import Auth from '../../utils/auth';

// import logo from './logo.png';

const Header = () => {
  // const logout = (event) => {
  //   event.preventDefault();
  //   Auth.logout();
  // };
  return (
    <header className='Header'>
      {/* <div>
        <Link to='/'>
          <h1 className='align-center text-center'>
            <img className='align-center text-center' src={logo} alt='logo' />
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
                  <button className='btn btn-lg btn-light m-2'>
                    Single Player
                  </button>
                </div>
                <div>
                  <button className='btn btn-lg btn-light m-2'>
                    Multi Player
                  </button>
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
              <div>
                <Link className='btn btn-lg btn-primary m-2' to='/login'>
                  Login
                </Link>
              </div>
              <Link className='btn btn-lg btn-light m-2' to='/signup'>
                Signup
              </Link>
            </>
          )}
        </div>
      </div> */}
    </header>
  );
};

export default Header;
