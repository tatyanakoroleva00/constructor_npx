import React from 'react'
import styles from '../css/Buttons.module.css';

const DeleteCourse = ({deleteCourse}) => {
  return (
    <button className={styles['delete-button']} onClick={deleteCourse}>Удалить интерактив</button>
  )
}

export default DeleteCourse