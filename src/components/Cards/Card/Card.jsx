import React from 'react'
import './card.css'

const Card = ({card,index,clickHandler}) => {
  return (
    <div className={`card ${card.status}`} onClick={() => clickHandler(index)}>
        <img src={card.img} alt="images" />
    </div>
  )
}

export default Card