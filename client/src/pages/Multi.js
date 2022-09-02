import React from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import './Multi.css';

import Auth from '../utils/auth';

const Multi = () => {
  const { profileId } = useParams();
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  const profile = data?.me || data?.profile || {};

  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to='/multiplayer' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <div>
        <h4 className='text-center myMessage'>
          Please <Link to='/'>login</Link> or <Link to='/'>signup</Link> to play
          the game.
        </h4>
      </div>
    );
  }

  return (
    <div className='Multi'>
      <div className='row text-center'>
        <div className='col-sm-12 col-md-3 col-lg-2'>
          <h2 className='btn btn-block myMultiUser'>
            {profileId ? `${profile.name}'s` : ' '}
            {profile.name}
          </h2>
        </div>
        <div className='col-sm-12 col-md-6 col-lg-8 myMultiBoard'>
          Hi I will be a multiplayer board
        </div>
        <div className='col-sm-12 col-md-3 col-lg-2 myMultiOther'>
          Other User
        </div>
      </div>
    </div>
  );
};
export default Multi;
