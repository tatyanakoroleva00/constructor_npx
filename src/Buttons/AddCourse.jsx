import React from 'react'
import styles from '../css/Buttons.module.css';

const AddCourse = ({addCourse}) => {
  return (
    <button className={styles['add-button']} onClick={addCourse}>Добавить интерактив</button>
  )
}

export default AddCourse