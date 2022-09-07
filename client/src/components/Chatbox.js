import React from 'react';
//import React, { useState, useEffect } from 'react';

let msgs = 0;

const Chatbox = (props) => {
  // console.log(props.chatText.chatText.length);

  return (
    <div id='messageText'>
      <ul>
        {props.chatText.chatText.map((item) => {
          msgs++;
          return <li key={msgs}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default Chatbox;
