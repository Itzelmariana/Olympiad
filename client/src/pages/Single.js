import React, { useState, useEffect } from 'react';
import Canvas from '../components/Canvas';
import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import { ADD_WIN, ADD_LOSE } from '../utils/mutations';
import SingleBoard from '../components/SingleBoard';
import Auth from '../utils/auth';
import './Single.css';

import axios from 'axios';

const url =
  'https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple';
const questionArray = [];
axios
  .get(url)
  .then((response) => {
    for (let i = 0; i < response.data.results.length; i++) {
      questionArray.push(response.data.results[i]);
    }
  })
  .then(() => {
    console.log(questionArray);
  });

let screenWidth = window.innerWidth / 2;
// let screenHeight = window.innerHeight / 2;
let location = 0;
let locationOpponent = (screenWidth / 10) * 9;

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
  let qa = questionArray[randomQuestion];
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

// REACT BS STARTS HERE
export default function Single() {
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

  useEffect(() => {
    getQuestion();
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [ignoranceScore, setIgnoranceScore] = useState(0);

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
  // +++++++++++++++++++++++++++++++++++++++++++++++++++

  // HANDLE ANSWER OPTIONS WHEN CLICKED ================
  const handleAnswerOptionClick = (isCorrect) => {
    let audio = new Audio('aq.mp3');
    audio.play();

    if (isCorrect) {
      setScore(score + 1);
      location = location + screenWidth / 10;
      let audio = new Audio('win.mp3');
      audio.play();
    } else {
      setIgnoranceScore(ignoranceScore + 1);
      locationOpponent = locationOpponent - screenWidth / 10;
      let audio = new Audio('wrong.mp3');
      audio.play();
    }

    const nextQuestion = currentQuestion;
    if (nextQuestion < 50 && score < 9 && ignoranceScore < 9) {
      getQuestion();
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
      if (score === 9) {
        addWin();
      } else {
        addLose();
      }
    }
  };

  let decodedText = q[currentQuestion].questionText;
  let newDecodedText = he.decode(decodedText);
  console.log('DECODED: ' + newDecodedText);

  let props = {
    location: { location },
    locationOpponent: { locationOpponent },
  };

  return (
    <div className='Single'>
      <div className='question-card-section'>
        {showScore ? (
          <div className='row'>
            <div className='col-sm-12 col-md-4 col-lg-3'>
              <h2 className='btn btn-block myUser'>
                {profileId ? `${profile.name}'s` : ' '}
                {profile.name}
              </h2>

              <div className=' m-2 p-3 shadow p-3 mb-5 bg-white text-center myCard'>
                <div className='question-section'>
                  <div className='question-count'>
                    <span>SCORE</span>
                  </div>
                  <div className='question-text myQuestions'>
                    {score < 10 ? (
                      <div>
                        You answered {score} questions correctly! You LOST the
                        game!
                      </div>
                    ) : (
                      <div>
                        You answered {score} questions correctly! You WON the
                        game{' '}
                      </div>
                    )}
                  </div>
                </div>
                <div className='answer-sections'>
                  {/* {q[currentQuestion].answerOptions.map((answerOption) => (
                      <button
                        className=' btn btn-block myBtn'>
                        {he.decode(answerOption.answerText)}
                      </button>
                    ))} */}
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-8 col-lg-9'>
              <SingleBoard />
              <div className='canvasBorder '>
                <Canvas {...props} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className='row'>
              <div className='col-sm-12 col-md-4 col-lg-3 text-center'>
                <h2 className='btn btn-block myUser'>
                  <Link to='/me' className='myMeLink'>
                    {profileId ? `${profile.name}'s` : ' '}
                    {profile.name}
                  </Link>
                </h2>
                <div className=' ml-4 mr-4 p-3 shadow mb-1 bg-white text-center myCard'>
                  <div className='question-section'>
                    <div className='question-count'>
                      <span>Question {currentQuestion + 1}</span>
                    </div>
                    <div className='question-text myQuestions'>
                      {newDecodedText}
                    </div>
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
              <div className='col-sm-12 col-md-8 col-lg-9'>
                <SingleBoard />
                <div className='canvasBorder'>
                  <Canvas {...props} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
  // ================================
}
