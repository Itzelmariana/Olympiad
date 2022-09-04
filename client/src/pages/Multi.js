import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import './Multi.css';

import Auth from '../utils/auth';


// SOCKET CONNECTION AND QUERY PARAMETERS FOR THE MULTIPLAYER URL
import io from 'socket.io-client';
import {
  getQueryParameter,
  getRandomString,
  updateQueryParameter,
} from '../utils';
// ===============================

const Multi = () => {
  const [message, setMessage] = useState('');
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



  // SOCKET IO 
  // IF NO ROOM, GENERATE A ROOM NAME AND CONNECT - OTHERWISE USE PROVIDED ROOM IN URL
  const room = getQueryParameter('room') || getRandomString(5);
  // CONNECT TO ROOM WITHIN URL
  let socket = io(`localhost:3002/?room=${room}`);

  window.history.replaceState(
    {},
    document.title,
    updateQueryParameter('room', room),
  );
  // ANNOUNCE NEW PLAYERS WHEN THEY JOIN
  socket.on('playerJoined', () => {
    console.log('playerJoined');
  });

  socket.on('getMessage', (message) => {
    console.log(message);
  });
  // ===============


















  const handleMessageClick = () => {
    socket.emit("sendMessage", message);
    console.log("button clicked!")
  }
  const handleChange = event => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };



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
          <input
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={message}
          />
          <button className='btn-primary'
            onClick={() =>
              handleMessageClick()
            }>Click Me</button>
        </div>
        <div className='col-sm-12 col-md-3 col-lg-2 myMultiOther'>
          Other User
        </div>
      </div>
    </div>
  );
};
export default Multi;
