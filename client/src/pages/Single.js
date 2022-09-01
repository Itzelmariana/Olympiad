import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import SingleBoard from '../components/SingleBoard';
import Auth from '../utils/auth';

import './Single.css';

const questionArray = require('./q');
var he = require('he');

// FINALIZED QUESTION
let q = [];
let answerOptions = [];
// CORRECT ANSWER TO COMPARE CHOICE TO
let correct = [];
function getQuestion() {
  let randomQuestion = Math.floor(Math.random() * 49);
  console.log('random' + randomQuestion);
  // USE RANDOM NUMBER TO SELECT QUESTION FROM ARRAY
  let qa = questionArray.default[randomQuestion];
  answerOptions = [];
  // GET RANDOM NUMBER

  console.log(qa);

  // LOOP THROUGH INCORRECT ANSWERS AND PUSH TO NEW ARRAY
  for (let i = 0; i < 3; i++) {
    answerOptions.push({
      answerText: qa.incorrect_answers[i],
      isCorrect: false,
    });
  }
  answerOptions.push({ answerText: qa.correct_answer, isCorrect: true });

  correct.push({ answerText: qa.correct_answer, isCorrect: true });
  // console.log("Answers: " + q);
  // console.log("Correct Answer:" + correct);

  q.push({ questionText: qa.question, answerOptions });

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

// REACT BS STARTS HERE
export default function Single() {
  useEffect(() => {
    getQuestion();
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [ignoranceScore, setIgnoranceScore] = useState(0);
  console.log('SCORE: ' + score);
  // AUTHORIZATION
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

  // HANDLE ANSWER OPTIONS WHEN CLICKED
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      console.log('correct');
      console.log('SCORE: ' + score);
    } else {
      setIgnoranceScore(ignoranceScore + 1);
      console.log('wrong');
    }

    const nextQuestion = currentQuestion;

    if (nextQuestion < 50) {
      if (score > 9) {
        setShowScore(true);
      } else if (ignoranceScore > 9) {
        setShowScore(true);
      }
      getQuestion();
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  let decodedText = q[currentQuestion].questionText;
  let newDecodedText = he.decode(decodedText);
  console.log('DECODED: ' + newDecodedText);

  return (
    <div className='Single'>
      <div className='question-card-section'>
        {showScore ? (
          <div className='score-section'>You scored {score}!</div>
        ) : (
          <>
            <div className='row'>
              <div className='col-sm-12 col-md-4 col-lg-2'>
                <h2 className='btn btn-block myUser'>
                  {profileId ? `${profile.name}'s` : ' '}
                  {profile.name}
                </h2>
                <div className=' m-2 p-3 shadow p-3 mb-5 bg-white text-center myCard'>
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
              <div className='col-sm-12 col-md-8 col-lg-10'>
                <SingleBoard />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // THIS IS VERY STUPID
}
