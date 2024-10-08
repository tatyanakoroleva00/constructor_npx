import React from "react";
import InitialData from "../Buttons/InitialData";
import FinishCourse from "../Buttons/FinishCourse";
import AddCourse from "../Buttons/AddCourse";
import DeleteCourse from "../Buttons/DeleteCourse";
import { useState, useEffect } from "react";
import CoursesButton from "../Buttons/CoursesButton";
import styles from '../css/Buttons.module.css';
import Modal_Interactives from "../modal_windows/Modal_Interactives";

const Header = ({ setInteractivesArr, setCurrentInteractive, setInitialForm, initialForm, setInteractives, 
  interactives, globalData, serverDataGot, serverData, setFinishBtnClicked, interactivesNamesArr, 
  setInteractiveName, interactiveName, setInteractivesNamesArr, setComponents, setAllData, components, allData}) => {
  const [activeBtn, setActiveBtn] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coursesButtonsArr, setCoursesButtonsArr] = useState([]);

  useEffect(() => {
    setInteractivesArr(coursesButtonsArr);
  }, [coursesButtonsArr]);

  useEffect(() => {
    if (serverDataGot) setCoursesButtonsArr(serverData['interactives']); //OK
  }, [serverData['interactives']]);

  const addCourseHandler = () => {
    openModal();
  };
  const deleteCourseHandler = () => {
    
    let newAllDataArr = allData.slice(0, -1);
    setAllData(newAllDataArr);

    let newComponentsArr = components.slice(0, -1);
    setComponents(newComponentsArr);

    let newCoursesButtonsArr = coursesButtonsArr.slice(0, -1);
    setCoursesButtonsArr(newCoursesButtonsArr);

    let newInteractives = interactives.slice(0, -1);
    setInteractives(newInteractives);

    let newInteractivesNamesArr = interactivesNamesArr.slice(0, -1);
    setInteractivesNamesArr(newInteractivesNamesArr);
  };

  console.log(allData, 'allData');
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const confirmModal = () => {
    setCoursesButtonsArr((prev) => [...prev, 1]);
    setInteractivesNamesArr(prev => [...prev, interactiveName]);
    setActiveBtn(coursesButtonsArr.length);
    setIsModalOpen(false);
    setCurrentInteractive(coursesButtonsArr.length);
    const newId = components.length;
    setComponents((prevComponents) => [...prevComponents, newId]);
    setAllData((prevData) => [...prevData, { id: newId, data: `Data from component ${newId}` }]);
  };

  return (
    <div>
      <div>
        <div className={styles['buttons-row']}><div><InitialData setInitialForm={setInitialForm} initialForm={initialForm} /></div>
            <div><FinishCourse allData={allData} serverDataGot={serverDataGot} globalData={globalData} setFinishBtnClicked={setFinishBtnClicked} /></div>
        </div>
        <div>
          {!initialForm && <AddCourse addCourse={addCourseHandler} />}
          {!initialForm && coursesButtonsArr.length > 0 && <DeleteCourse deleteCourse={deleteCourseHandler} />}
        </div>
      </div>
      <div>
        {!initialForm && coursesButtonsArr.map((_, index) => (
          <CoursesButton allData={allData} interactiveName={interactiveName} serverDataGot={serverDataGot} serverData={serverData} interactivesNamesArr={interactivesNamesArr} activeBtn={activeBtn} setActiveBtn={setActiveBtn} index={index} key={index} btnIndex={index} setCurrentInteractive={setCurrentInteractive} />
        ))}
      </div>
      <Modal_Interactives setInteractiveName={setInteractiveName} interactivesNamesArr={interactivesNamesArr} isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmModal} header="Добавить новый интерактив" message="Вы создаете новый интерактив. Несохраненные данные будут потеряны" setInteractivesNamesArr={setInteractivesNamesArr} answer1="Подтвердить" answer2="Сбросить" />
    </div>
  );
};

export default Header;
