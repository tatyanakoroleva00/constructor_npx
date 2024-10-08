import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import Interactive from "../Interactives/Interactive";
import InitialDataForm from "./InitialDataForm";
import styles from '../css/StateOne.module.css';
const StateTwo = ({ globalData, setGlobalData, serverData, serverDataGot, videoDuration }) => {
  const [interactivesArr, setInteractivesArr] = useState([1]);
  const [currentInteractive, setCurrentInteractive] = useState(0);
  const [initialForm, setInitialForm] = useState(false);
  const [interactives, setInteractives] = useState([]);
  const [finishBtnClicked, setFinishBtnClicked] = useState(false);
  const [interactivesNamesArr, setInteractivesNamesArr] = useState([]);
  const [interactiveName, setInteractiveName] = useState('');
  const [components, setComponents] = useState([]);
  const [allData, setAllData] = useState([]);

  // Обработчик для обновления данных из отдельных компонентов : 
  const handleDataChange = (id, newData) => {
    setAllData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, data: newData } : item))
    );
  };

  //Global Data изменяется, когда меняется какая-либо информация в allData. Мы задаем значение интерактивов - добавляя в них allData
  useEffect(() => {
    setGlobalData((prev) => ({ ...prev, interactives: allData})) //OK
    setInteractives(allData);
  }, [allData]);


  //Единажды! Подкачиваем данные с сервера в массив с интерактивами, в allData, сразу формируем количество кнопок в setComponents + 
  //названия интерактивов подкачиваем с сервера
  useEffect(() => {
    if (serverDataGot) {
      setInteractivesArr(serverData['interactives']);
      setAllData(serverData['interactives']);
      
      let newComponentsArr = serverData['interactives'].length;
      let newArr = Array.from({ length: newComponentsArr }, (_, index) => index);
      setComponents(newArr);

      for (let interactive in serverData['interactives']) {
        setInteractivesNamesArr(prev => [...prev, serverData['interactives'][interactive]['interactive_name']]);
      }
    }
  }, [serverData['interactives']])

  return (
    <>
      <div className={`${finishBtnClicked && styles.hidden}`}>
        {globalData['heading'] && <h1 className={styles.title}>{globalData['heading']}</h1>}
        
        <Header setInteractivesArr={setInteractivesArr} globalData={globalData} 
          setCurrentInteractive={setCurrentInteractive} setFinishBtnClicked={setFinishBtnClicked}
          setInitialForm={setInitialForm} initialForm={initialForm} setInteractives={setInteractives} interactives={interactives} serverData={serverData} serverDataGot={serverDataGot}
          interactivesNamesArr={interactivesNamesArr} setInteractiveName={setInteractiveName} interactiveName={interactiveName} setInteractivesNamesArr={setInteractivesNamesArr} currentInteractive={currentInteractive}
        components={components} setAllData={setAllData} setComponents={setComponents} allData={allData}
        
        />
        {initialForm && <InitialDataForm globalData={globalData} setGlobalData={setGlobalData} />}
        {interactivesArr.map((interactive, index) => (
          <Interactive
            key={index + interactive}
            interactiveIndex={index}
            interactive={interactive}
            currentInteractive={currentInteractive}
            setInteractives={setInteractives}
            serverData={serverData} serverDataGot={serverDataGot}
            setInitialForm={setInitialForm}
            initialForm={initialForm}
            videoDuration={videoDuration}
            interactivesNamesArr={interactivesNamesArr}
            setAllData={setAllData}
            id={index}
            onDataChange={handleDataChange}
          />
        ))}
      </div>
      {finishBtnClicked && <div>
        <p>{serverDataGot ? 'Изменения сохранены' : 'Проект создан'}</p>
      </div>}
    </>
  );
};

export default StateTwo;
