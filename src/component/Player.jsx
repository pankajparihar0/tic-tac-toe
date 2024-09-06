import React, { useState } from 'react'

function Player({name,symbol,isActive,onchangeName,players}) {
    const[isEditing,setEditing] = useState(false);
    const [player,setPlayer] = useState(name);
    function handleClick(){
        setEditing((editing)=> !editing);
        if(isEditing){
          onchangeName(symbol,player);
        }
    }
    //console.log(isEditing);
    let playerName = <span className="player-name">{player}</span>;
    if(isEditing){
        playerName=<input Value={player}  type="text" onChange={(e)=>setPlayer(e.target.value)} require/>
    }
  return (
    <li className={isActive ?'active': undefined}>
    <span className="player"> 
      {(players==1 && name=="Player 2")?"Computer":playerName}
      <span className="player-symbol">{symbol}</span>
    </span>
    {(players==1 && name=="Player 2")?null:<button onClick={handleClick}>{isEditing?'Save':'Edit'}</button>}
  </li>
  )
}

export default Player
