import React from 'react';
import { useQuery } from '@apollo/client';

import Profiles from '../components/Profiles';

import { QUERY_PROFILES } from '../utils/queries';

const Highscore = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];
  return (
    <div className='Highscores row text-center'>
      <div className='col-sm-12 col-md-6'>
        <h1>My Score</h1>
      </div>
      <div className='col-sm-12 col-md-6'>
        <h1>Highscore</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <Profiles profiles={profiles} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Highscore;
