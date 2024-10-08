import Constructor from "./main/Constructor";
import { useState } from "react";
import styles from './css/App.module.css';
function App() {
  const [playBtnIsClicked, setPlayBtnIsClicked] = useState(false);
  const [videoCourseId, setVideoCourseId] = useState('');

  let source = 'http://quiz.site/videocourses/?courseId=' + videoCourseId;
  return (
    <div className={styles['page-container']}>
    <div className={styles['constructor-wrapper']}>
      <Constructor playBtnIsClicked={playBtnIsClicked} setPlayBtnIsClicked={setPlayBtnIsClicked} setVideoCourseId={setVideoCourseId} videoCourseId={videoCourseId} />
    </div>
    <div className={styles['iframe-wrapper']}>
    {playBtnIsClicked && <iframe src={source}  width={800} height={900} scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>}
    </div>
    </div>
  );
}

export default App;
