import React, { useState, useEffect, useRef } from "react";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import pedro from "./assets/pedro.mp3";
import chico from "./assets/chico.mp3";

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(new Audio(pedro));
  const resetAudioRef = useRef(new Audio(chico));
  const [resetAudioPlaying, setResetAudioPlaying] = useState(false);
  const [showPauseButton, setShowPauseButton] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      audioRef.current.play();
      setShowPauseButton(true);
    } else {
      clearInterval(interval);
      audioRef.current.pause();
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = () => {
    setIsActive(true);
    if (resetAudioPlaying) {
      resetAudioRef.current.pause();
      setResetAudioPlaying(false);
    }
  };

  const pauseTimer = () => {
    setIsActive(!isActive);
    if (!isActive) {
      audioRef.current.play();
    }
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    resetAudioRef.current.currentTime = 0;
    resetAudioRef.current.play();
    setResetAudioPlaying(true);
    setShowPauseButton(false);
  };

  const formatTime = () => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${sec < 10 ? `0${sec}` : sec}`;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="relative">
        <div className="flex items-center">
          <button
            className="absolute h-4 w-2 rounded-full bg-gray-500 hover:bg-green-500 flex justify-center items-center"
            style={{ left: "98.9%", top: "112px" }}
            onClick={startTimer}
          ></button>
          <button
            className="absolute h-4 w-2 rounded-full bg-gray-500 hover:bg-red-500 flex justify-center items-center"
            style={{ left: "98.9%", top: "132px" }}
            onClick={resetTimer}
          ></button>
        </div>
        <div className="w-64 h-64 rounded-full border-gray-600 border-8 bg-gray-500 flex justify-center items-center relative">
          <div
            className="w-56 h-56 rounded-full border-gray-400 flex justify-center items-center relative"
            style={{
              backgroundImage: isActive
                ? "url('src/assets/pedro.gif')"
                : "url('src/assets/paulo.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="text-white text-5xl font-bold">{formatTime()}</div>
            {isActive || showPauseButton ? (
              <button
                className="absolute h-12 w-12 rounded-full bg-gray-500 hover:bg-gray-700 flex justify-center items-center"
                style={{ top: "150px" }}
                onClick={pauseTimer}
              >
                <span className="text-white text-xl">
                  {isActive ? <CiPause1 /> : <CiPlay1 />}
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
