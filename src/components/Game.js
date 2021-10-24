import React, {useState,useEffect, useRef} from 'react';
import $ from 'jquery';
import { RulesPopup } from './RulesPopup';
import { GameOverPopup } from './GameOverPopup';
import { set } from 'mongoose';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function randomWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function remove(arr, str){
    arr.splice(arr.indexOf(str), 1);
}

var words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition'
  ];

export const Game = () => {
// Globals
// Available Levels
// const levels = {
//   level_1: 5,
//   medium: 3,
//   hard: 1
// };

// To change level

let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const [level, setLevel] = useState(1)
const [timerCounter, setTimerCounter] = useState(15);
const [timer, setTimer] = useState(timerCounter);
const [word, setWord] = useState(randomWord(words))
const [score, setScore] = useState(0)
const [wordCounter, setWordCounter] = useState(0)
const [multiplier, setMultiplier] = useState(1.0)
const [isOpen, setOpen] = useState(true);
const [isOpen2, setOpen2] = useState(false);
const [isGameRunning, setIsGameRunning] = useState(false)

const handleClose = () =>{
    setOpen(false);
    setIsGameRunning(true)
    // resetGame();

}

const gameOver = () =>{
    console.log('hello', score)
    setWordCounter(0)
    setMultiplier(1)
    setTimerCounter(15)
    setLevel(1)
    setOpen2(true)
    setIsGameRunning(false)
}
const handleClose2 = () =>{
    setTimer(timerCounter)
    setOpen2(false);
    setIsGameRunning(true)
    setScore(0)
    // console.log("hellow", isOpen2)

}

useEffect(() => {
        if (isGameRunning){
            const timerId = setInterval(() => {
                if (timer > 0){
                    setTimer((t) => t - 1);
                }
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [isGameRunning, timer]);


  const inputRef = useRef(null);

  const validate =(text)=>{
      
      //   console.log(words.length)
      //   console.log(words.length)
    if (text === word){
        inputRef.current.value = ''
        remove(words, word)
        setWord(randomWord(words))
        setTimer(timerCounter)
        if (timer > 0){
            setScore(Math.round(((score + word.length + timer)*multiplier)*10)/10 );
        }
        setWordCounter(wordCounter+1)
        if (wordCounter >= 3){
            setLevel(level+1);
            setWordCounter(0)
            setTimerCounter(timerCounter-1)
        }
        if (wordCounter != 0 && wordCounter%2 === 0){
            setMultiplier(Math.round((multiplier+0.1)*10)/10)
        }
    }

    if (word.charAt(text.length-1) != text.charAt(text.length-1)){
        setMultiplier(1)
    }




    
  }

  const style = {
        height: '55px',
        width: '55px',
        marginRight: '20px',
        backgroundColor: '#bbb',
        borderRadius: '50%',
        display: 'inline-block',
      
  }
  const user = useSelector(selectUser)
return (
    <div>
        <RulesPopup open = {isOpen} openPopup={setOpen} handleClose = {handleClose} />
        <GameOverPopup open= {isOpen2} score={score} openPopup={setOpen2} handleClose= {handleClose2}/>
        <div className="container text-center">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <p className="lead">Type The Given Word Within
                        <span className="text-success" id="seconds">5</span> Seconds:
                    </p>
                    <h2 className="display-2 mb-5" id="current-word">{word}</h2>

                    {/* <span style={style} class="dot">3</span> */}
                    <input onChange = {(e) => validate(e.target.value)} ref={inputRef} autoFocus type="text" className="form-control form-control-lg" placeholder="Start typing..." id="word-input" autofocus/>
                    {timer===0?(isOpen2?"":gameOver()):""}
                    <h4 className="mt-3" id="message"></h4>
                    <div className="row mt-5">
                    <div className="col-md-6">
                    <h3>Level:
                    <span id="level">{level}</span>
                        </h3>
                        <h3>Time Left: 
                            <span id="time">{timer}</span>
                        </h3>
                    </div>
                    <div className="col-md-6">
                        <h3>Multiplier:
                            <span id="score">{multiplier}</span>
                        </h3>
                        <h3>Score:
                            <span id="score">{score}</span>
                        </h3>
                    </div>
                    <div className="col">
                        <h3>High Score:
                            <span id="highscore">{user?user.highscore:0}</span>
                        </h3>
                    </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>
)
}
