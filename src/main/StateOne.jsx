import React from "react";
import styles from '../css/StateOne.module.css';
import { useState, useEffect } from "react";
import copyBtn from '../img/copy-btn.png';
const StateOne = ({ setSwitchStates, setGlobalData, setServerData, setServerDataGot, setPlayBtnIsClicked, playBtnIsClicked, videoCourseId, setVideoCourseId }) => {
  const [newCourse, setNewCourse] = useState(false);
  const [stateOneData, setStateOneData] = useState({
    heading: "",
    url: "",
  });
  const [courses, setCourses] = useState([]);
  const [iFrame, setIFrame] = useState('');
  const [iFrameIsShown, setIFrameIsShown] = useState(false);
  const [chosenId, setChosenId] = useState('');
  const [activeIframe, setActiveIframe] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  //Подгрузка лишь вначале всех данных
  useEffect(() => {
    fetch('http://quiz.site/get-all-video-courses-handler')
      .then(response => response.json())
      .then((data) => {
        setCourses(data);
      })
  }, [])

  

  //Сохраняем введенные данные: url и название проекта
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setStateOneData((prev) => ({ ...prev, [name]: value }));
  };
  //Переключение между состояниями, сохраняем url и название проекта в global data
  const submitFormHandler = (event) => {
    event.preventDefault();
    setGlobalData({ 'heading': stateOneData['heading'], 'url': stateOneData['url'] });
    setSwitchStates(true);
  }
  //Удаляем интерактивный курс по id, страница перезагружается и список проектов подгружается заново
  const deleteInteractiveHandler = (event, courseId) => {
    event.preventDefault();
    fetch('http://quiz.site/delete-videocourse-handler', {
      method: 'POST',
      body: JSON.stringify(courseId)
    })
    window.location.reload();
  }
  //Редактируем созданный ранее проект
  const editInteractiveHandler = (event, courseIdGot) => {
    event.preventDefault();
    fetch('http://quiz.site/edit-videocourse-handler', {
      method: 'POST',
      body: JSON.stringify(courseIdGot)
    })
      .then(response => response.json())
      .then(data => {
        setSwitchStates(true);
        data['id'] = courseIdGot;
        setServerData(data); //задаем Сервеные данные
        setServerDataGot(true);
        setGlobalData(data);
      })
  }
  //Показываем preview курса рядом с конструктором
  const showVideoCourseHandler = (videoCourse) => {
    setChosenId(videoCourse);
    if (chosenId === videoCourse) {
      setPlayBtnIsClicked(!playBtnIsClicked);
    } else {
      setPlayBtnIsClicked(false);
      setVideoCourseId(videoCourse);
      setPlayBtnIsClicked(true);
    }
  }
  //Показ iframe ссылки
  const showIFrameHandler = (videoCourseId, index) => {
    if (iFrameIsShown && activeIframe === index) {
      setIFrameIsShown(false);
    } else {
      setActiveIframe(index);
      setIFrameIsShown(true);
      const link = new URL('http://quiz.site/videocourses/');
      link.searchParams.set('courseId', videoCourseId);
      setIFrame(`<iframe src="${link.toString()}" width="100%" height="100%" scrolling="no"></iframe>`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(iFrame).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch((err) => {
      console.error('Ошибка при копировании: ', err);
    })
  };



  return (
    <div>
      <p className={styles.title}>КОНСТРУКТОР</p>
      {courses.length !== 0 && <div className={styles['courses-table']}>
        <>
          {courses.map((elem, index) => (
            <div>
              <div key={index + elem} className={styles['table-line']}>
                <span>{elem['video_course_name']}</span>
                <div className={styles['btns-row']}>
                  <button className={styles['edit-btn']} onClick={(event) => editInteractiveHandler(event, elem['video_course_id'])}>Edit</button>
                  <button className={styles['delete-btn']} onClick={(event) => deleteInteractiveHandler(event, elem['video_course_id'])}>Delete</button>
                  <button className={styles['play-btn']} onClick={() => showVideoCourseHandler(elem['video_course_id'])}>Preview</button>
                  <button className={styles['iframe-btn']} onClick={() => showIFrameHandler(elem['video_course_id'], index)}>Iframe</button>
                </div>
              </div>
              {activeIframe === index && iFrameIsShown &&

                <div className={styles['iframe-link-modal-window']}>
                  <textarea value={iFrame} />
                  <img src={copyBtn} className={styles['copy-btn']} onClick={copyToClipboard}/>
                  {isCopied && <span className={styles['copied-notification']}>Ссылка скопирована!</span>}
                </div>}
            </div>
          ))}

        </>
      </div>}
      <div className={styles['add-new-project-wrapper']}>
        <button onClick={() => setNewCourse(true)}>Добавить проект</button>
      </div>
      {newCourse && (
        <form className={styles['form-wrapper']} onSubmit={submitFormHandler}>
          <div className={styles['form-fields']}>
            <label>Заголовок&nbsp;</label>
            <input
              type="text"
              name="heading"
              value={stateOneData.heading}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <div className={styles['form-fields']}>
            <label>URL видео&nbsp;</label>
            <input
              type="text"
              name="url"
              value={stateOneData.url}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <input className={styles['submit-btn']} type="submit" value="Создать проект" />
        </form>
      )}
    </div>
  );
};

export default StateOne;
