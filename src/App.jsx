import React, { useState, useEffect, useRef } from "react";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { MdInfoOutline, MdOutlineCancel } from "react-icons/md";
import { HiArrowSmLeft, HiArrowSmRight, HiCheck } from "react-icons/hi";
import pedro from "./assets/pedro.mp3";
import chico from "./assets/chico.mp3";
import paulo from "./assets/paulo.png";
import pedrogif from "./assets/pedro.gif";

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const audioRef = useRef(new Audio(pedro));
  const resetAudioRef = useRef(new Audio(chico));
  const [resetAudioPlaying, setResetAudioPlaying] = useState(false);
  const [showPauseButton, setShowPauseButton] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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
    const time = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${sec < 10 ? `0${sec}` : sec}`;
    return time;
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-900 relative">
        <div className="relative z-10">
          <div className="flex items-center">
            <div className="button-container">
              <button
                className="absolute h-4 w-2 rounded-full bg-gray-500 hover:bg-green-500 flex justify-center items-center start-button"
                style={{ left: "98.9%", top: "112px" }}
                onClick={startTimer}
              ></button>
              {showInstructions && (
                <>
                  {currentStep === 1 && (
                    <div>
                      <div
                        className="h-0.5 w-28 border-b-0 bg-white absolute"
                        style={{ left: "102%", top: "119px" }}
                      />
                      <div
                        className="instructions bg-white text-black rounded-lg border border-gray-500 p-4"
                        style={{ left: "125%" }}
                      >
                        <h2 className="w-48 text-lg font-bold">Start</h2>
                        <div className="flex flex-col">
                          <p>Press the button to start the stopwatch.</p>
                          <div className="flex justify-end mt-4">
                            <button
                              className="text-black rounded px-4 py-2"
                              onClick={() => setCurrentStep(currentStep + 1)}
                            >
                              <HiArrowSmRight className="text-blue-600 text-2xl" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div>
                      <div
                        className="h-0.5 w-28 border-b-0 bg-white absolute"
                        style={{ left: "102%", top: "140px" }}
                      />
                      <div
                        className="instructions bg-white text-black rounded-lg border border-gray-500 p-4"
                        style={{ left: "125%" }}
                      >
                        <h2 className="w-48 text-lg font-bold">Stop / Reset</h2>
                        <div className="flex flex-col">
                          <p>
                            Press the button to stop and reset the stopwatch.
                          </p>
                          <div className="flex justify-between mt-4">
                            <button
                              className="text-black rounded px-4 py-2"
                              onClick={() => setCurrentStep(currentStep - 1)}
                            >
                              <HiArrowSmLeft className="text-blue-600 text-2xl" />
                            </button>
                            <button
                              className="text-black rounded px-4 py-2"
                              onClick={() => {
                                setShowInstructions(!showInstructions);
                                setCurrentStep(1);
                              }}
                            >
                              <HiCheck className="text-blue-600 text-2xl" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
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
                  ? `url(${pedrogif})`
                  : `url(${paulo})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="text-white text-5xl font-bold hover:text-black">
                {formatTime()}
              </div>
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
        <button
          className="absolute bottom-10 right-10 text-4xl text-white rounded-full"
          onClick={() => {
            setShowInstructions(!showInstructions);
            setCurrentStep(1);
          }}
        >
          {showInstructions ? <MdOutlineCancel /> : <MdInfoOutline />}
        </button>
      </div>
    </>
  );
};

export default App;
