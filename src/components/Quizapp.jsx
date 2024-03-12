import React, { useRef, useState, useEffect } from "react";
import "./quiz.css";
import { data } from "./data";

const Quizapp = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    if (timerActive) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timerActive]);

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setTimerActive(false); 
    }
  };

  const next = () => {
    if (lock === true) {
      if (index + 1 < data.length) {
        setIndex(prevIndex => prevIndex + 1);
        setQuestion(data[index + 1]);
        setLock(false);
        setTimerActive(true); 
        option_array.forEach(option => {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        });
      } else {
        setResult(true); 
      }
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setScore(0);
    setResult(false);
    setTime(0); 
    setTimerActive(true); 
    option_array.forEach(option => {
      option.current.classList.remove("wrong");
      option.current.classList.remove("correct");
    });
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
      <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {result ? (
          <>
            <h2>You scored {score} out of {data.length}</h2>
            <h3>Time taken: {formatTime(time)}</h3>
            <button onClick={resetQuiz}>Reset</button>
          </>
        ) : (
            <>
              <h2>
                {index + 1}. {question.question}
              </h2>
              <ul>
                <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
              </ul>
              <button onClick={next}>Next</button>
              <div className="index"> {index + 1} of {data.length} questions</div>
              <div className="timer">Time: {formatTime(time)}</div>
            </>
          )}
      </div>
    </>
  )
}

export default Quizapp;
