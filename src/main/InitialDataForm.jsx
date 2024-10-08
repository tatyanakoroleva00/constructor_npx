import React from 'react'
import styles from '../css/StateOne.module.css';

const InitialDataForm = ({globalData, setGlobalData}) => {

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setGlobalData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles['initial-data-form']}>
        <label>Заголовок&nbsp;</label>
          <input
            type="text"
            name="heading"
            value={globalData.heading}
            onChange={inputChangeHandler}
          />
          <label>URL видео&nbsp;</label>
          <input
            type="text"
            name="url"
            value={globalData.url}
            onChange={inputChangeHandler}
          />
    </div>
  )
}

export default InitialDataForm