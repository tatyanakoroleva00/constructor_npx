import React from "react";
import styles from '../css/Modal.module.css';
export default function Modal ({ isOpen, onClose, onConfirm, header, message, answer1, answer2}) {
    if (!isOpen) return null;
    return(
      <div className={styles['modal-overlay']}>
        <div className={styles['modal']}>
          <h2>{header}</h2>
          <p>{message}</p>
          <div className={styles['modal-buttons']}>
            <button onClick={onConfirm}>{answer1}</button>
            <button onClick={onClose}>{answer2}</button>
          </div>
        </div>
      </div>
    );
  };