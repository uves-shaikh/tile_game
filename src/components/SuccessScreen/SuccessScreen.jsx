import React from 'react'
import './successscreen.css'

const SuccessScreen = ({ userName, score, timeTaken }) => {
  return (
    <div>
      <>
        <div className="success-screen">
          <div className="title">
            <h1>React Tile</h1>
          </div>
          <div className="info">
            <span className="score">score:{score}</span>
            <span className="time">Time:{timeTaken} </span>
          </div>
          <div className="result">
            <span>Welcome {userName}!</span>
            <div className="success">
              <h1>Game Finished!!</h1>
            </div>
            <div className="score">
              <h1><span>Score:{score} </span></h1>
              <h1><span>Time Taken: {timeTaken} </span></h1>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default SuccessScreen