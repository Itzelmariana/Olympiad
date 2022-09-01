import React, { useState } from 'react';
import Score from './Score';

const Highscore = () => {
  return (
    <div className='Highscores row text-center'>
      <div className='col-sm-12 col-md-6'>
        <h1>My Score</h1>
      </div>
      <div className='col-sm-12 col-md-6'>
      <Score/>
      </div>
      
    </div>
    
  );
};

export default Highscore;