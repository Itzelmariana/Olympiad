import React from 'react';
import { useQuery } from '@apollo/client';

import Profiles from '../components/Profiles';

import './Highscore.css';

import { QUERY_PROFILES } from '../utils/queries';

const Highscore = ({ profile }) => {
  const { data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];
  console.log(profiles);
  return (
    <div className='Highscores row text-center'>
      <div className='col-sm-12 col-md-6 mt-3 mb-3 '>
        <div className='myScore'>
          <h1>My Score</h1>
          <div className='container '>
            <div className='row'>
              <div className='col-6'>
                <p>Win</p>
              </div>
              <div className='col-6'>
                <p>Lose</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>{profile.win}</div>
              <div className='col-6'>{profile.lose}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-sm-12 col-md-6 mt-3 mb-3 '>
        <div className='myUsersScores'>
          <h1>Highscore</h1>
          <div className='container '>
            <div className='row'>
              <div className='col-6'>
                <p>User</p>
              </div>
              <div className='col-6'>
                <p>Win</p>
              </div>
            </div>
            <Profiles profiles={profiles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highscore;
