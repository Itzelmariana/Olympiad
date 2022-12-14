import React from 'react';
import { Link } from 'react-router-dom';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import './Profile.css';
import Auth from '../utils/auth';
import Highscore from '../components/Highscore';

const Profile = () => {
  const { profileId } = useParams();

  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  const profile = data?.me || data?.profile || {};

  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to='/me' />;
  }

  if (loading) {
    return <div className='loading'>Loading...</div>;
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
    <div>
      <h2 className='card-header text-center myStats'>
        {profileId ? `${profile.name}'s` : 'Welcome, '}
        {profile.name}!
      </h2>

      <h3>
        <Highscore profile={profile} />
      </h3>
    </div>
  );
};

export default Profile;
