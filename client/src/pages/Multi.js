import React, { useState, useEffect } from 'react';
import Canvas2 from '../components/Canvas2';
import { Link } from 'react-router-dom';

import './Multi.css';

// SOCKET CONNECTION AND QUERY PARAMETERS FOR THE MULTIPLAYER URL
import io from 'socket.io-client';
import {
  getQueryParameter,
  getRandomString,
  updateQueryParameter,
} from '../utils';
// ===============================
import qArray from './q2';
import Chatbox from '../components/Chatbox';
// console.log(qArray);

// ============================================================================

let screenWidth = window.innerWidth / 2;
// let screenHeight = window.innerHeight / 2;

// const questionArray = require('./q');
var he = require('he');

// FINALIZED QUESTION
let q = [];
let answerOptions = [];
// CORRECT ANSWER TO COMPARE CHOICE TO
let correct = [];

function getQuestion() {
  // GET RANDOM NUMBER
  // let randomQuestion = Math.floor(Math.random() * 5);
  // console.log('random' + randomQuestion);
  // USE RANDOM NUMBER TO SELECT QUESTION FROM ARRAY
  let qa = qArray[1];
  answerOptions = [];

  // console.log(qa);

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

  // console.log('ANSWER OPTIONS: ');
  // console.log(answerOptions);
  // console.log(q);
}
getQuestion();
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
// let socket = io(`localhost:3001/?room=${room}`);

// client-side
// const io = require("socket.io-client");
const socket = io(`https://olympiad-game.herokuapp.com/?room=${room}`, {
  withCredentials: true,
});
if (window.location.href.indexOf('multiplayer') === -1) {
  window.history.replaceState(
    {},
    document.title,
    updateQueryParameter('room', room)
  );
}

// ANNOUNCE NEW PLAYERS WHEN THEY JOIN
socket.on('playerJoined', (i) => {
  // console.log('playerJoined');
  // console.log(`PLAYER: ${i}`);
});

socket.on('whatPlayerAmI', (numClients) => {
  myPlayer = numClients;
  // console.log(`I AM PLAYER NUMBER: ${myPlayer}`);
  if (myPlayer === 1) {
    // console.log('I AM PLAYER 11111111');
  }
});

const Multi = () => {
  // STATES
  // ==================================================

  const [currentQuestion, setCurrentQuestion] = useState(0);

  //const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [player2Score, setplayer2Score] = useState(0);

  const [message, setMessage] = useState('');
  const [chatText, setChatText] = useState([]);

  const [playerTurn, setPlayerTurn] = useState(1);

  const [locationP1X, setLocation] = useState(0);
  const [locationP2X, setLocationP2X] = useState(0);
  // ==========================================================USE EFFECT
  socket.on('player1Position', (newCoords) => {
    console.log('?????????????');
    console.log(newCoords);
    setLocation(newCoords);
  });
  socket.on('player2Position', (newCoords) => {
    console.log('++++++++++++');
    console.log(newCoords);
    setLocationP2X(newCoords);
  });
  socket.on('newPlayerTurn', (turnNumber) => {
    console.log(`Turn Number: ${turnNumber}`);
    setPlayerTurn(turnNumber);
  });

  let props = {
    chatText: { chatText },
    locationP1X: { locationP1X },
    locationP2X: { locationP2X },
  };

  useEffect(() => {
    getQuestion();
    socket.on('getMessage', (message) => setChatText([...chatText, message]));
    // console.log(chatText);
  }, [chatText]);

  // +++++++++++++++++++++++++++++++++++++++++++++++++++

  // +++++++++++++++++++++++++++++++++++++++++++++++++++

  // AUTHORIZATION
  // +++++++++++++++++++++++++++++++++++++++++++++++++++
  // const { profileId } = useParams();
  // const { loading, data } = useQuery(
  //   profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
  //   {
  //     variables: { profileId: profileId },
  //   }
  // );

  // const profile = data?.me || data?.profile || {};

  // if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
  //   return <Navigate to='/multiplayer' />;
  // }

  // if (loading) {
  //   return <div className='loading'>Loading...</div>;
  // }

  // if (!profile?.name) {
  //   return (
  //     <div>
  //       <h4 className='text-center myMessage'>
  //         Please <Link to='/'>login</Link> or <Link to='/'>signup</Link> to play
  //         the game.
  //       </h4>
  //     </div>
  //   );
  // }
  // +++++++++++++++++++++++++++++++++++++++++++++++++++

  // HANDLE ANSWER OPTIONS WHEN CLICKED ================
  let whatever;
  let turnNumber;
  const handleAnswerOptionClick = (isCorrect) => {
    if (myPlayer === playerTurn) {
      if (isCorrect) {
        let audio = new Audio('aq.mp3');
        audio.play();
        if (myPlayer === 1) {
          setScore(score + 1);
          let audio = new Audio('win.mp3');
          audio.volume = 0.1;
          audio.play();
          whatever = locationP1X + screenWidth / 10;
          socket.emit('player1Move', whatever);
          // setLocation(locationP1X + whatever);
          turnNumber = 2;
          socket.emit('changePlayerTurn', turnNumber);
        } else if (myPlayer === 2) {
          setplayer2Score(player2Score + 1);
          let audio = new Audio('win.mp3');
          audio.volume = 0.1;
          audio.play();
          whatever = locationP2X + screenWidth / 10;
          socket.emit('player2Move', whatever);

          turnNumber = 1;
          socket.emit('changePlayerTurn', turnNumber);
        }
      } else {
        // setplayer2Score(player2Score + 1);
        // locationOpponent = locationOpponent - screenWidth / 10;
      }
      console.log(whatever);

      const nextQuestion = currentQuestion;

      if (nextQuestion < 50 && score < 9 && player2Score < 9) {
        getQuestion();
        setCurrentQuestion(currentQuestion + 1);
        // } else {
        //   setShowScore(true);
      }
    }
  };

  let decodedText = q[currentQuestion].questionText;
  let newDecodedText = he.decode(decodedText);
  // console.log('DECODED: ' + newDecodedText);

  // CHAT MESSANGE HANDLERS
  const handleMessageClick = () => {
    socket.emit('sendMessage', `${message}`);
    // console.log(message);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);

    // console.log('value is:', event.target.value);
  };
  // ========================================================

  return (
    <div className='Multi'>
      <div className='row text-center'>
        <div className='col-sm-12 col-md-3 col-lg-3 myMultiUser'>
          <div className=' ml-4 mr-4 p-3 shadow mb-1 bg-white text-center myCard'>
            <div className='question-section'>
              <div className='question-count'>
                <span>Question {currentQuestion + 1}</span>
              </div>
              <div className='question-text myQuestions'>{newDecodedText}</div>
            </div>
            <div className='answer-sections'>
              {q[currentQuestion].answerOptions.map((answerOption) => (
                <button
                  className=' btn btn-block myBtn'
                  key={Math.floor(Math.random() * 9999)}
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                >
                  {he.decode(answerOption.answerText)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className='col-sm-12 col-md-6 col-lg-6 myMultiBoard'>
          <Link
            to='/multiplayer'
            onClick={() => window.location.reload()}
            className='myBtnPlayagain mb-3'
          >
            Play again
          </Link>
          <Canvas2 {...props} />
        </div>
        <div className='col-sm-12 col-md-3 col-lg-3 myMultiOther'>
          <div className=' myChat'>
            <div className='mb-2'>Chat</div>
            <input
              type='text'
              id='message'
              name='message'
              className='chatbox'
              onChange={handleChange}
              value={message}
              placeholder='type your message..'
            />
            <button className='myBtnChat' onClick={() => handleMessageClick()}>
              Send
            </button>
            <Chatbox {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Multi;
