import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

// const q = require('q');
const questionArray = require('./q');
// FINALIZED QUESTION
let q = [];
let answerOptions = [];
// CORRECT ANSWER TO COMPARE CHOICE TO
let correct = [];
function getQuestion() {
  answerOptions = [];
  // GET RANDOM NUMBER
  let randomQuestion = Math.floor(Math.random() * 49);
  console.log("random" + randomQuestion);
  // USE RANDOM NUMBER TO SELECT QUESTION FROM ARRAY
  let qa = questionArray.default[randomQuestion]
  console.log(qa);
  // LOOP THROUGH INCORRECT ANSWERS AND PUSH TO NEW ARRAY
  for (let i = 0; i < 3; i++) {
    answerOptions.push({ answerText: qa.incorrect_answers[i], isCorrect: false })
  }

  answerOptions.push({ answerText: qa.correct_answer, isCorrect: true })

  correct.push({ answerText: qa.correct_answer, isCorrect: true })
  // console.log("Answers: " + q);
  // console.log("Correct Answer:" + correct);


  q.push({ questionText: qa.question, answerOptions });
  // q.splice(0, 1, q);

  shuffle(answerOptions);
  console.log("ANSWER OPTIONS: ");
  console.log(answerOptions);
  console.log(q);
}



function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}





























export default function Single() {
  getQuestion();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);


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
        <h4 className='text-center'>
          Please <Link to='/'>login</Link> or <Link to='/'>signup</Link> to play
          the game.
        </h4>
      </div>
    );
  }


  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      console.log('correct')

    } else {
      console.log('wrong')
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };





















  return (
    <div className='app'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {q.length}
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>
            </div>
            <div className='question-text'>{q[currentQuestion].questionText}</div>
          </div>
          <div className='answer-section'>
            {q[currentQuestion].answerOptions.map((answerOption) => (
              <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

