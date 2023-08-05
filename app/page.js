"use client";
import React, { useState, useEffect } from "react";
import Words from "./words.json";
const Home = () => {
  const [time, setTime] = useState(15);
  const [value, setValue] = useState("");
  const [currentWord, setCurrentWord] = useState(Words[0]);
  const [trueWords, setTrueWords] = useState(0);
  const [falseWords, setFalseWords] = useState(0);
  const [playable, setPlayable] = useState(true);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          setPlayable(false);
          clearInterval(timerInterval);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  }, []);
  const handleInputChange = (event) => {
    const value = event.target.value;
    setValue(value);
    const detectSpace = value.includes(" ");
    if (detectSpace) {
      if (event.target.value === currentWord + " ") {
        setTrueWords(trueWords + 1);
      } else setFalseWords(falseWords + 1);
      Words.shift();
      setValue("");
      setCurrentWord(Words[0]);
    }
  };
  return (
    <main>
      <div>{currentWord}</div>
      <div>true : {trueWords}</div>
      <div>false : {falseWords}</div>
      <h1>Homepage</h1>
      <p>Time: {time}</p>
      <input
        type="text"
        onChange={handleInputChange}
        value={value}
        disabled={!playable}
      />
      <div>
        {Words.map((word, i) => {
          return (
            <p style={i === 0 ? { color: "red" } : {}} key={i}>
              {word},
            </p>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
