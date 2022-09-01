import React from 'react';
import Profiles from './Profiles';
import {Leaderboard} from './database';

export default function Score(){

    return(
        <div className='Score'>
            <h1 className='leaderboard'>Highscore</h1>

        <Profiles Leaderboard={Leaderboard}></Profiles>
        </div>
    )
}
