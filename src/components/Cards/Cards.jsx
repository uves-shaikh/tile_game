import React, { useRef, useState, useEffect } from 'react'
import Card from './Card/Card'
import './cards.css'
import SuccessScreen from '../SuccessScreen/SuccessScreen'

const Cards = ({ onGameComplete,userName }) => {

    const [cards, setCards] = useState([
        { id: 0, status: '', img: require('../../images/img1.jfif') },
        { id: 0, status: '', img: require('../../images/img1.jfif') },
        { id: 1, status: '', img: require('../../images/img2.jfif') },
        { id: 1, status: '', img: require('../../images/img2.jfif') },
        { id: 2, status: '', img: require('../../images/img3.jfif') },
        { id: 2, status: '', img: require('../../images/img3.jfif') },
        { id: 3, status: '', img: require('../../images/img4.jfif') },
        { id: 3, status: '', img: require('../../images/img4.jfif') },
        { id: 4, status: '', img: require('../../images/img5.jfif') },
        { id: 4, status: '', img: require('../../images/img5.jfif') },
        { id: 5, status: '', img: require('../../images/img6.jfif') },
        { id: 5, status: '', img: require('../../images/img6.jfif') },
        { id: 6, status: '', img: require('../../images/img7.jfif') },
        { id: 6, status: '', img: require('../../images/img7.jfif') },
        { id: 7, status: '', img: require('../../images/img8.jfif') },
        { id: 7, status: '', img: require('../../images/img8.jfif') },
        { id: 8, status: '', img: require('../../images/img9.jfif') },
        { id: 8, status: '', img: require('../../images/img9.jfif') },
        { id: 9, status: '', img: require('../../images/img10.jfif') },
        { id: 9, status: '', img: require('../../images/img10.jfif') },
        { id: 10, status: '', img: require('../../images/img11.jfif') },
        { id: 10, status: '', img: require('../../images/img11.jfif') },
        { id: 11, status: '', img: require('../../images/img12.jfif') },
        { id: 11, status: '', img: require('../../images/img12.jfif') },
        { id: 12, status: '', img: require('../../images/img13.jfif') },
        { id: 12, status: '', img: require('../../images/img13.jfif') },
        { id: 13, status: '', img: require('../../images/img14.jfif') },
        { id: 13, status: '', img: require('../../images/img14.jfif') },
        { id: 14, status: '', img: require('../../images/img15.jfif') },
        { id: 14, status: '', img: require('../../images/img15.jfif') },
        { id: 15, status: '', img: require('../../images/img16.jfif') },
        { id: 15, status: '', img: require('../../images/img16.jfif') },
    ],)
    // ].sort(() => Math.random() - .5))

    const [previousCardState, setPreviousCardState] = useState(-1)
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const [startTime, setStartTime] = useState(null);


    const previousIndex = useRef(-1)
    const matchedPairs = useRef(0);

    const totalPairs = cards.length / 2;

    useEffect(() => {
        setStartTime(new Date());
    }, []);
    

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(time + 1); 
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [time]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };



    useEffect(() => {
        if (matchedPairs.current === totalPairs) {
            const currentTime = new Date();
      const elapsedTime = (currentTime - startTime) / 1000; 
      setTimeTaken(elapsedTime);
            onGameComplete();
        }
    }, [matchedPairs, totalPairs, onGameComplete, startTime]);

    const matchCheck = (currentCard) => {
        if (cards[currentCard].id === cards[previousCardState].id) {
            cards[previousCardState].status = 'active matched'
            cards[currentCard].status = 'active matched'
            setPreviousCardState(-1)
            setScore(score + 1)
            matchedPairs.current += 1;
        } else {
            cards[currentCard].status = 'active'
            setCards([...cards])
            setTimeout(() => {
                setPreviousCardState(-1)
                cards[currentCard].status = 'unmatched'
                cards[previousCardState].status = 'unmatched'
                setCards([...cards])
                setScore(score - 1)
            }, 1000)
        }
        if (matchedPairs.current === totalPairs) {
            const currentTime = new Date();
            const elapsedTime = (currentTime - startTime) / 1000; // Time in seconds
            setTimeTaken(elapsedTime);
            onGameComplete(score, elapsedTime);
        }
    }

    const clickHandler = (index) => {

        if (index !== previousIndex.current) {
            if (cards[index].status === 'active matched') {
                alert('already matched')
            } else {
                if (previousCardState === -1) {
                    previousIndex.current = index
                    cards[index].status = 'active'
                    setCards([...cards])
                    setPreviousCardState(index)
                } else {
                    matchCheck(index)
                    previousIndex.current = -1;
                }
            }
        } else {
            alert('card currently selected')
        }
    }

    return (
        <>
            <div className="container">
                <div className="title">
                    <h1>Mahajong Game</h1>
                </div>
                <div className="info">
                    <span className="score">score: {score}</span>
                    <span>Welcome {userName}</span>
                    <span className="time">Time: {formatTime(time)}</span>
                </div>
                <div className='cards'>
                    
                    {cards.map((card, index) => {
                        return <Card card={card} key={index} index={index} clickHandler={clickHandler} />
                    })}
                </div>
            </div>
            {/* {matchedPairs.current === totalPairs && <SuccessScreen userName={userName} score={score} timeTaken={timeTaken} />} */}
            {matchedPairs.current === totalPairs && <SuccessScreen userName={userName} score={score} timeTaken={timeTaken} />}

        </>
    )
}

export default Cards