import React from "react";
import QuestionCard from "./QuestionCard";
import { useState, useEffect } from "react";
import styles from '../css/Testing.module.css';

export default function Testing({getData, serverData, serverDataGot, interactiveIndex }) {
  const [questionsArr, setQuestionsArr] = useState([]);
  const [data, setData] = useState({});


//Получение всех данных по интерактиву "тестирование" и отправка в "интерактивы"
  useEffect(() => {
    getData(data);
  }, [data])

  useEffect(() => {
    if (serverDataGot && serverData['interactives'][interactiveIndex] ) {
      let serverDataReceived = serverData['interactives'][interactiveIndex]['data']['receivedInfo'];
      setData(serverDataReceived);
      //Создаю счетчик для вопросов непосредственно из входящих вопросов с сервера
      let elemArr = [];
      let elemsObj = serverData['interactives'][interactiveIndex]['data']['receivedInfo'];
      for (let key in elemsObj) {
        elemArr.push(key);
      }
      setQuestionsArr(elemArr);
    }
  }, [])

  //Добавляется новое пустое поле с вопросом и ответами по клику на "Добавить вопрос и ответы"
  const addQuestionHandler = () => {
    setQuestionsArr((prev) => [...prev, 1]);
  }
  
  //Удаляется поле с вопросом и ответами по клику на "удалить вопрос"
  const removeQuestionHandler = () => {
      let lastQuestionIndex = questionsArr.length; //Удаляем последний введенный вопрос с ответами из массива данных
      let lastQuestion = `question${lastQuestionIndex}`;
      delete data[lastQuestion];
      setQuestionsArr(questionsArr.slice(0, -1));
    }

  //Работа с данными поля "вопрос - ответы" - здесь формируется массив со всеми полученными данными о вопросах и ответах, о порядковом номер вопросов
  const questionAnswersDataHandler = (questionOrder, questionData) => {
    let question = `question${questionOrder}`;
    setData(prev => ({ ...prev, [question]: questionData })); //{1: {question: 'how is ?', 'answer1': ''}}
  };

  return (
    <div className={styles.question}>
      {questionsArr.map((question, index) => (
        <div key={question + index}>
          <QuestionCard questionIndex={index} interactiveIndex={interactiveIndex} serverData={serverData} serverDataGot={serverDataGot} order={index + 1} getQuestionsData={questionAnswersDataHandler} />
        </div>
      ))}
        <div className={styles['btns-wrapper']}>
          <button onClick={addQuestionHandler}>Добавить вопрос</button>
          <button onClick={removeQuestionHandler}>Удалить вопрос</button>
        </div>
    </div>
  );
}
