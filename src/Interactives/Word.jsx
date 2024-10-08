import React from "react";
import { useState } from "react";
import styles from "../css/CorrectWordsChoice.module.css";
import { useEffect } from "react";
export default function Word ({order, getWordData, serverDataGot, serverData, interactiveIndex, wordIndex}) {
  const [word, setWord] = useState({
    'word_name': '',
    'status': 'no',
  });

  useEffect(() => {
    if(serverDataGot && serverData['interactives'][interactiveIndex]) {
      let wordWithIndex = `word${wordIndex+1}`;
      let serverWord = serverData['interactives'][interactiveIndex]['data']['receivedInfo'][wordWithIndex];
      if (serverWord) {
        setWord(serverWord);
      }
  }
}, [])

  useEffect(() => {
    getWordData(order, word);
  }, [word]);

  const changeHandler = (event) => {
      setWord(prev => ({...prev, 'status' : event.target.value}));
  }

  const inputChangeHandler = (event) => {
    setWord(prev => ({...prev, 'word_name' : event.target.value}));
    }
  
  let btnName = `word${order}`;

  return (
    <div className={styles["word-container"]}>
      <div className={styles['word-field']}>
        <span>{order}.&nbsp;</span>
        {!serverDataGot && <input className={styles.word} name="word_name" value={word['word_name']} type="text" onChange={inputChangeHandler} />}
        {serverDataGot && <input className={styles.word} name="word_name" defaultValue={word['word_name']} type="text" onChange={inputChangeHandler} />}
      </div>
      <div className={styles['radio-wrapper']}>
        <input onChange={changeHandler} type="radio" id="no" name={btnName.status} value="no" checked={word.status === 'no'} />
        <label htmlFor="no">Нет</label>
        <input onChange={changeHandler} type="radio" id="yes" name={btnName.status} value="yes" checked={word.status === 'yes'} />
        <label htmlFor="yes">Да</label>
      </div>
    </div>
  );
};