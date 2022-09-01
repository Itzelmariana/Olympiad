import React from 'react'

export default function Profiles({Leaderboard}){
    return(
        <div id='Profile'>
            {item(Leaderboard)}
        </div>
    )
}

function item(data){
    return(

        <>
        {
            data.map((value,index)=>(
                <div className='flex' key={index}>
                <div className='item'>
    
                    <div className='info'>
                        <h3 className='name text-dark'>{value.name}</h3>
                        <span>{value.location}</span>
                    </div>
                </div>
                <div className='item'>
                    <span>{value.score}</span>
                </div>
            </div>
            )
            )
        }
        </>

    )
}