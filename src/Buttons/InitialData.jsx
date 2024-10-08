import React from 'react';
import { useState } from 'react';
import Modal from '../modal_windows/Modal';

const InitialData = ({ setInitialForm, initialForm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const confirmModal = () => {
    window.location.reload();
  };

  return (
    <>
      {initialForm && <div>
        <button onClick={openModal} >К списку проектов</button>
        <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmModal} header="Переход к списку проектов" message="Несохраненные данные могут быть потеряны. Вы готовы перейти?" answer1="Да" answer2="Нет, остаться" />
      </div>}
      <div>
        <button onClick={() => { setInitialForm(!initialForm); }}>{initialForm ? 'Вперед' : 'Назад'}</button>
      </div>
    </>
  )
}

export default InitialData