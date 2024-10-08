import React from "react";
import { useState, useEffect} from "react";
import styles from '../css/CorrectWordsChoice.module.css';
import Word from "./Word";

export default function CorrectWordsChoice ({ serverData, serverDataGot, interactiveIndex, getData}) {
  const [data, setData] = useState({task: "",});
  const [wordsArr, setWordsArr] = useState([]);

  useEffect(() => {
    getData(data);
  }, [data])

  useEffect(() => {
    if(serverDataGot && serverData['interactives'][interactiveIndex]) {
      let serverDataReceived = serverData['interactives'][interactiveIndex]['data']['receivedInfo'];
    setData(serverDataReceived);

    let elemArr = [];
      for (let key in serverDataReceived) {
        if(key.includes('word')) {
          elemArr.push(key);
        }
      }
      setWordsArr(elemArr);

  }}, [])

  const changeHandler = (event) => { //Меняем инфу в инпуте
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

 const addWordHandler = () => {
  setWordsArr((prev) => [...prev, 1]);
 };

 const deleteWordHandler = () => {
    let lastWordKey = wordsArr.length; //Удаляем последний введенный вопрос с ответами из массива данных
    let lastWord = 'word' + lastWordKey;
    delete data[lastWord];

    setWordsArr(wordsArr.slice(0, -1));
  }

 const wordsDataHandler = (order, wordLine) => {
  let word = `word${order}`;
  setData(prev => ({...prev, [word] : wordLine}));
};

  return (
    <div className={styles["correct-words-form"]}>
      <section className={styles["task-wrapper"]}>
        <p>Задание: </p>

       {!serverDataGot && <textarea
          placeholder="Введите задание"
          name="task"
          rows={5}
          onChange={changeHandler}
        ></textarea>}
        {serverDataGot && <textarea
          placeholder="Введите задание"
          name="task"
          rows={5}
          defaultValue={data.task}
          onChange={changeHandler}
        ></textarea>}

      </section>


      <section className={styles["words-wrapper"]}>
        <p>Слова: </p>
        <div className={styles["words-field"]}>
          {wordsArr.map((word, index) => (
          <div key={word + index}>
            <Word wordIndex={index} order={index + 1} getWordData={wordsDataHandler} interactiveIndex={interactiveIndex} serverData={serverData} serverDataGot={serverDataGot} />
          </div>
        ))}

        <div className={styles.buttons}>
        <button className={styles["add-button"]} onClick={addWordHandler}>Добавить слово</button>
        <button className={styles["remove-button"]} onClick={deleteWordHandler}>Удалить слово</button>
        </div>

        </div>
      </section>

    </div>
  );
};
