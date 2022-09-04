import React, { useState, useEffect } from 'react';
import Canvas from '../components/Canvas';
import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import { ADD_WIN, ADD_LOSE } from '../utils/mutations';


import Auth from '../utils/auth';
import './Multi.css';

// SOCKET CONNECTION AND QUERY PARAMETERS FOR THE MULTIPLAYER URL
import io from 'socket.io-client';
import {
  getQueryParameter,
  getRandomString,
  updateQueryParameter,
} from '../utils';
// ===============================
import qArray from './q';
console.log(qArray);

// ============================================================================
// const questionArray = require('./q');
var he = require('he');

// FINALIZED QUESTION
let q = [];
let answerOptions = [];
// CORRECT ANSWER TO COMPARE CHOICE TO
let correct = [];
function getQuestion() {
  // GET RANDOM NUMBER
  let randomQuestion = Math.floor(Math.random() * 5);
  console.log('random' + randomQuestion);
  // USE RANDOM NUMBER TO SELECT QUESTION FROM ARRAY
  let qa = qArray[randomQuestion];
  answerOptions = [];

  console.log(qa);

  // LOOP THROUGH INCORRECT ANSWERS AND PUSH TO NEW ARRAY
  for (let i = 0; i < 3; i++) {
    answerOptions.push({
      answerText: qa.incorrect_answers[i],
      isCorrect: false,
    });
  }
  // PUSH CORRECT ANSWER TO ARRAY
  answerOptions.push({ answerText: qa.correct_answer, isCorrect: true });

  correct.push({ answerText: qa.correct_answer, isCorrect: true });
  // console.log("Answers: " + q);
  // console.log("Correct Answer:" + correct);
  // PUSH QUESTION TEXT AND ANSWERS TO SAME PLACE
  q.push({ questionText: qa.question, answerOptions });
  // SHUFFLE THE ANSWERS INDEXES
  shuffle(answerOptions);

  console.log('ANSWER OPTIONS: ');
  console.log(answerOptions);
  console.log(q);
}

// FUNCTION TO SHUFFLE THE ARRAY AFTER GIVING IT THE INCORRECT AND CORRECT ANSWERS
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
// ============================================================================


let myPlayer;

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
socket.on('playerJoined', (i) => {
  console.log('playerJoined');
  console.log(`PLAYER: ${i}`);
});

socket.on('whatPlayerAmI', (numClients) => {
  myPlayer = numClients;
  console.log(`I AM PLAYER NUMBER: ${myPlayer}`);
  if (myPlayer == 1) {
    console.log("IMA GET YOU SOME QUESTIONS BROOOOOOOOO");
  }
});

const Multi = () => {
  // STATES 
  // ==================================================
  const [message, setMessage] = useState('');
  const [playerTurn, setPlayerTurn] = useState(1);
  const [chatText, setChatText] = useState([])

  useEffect(() => {
    socket.on('getMessage', (message) => setChatText([...chatText, message]));
    console.log(chatText);
  }, [chatText]);

  // +++++++++++++++++++++++++++++++++++++++++++++++++++
  const [callAddWinApi] = useMutation(ADD_WIN);

  const addWin = async () => {
    try {
      await callAddWinApi({
        variables: { win: 1 },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [callAddLoseApi] = useMutation(ADD_LOSE);

  const addLose = async () => {
    try {
      await callAddLoseApi({
        variables: { lose: 1 },
      });
    } catch (error) {
      console.error(error);
    }
  };
  // +++++++++++++++++++++++++++++++++++++++++++++++++++

  // AUTHORIZATION
  // +++++++++++++++++++++++++++++++++++++++++++++++++++
  const { profileId } = useParams();
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  const profile = data?.me || data?.profile || {};

  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to='/singleplayer' />;
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
  // +++++++++++++++++++++++++++++++++++++++++++++++++++


  // CHAT MESSANGE HANDLERS
  const handleMessageClick = () => {

    socket.emit("sendMessage", `<li>${message}</li>`);
    console.log(message);
  }
  const handleChange = event => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };
  // ========================================================

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

        </div>
        <div className='col-sm-12 col-md-3 col-lg-2 myMultiOther'>
          CHAT
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
            }>SEND</button>
          <div id='messageText'>
            <ul>{chatText}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Multi;
