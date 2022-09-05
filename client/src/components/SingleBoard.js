import React from 'react';
import { Link } from 'react-router-dom';

import './SingleBoard.css';

const SingleBoard = () => {
  return (
    <div className='SingleBoard'>
      <Link
        to='/singleplayer'
        onClick={() => window.location.reload()}
        className='myBtnPlayagain'
      >
        🔄
      </Link>
    </div>
  );
};
export default SingleBoard;
