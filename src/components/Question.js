import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

   useEffect(() => {
     // Only set a timeout if there's still time left
     if (timeRemaining > 0) {
       const timerId = setTimeout(() => {
         setTimeRemaining((prevTime) => prevTime - 1);
       }, 1000);

       // Cleanup: clear timeout when component unmounts or before re-running effect
       return () => clearTimeout(timerId);
     } else {
       // Time ran out — reset and trigger callback
       setTimeRemaining(10);
       onAnswered(false);
     }
   }, [timeRemaining, onAnswered]); 

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
