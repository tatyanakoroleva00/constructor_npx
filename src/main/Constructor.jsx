import StateOne from "./StateOne";
import StateTwo from "./StateTwo";
import { useState, useEffect } from "react";
import styles from '../css/Constructor.module.css';

const Constructor = ({ setVideoData, setPlayBtnIsClicked, playBtnIsClicked, setVideoCourseId }) => {
  const [switchStates, setSwitchStates] = useState(false);
  const [serverDataGot, setServerDataGot] = useState(false);
  const [globalData, setGlobalData] = useState({
    'heading': '',
    'url': '',
  });
  const [videoDuration, setVideoDuration] = useState(0);
  const [serverData, setServerData] = useState({});

  useEffect(() => {
    if (globalData.url) {
      const video = document.createElement('video');
      video.src = globalData.url;
      video.addEventListener('loadedmetadata', function () {
        const duration = video.duration; // Длительность в секундах
        setVideoDuration(Math.floor(duration));
      });
    }
  }, [globalData.url])

  return (
    <div className={styles['constructor-wrapper']}>
      <div className={`${switchStates && styles.invisible}`}><StateOne setVideoCourseId={setVideoCourseId} playBtnIsClicked={playBtnIsClicked} setPlayBtnIsClicked={setPlayBtnIsClicked} setVideoData={setVideoData} setServerData={setServerData} setServerDataGot={setServerDataGot} setSwitchStates={setSwitchStates} setGlobalData={setGlobalData} /></div>
      <div className={`${!switchStates && styles.invisible}`}><StateTwo videoDuration={videoDuration} serverDataGot={serverDataGot} serverData={serverData} globalData={globalData} setGlobalData={setGlobalData} /></div>
    </div>
  );
};

export default Constructor;