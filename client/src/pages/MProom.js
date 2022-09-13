import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getRandomString } from '../utils';
import io from 'socket.io-client';

import './Home.css';

import socket from './socket';
import { Link } from 'react-router-dom';
let additionalPlayerHasJoined = false;

const MProom = (props) => {
    console.log(props)
    const [dots, setDots] = useState('.');
    const [newRoom, setNewRoom] = useState('');

    function updateDots() {
        if (dots === '.') {
            setDots('..');
        }
        if (dots === '..') {
            setDots('...');
        }
        if (dots === '...') {
            setDots('.');
        }
    }

    // Dot (WAITING) Ticker
    useEffect(() => {
        const currentDots = setInterval(() => {
            updateDots();
            console.log(dots)
        }, 750)
        return () => {
            clearInterval(currentDots);
        };
    }, [dots])

    const handleRoomChange = event => {
        setNewRoom(event.target.value);
        console.log('value is:', event.target.value);
    };

    const handleNewRoomChangeClick = () => {
        console.log(newRoom);
        socket.emit("changeMyRoom", newRoom);
    }

    socket.on("roomChange", (numClients) => {
        console.log("room-change" + numClients);
    })

    socket.on('playerTwoReady', (numClients) => {
        if (numClients >= 2) {
            additionalPlayerHasJoined = true;
            console.log(additionalPlayerHasJoined);
        }
    });

    function ReadyButton() {
        if (additionalPlayerHasJoined) {
            return <button><Link to='/multiplayer'>Ready</Link></button>;
        }
        return <h2>Waiting on friend to join{dots}</h2>
    }

    return (
        <div className='container-fluid mpWaiting'>
            {/* <h2>Current Room: {roomName}</h2> */}
            <div className='row'>
                <Form>
                    <Form.Group className='mb-3'>
                        {/* <Form.Label>Room</Form.Label> */}
                        <Form.Control type='text' placeholder='Enter Friend Code Here...' id="roomID"
                            name="roomID"
                            onChange={handleRoomChange}
                            value={newRoom} />
                        <Form.Text className='text-muted'>
                            Or give your roomcode to a friend and wait for them to join!
                        </Form.Text>
                    </Form.Group>
                    <Button variant='primary' type='button' onClick={handleNewRoomChangeClick}>
                        Join Room
                    </Button>
                </Form>
            </div>
            <div className='row'>
                <ReadyButton />
            </div>
        </div>
    )
}
export default MProom;