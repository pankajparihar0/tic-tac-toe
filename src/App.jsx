import { useState } from "react"
import GameBoard from "./component/GameBoard"
import Player from "./component/Player"
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./winnig-combinations";
import GameOver from "./component/GameOver";


const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
function deriveActivePlayer(gameTurn){
  let currentActivePlayer ='X';
  if(gameTurn.length >0 && gameTurn[0].player === 'X'){
    currentActivePlayer='O';
  }
  return currentActivePlayer;
}

function App() {
  const[number,setNumber] = useState();
  const [playername,setPlayerName] = useState({
    'X':'Player 1',
    'O' :'Player 2'
  })
  const [gameTurn,setGameTurns] = useState([]);
  //const [activePlayer,setActivePlayer] = useState('X');
  let activePlayer = deriveActivePlayer(gameTurn);
  
  let gameBoard = [...initialGameBoard.map((array)=>[...array])];
  for(const turn of gameTurn){
      const{square,player} = turn;
      const{row,col} =square;

      gameBoard[row][col] = player;
  }
let winner;
for(const combination of WINNING_COMBINATIONS){
   const firstSqureSymbal=gameBoard[combination[0].row][combination[0].column];
   const secondSqureSymbal =gameBoard[combination[1].row][combination[1].column];
  const thirdSqureSymbal = gameBoard[combination[2].row][combination[2].column];

  if(firstSqureSymbal &&firstSqureSymbal === secondSqureSymbal && firstSqureSymbal === thirdSqureSymbal){
winner = playername[firstSqureSymbal];
  }
}
function select(){
  return {row:(parseInt) (Math.random()*3),
    col:(parseInt)(Math.random()*3)
  };
}
function computerTurn(){
  let x=select();
  while(gameBoard[x.row][x.col] != null){
    console.log(gameBoard[x.row][x.col]);
    x=select();
  }
handleSelection(x.row,x.col);
}
if(number == 1 && activePlayer =='O' && gameTurn .length < 8){
  setTimeout(()=>{computerTurn();},500);
  
}
  function handleSelection(rowIndex,colIndex){
    //setActivePlayer((curActivePlayer)=> curActivePlayer ==='X' ? 'O' : 'X');
    let currentPlayer =deriveActivePlayer(gameTurn);
    setGameTurns(prevTurn =>{
      const updatedTurns = [{square:{row:rowIndex,col:colIndex},player :currentPlayer},...prevTurn];
      return updatedTurns;
    })
  }
  const hasDraw = gameTurn.length === 9 && !winner;

  function handlerestart(){
    setGameTurns([]);
  }
  function handlenamechange({symbol,newName}){
    setPlayerName(pre=>{
      return{
        ...pre,
        [symbol]:newName 
      }
    })
  }
  function totalplayer(e){
    if(e.currentTarget.value == "Single Player"){
      setNumber(1);
      document.getElementById('no').style.display = "none";
    }else{
      setNumber(2);
      document.getElementById('no').style.display = "none";
    }
  }
  return <main>
    <div id ="game-container">
    <dialog className="playern" id="no" >
      <input type="button" onClick={totalplayer} value="Single Player"/>
      <input type="button" onClick={totalplayer} value="Double Player" />
    </dialog>
      <ol id = "players" className="highlight-player">
      <Player name="Player 1" symbol="X" players={number} onchangeName={handlenamechange} isActive={activePlayer==='X' }/>
      <Player name="Player 2" symbol="O" players={number} onchangeName={handlenamechange} isActive={activePlayer==='O'}/>
      </ol>
      {(winner || hasDraw)&& <GameOver restart={handlerestart} winner={winner}/>}
      <GameBoard onSelectSquare={handleSelection} board={gameBoard}/>
    </div>
    <Log turns={gameTurn}/>
  </main>
}

export default App
