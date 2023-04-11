import React,{useState,useEffect} from "react";
import CreateBoard from '../Utils/CreateBoard';
import { revealed } from "../Utils/Reveal";
import Cell from "./Cell";
import classes from'./Board.module.css'

const Board = () => {

    //INITIALIZING DIFFERENT STATES FOR A GAME
    const [grid,setGrid]=useState([]);
    const [nonMinecount,setNonMinecount]=useState(0);
    const [mineLocation,setmineLocation]=useState([]);
    const [gameOver, setGameOver] = useState(false)
    const [newGame, setNewGame] = useState(false)

    //INITIALIZES BOARD WITH NUMBER OF CELLS AND BOMBS IN A GAME.
    useEffect(()=>{
        const freshBoard = () => {
            const newBoard=CreateBoard(8,8,10);
            setNonMinecount(10*10-20);
            setmineLocation(newBoard.mineLocation);
            setGrid(newBoard.board);
            if(gameOver === true)
                setGameOver(false)
        }
        freshBoard();
    },[gameOver, newGame]);

    //UPDATES FLAG WHEN A USER RIGHT CLICK ON A CELL
    const updateFlag=(e,x,y, revealed)=>{
        e.preventDefault();
       if(revealed !== true)
       {
            let newGrid=JSON.parse(JSON.stringify(grid));
            newGrid[x][y].flagged=true;
            setGrid(newGrid);
       }
        
    }

    //REVEALS CELL WHEN A USER LEFT CLICK ON A CELL
    const revealcell=(x,y)=>{
        let newGrid=JSON.parse(JSON.stringify(grid));
        if(newGrid[x][y].value==="X"){
            alert("Oops!, you clicked mine. Game Over.")
            setGameOver(true)
            setGrid(newGrid);
        }
        else{
            let revealedboard=revealed(newGrid,x,y,nonMinecount);
            setGrid(revealedboard.arr);
            setNonMinecount(revealedboard.newNonMines);
        } 
    }

    //EXECUTES WHEN A USER CLICKS ON A NEW-GAME BUTTON
    const newGameHolder = () => {
       if(window.confirm("Are you sure you want to start a new game?"))
         setNewGame(true)
    }
    
    return (
        <div className="parent">
            <div className={classes.gridView}> Non-Mines : {nonMinecount}</div>
            <div>
                <button className={classes.button} onClick={newGameHolder}>New Game</button>
            </div>
            <div>
                {grid.map((singlerow,index1)=>{
                    return (
                        <div className={classes.boardView} key={index1}>
                            {singlerow.map((singlecol,index2)=>{
                            return  <Cell details={singlecol} key={index2} updateFlag={updateFlag} flagged={singlecol.flagged} revealcell={revealcell}/>
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    ) 

}

export default Board; 