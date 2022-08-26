import React from 'react';
import logo from './logo.png';

import './Navbar.css';

export default function Navbar({ currentPage, handlePageChange }) {
  return (
    <div className='Navbar'>
      <div className='nav  row myContainer'>
        <div className='col-6 myLogo'>
          <a href='#Welcome' onClick={() => handlePageChange('Welcome')}>
            <img src={logo} alt='logo' />{' '}
          </a>
        </div>
        <div className='col-6'>
          <div className='row myNavTab'>
            <div className='nav-item col-3'>
              <a
                href='#Rules'
                onClick={() => handlePageChange('Rules')}
                className={
                  currentPage === 'Rules' ? 'nav-link active' : 'nav-link'
                }
              >
                Rules
              </a>
            </div>
            <div className='nav-item col-3'>
              <a
                href='#Stats'
                onClick={() => handlePageChange('Stats')}
                className={
                  currentPage === 'Stats' ? 'nav-link active' : 'nav-link'
                }
              >
                Stats
              </a>
            </div>
            <div className='nav-item col-3'>
              <a
                href='#Donate'
                onClick={() => handlePageChange('Donate')}
                className={
                  currentPage === 'Donate' ? 'nav-link active' : 'nav-link'
                }
              >
                Donate
              </a>
            </div>
            <div className='nav-item col-3'>
              <a
                href='#LogIn'
                onClick={() => handlePageChange('LogIn')}
                className={
                  currentPage === 'LogIn' ? 'nav-link active' : 'nav-link'
                }
              >
                LogIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
