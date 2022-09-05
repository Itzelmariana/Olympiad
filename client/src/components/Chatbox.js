import React, { useState, useEffect } from 'react';



const Chatbox = (props) => {
    console.log(props.chatText.chatText.length);


    return (
        <div id='messageText'>
            <ul>{props.chatText.chatText.map((item) => {
        return <li>{item}</li>
    })}</ul>
        </div>
    )
}

export default Chatbox;