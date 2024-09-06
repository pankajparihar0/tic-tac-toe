import React, { useState } from 'react'
// const initialGameBoard = [
//     [null,null,null],
//     [null,null,null],
//     [null,null,null]
// ]
function GameBoard({onSelectSquare,board}) {
    // let gameBoard = initialGameBoard;
    // for(const turn of turns){
    //     const{square,player} = turn;
    //     const{row,col} =square;

    //     gameBoard[row][col] = player;
    // }
    // const[gameboard,setGameboard] = useState(initialGameBoard);
    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameboard((prevGameBoard)=>{
    //         const updatedBoard = [...prevGameBoard.map(innerArray=>[...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;

    //     });
    //     onSelectSquare(); 
    // }
  return (
    <ol id="game-board">
        {board.map((row,rowIndex)=><li key={rowIndex}>
            <ol className='gamerow'>
                {row.map((playerSymble,colIndex)=><li key={colIndex}><button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymble !== null}>{playerSymble}</button></li>)}
            </ol>
        </li>)} 
    </ol>
  )
}

export default GameBoard
