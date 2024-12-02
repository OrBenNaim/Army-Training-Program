import { useState } from "react";

interface SquareProps{
  value: string | null;
  onSquareClick: () => void;
}


function Square({value, onSquareClick}: SquareProps): JSX.Element{
  
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


function calculateWinner(squares: string[]): string | null{
  /*
  0  1  2 
  3  4  5
  6  7  8
  */
  
  const optionsToWin = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let idx: number = 0; idx < optionsToWin.length; idx++){
      const [idx1, idx2, idx3] = optionsToWin[idx];

      if(squares[idx1] && squares[idx1] === squares[idx2] && squares[idx1] === squares[idx3]){
        return squares[idx1];   // squares[idx1] is a string ('X' or 'O')
      }
  }
  return null;
}

interface BoardProps{
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
}

function Board({xIsNext, squares, onPlay}: BoardProps): JSX.Element{
  
  function handleClick(index: number): void{
    
    // Check if the selected square is already marked or if there is a winner
    if(squares[index] || calculateWinner(squares)){
      return;
    }

    const nextSquares = squares.slice();  // Create a copy of squares array
    
    if (xIsNext){
      nextSquares[index] = "X";
    }
    else{
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);  
  }

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;

  // Create 9 Squares bu using 2 nested loops :
  return (  
    <>
      <div className="status">{status}</div>
      {Array(3)
        .fill(null)
        .map((_, rowIndex) => (         // The outer loop (Array(3)) iterates over rows
          <div key={rowIndex} className="board-row">
            {Array(3)
              .fill(null)
              .map((_, colIndex) => {   // The inner loop (Array(3)) iterates over columns within each row 
                const squareIndex = rowIndex * 3 + colIndex;
                return (
                  <Square
                    key={squareIndex}
                    value={squares[squareIndex]}
                    onSquareClick={() => handleClick(squareIndex)}
                  />
                );
              })}
          </div>
        ))}
    </>
  );
}

export default function Game(): JSX.Element{                    

  const [history, setHistory] = useState([Array(9).fill(null)]);    // Each cell represents a specific turn during the game
  
  const [currentMove, setCurrentMove] = useState(0);                // currentMove is the index of the last move in the history array

  const xIsNext = currentMove % 2 === 0;                            // xIsNext is a boolean variable that describes if the next turn owned to 'X' or not

  const currentSquares = history[currentMove];                      // currentSquares represents the current turn or the current play
  
  const [isAscending, setIsAscending] = useState(false);            // State to track sort order

  
  function handlePlay(nextSquares: string[]): void{
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    
    setHistory(nextHistory);   // Add the new turn and update the 'history' array
    
    setCurrentMove(nextHistory.length - 1);
  }
  

  function jumpTo(nextMove: number): void{
    setCurrentMove(nextMove);
  }


  function toggleSortOrder(): void{
    setIsAscending(!isAscending);
  }


  const moves = history.map((squares, move: number) => {
    const prevSquares = move > 0 ? history[move - 1] : null;

    const changedIndex = prevSquares ? squares.findIndex((square, idx) => square !== prevSquares[idx]) : -1;    // Default to -1 if no previous squares

    const row = changedIndex !== -1 ? Math.floor(changedIndex / 3) + 1 : null;
    const col = changedIndex !== -1 ? (changedIndex % 3) + 1 : null;

    const location = row !== null && col !== null ? `(${row}, ${col})` : null;

    const description = 
      move === 0 ? "Go to game start" : `Go to move #${move} ${location ? `at ${location}` : ""}`;
    

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });


  // Sort moves based on the `isAscending` state
  const sortedMoves = isAscending ? moves : [...moves].reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <button onClick={toggleSortOrder}>Sort Moves</button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}