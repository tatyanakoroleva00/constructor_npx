import styles from '../css/Buttons.module.css';
const CoursesButton = ({allData, btnIndex, setCurrentInteractive, index, setActiveBtn, activeBtn, interactivesNamesArr, serverDataGot }) => {
  return (
    <>
      {!serverDataGot && <button className={`${activeBtn === index ? styles['active-btn'] : styles['courses-btn']}`} value={btnIndex} onClick={() => { setCurrentInteractive(btnIndex); setActiveBtn(index); }}>{interactivesNamesArr.length > 0 && interactivesNamesArr[index]}</button>}
      {serverDataGot && <button className={`${activeBtn === index ? styles['active-btn'] : styles['courses-btn']}`} value={btnIndex} onClick={() => { setCurrentInteractive(btnIndex); setActiveBtn(index); }}>{allData[index] ? allData[index]['data']['interactive_name'] : interactivesNamesArr[index] }</button>}
    </>
  )
}

export default CoursesButton