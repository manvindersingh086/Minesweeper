import React from 'react';
import classes from './Cell.module.css'

const Cell = ({details,updateFlag,flagged,revealcell}) => {
    return (
     <>
       { flagged !== true &&
        <div className={classes.cellView} onClick={()=>{revealcell(details.x,details.y)}} onContextMenu={(e)=>updateFlag(e,details.x,details.y, details.revealed)}>{details.revealed ? details.value : ""}</div>}
       {details.revealed !== true && flagged === true && <div className={classes.cellViewImage} onClick={()=>{revealcell(details.x,details.y)}} >{details.revealed ? details.value : ""}</div>}
      </>
    )
}

export default Cell;