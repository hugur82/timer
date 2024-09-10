import React, { useEffect } from "react";
import { msToTime } from "./utils";
import { X, Play, Pause, RotateCcw } from "lucide-react";

const Timer = ({ timerObj, deleteTimer, toggleIsRunning, resetTimer }) => {
  const endTime = msToTime(timerObj.endAt + 2 * 3600000);
  const textTime =
    timerObj.time.hrs > 0 ? (
      <p>{+timerObj.time.hrs} hrs</p>
    ) : timerObj.time.mins > 0 ? (
      <p>{+timerObj.time.mins} mins</p>
    ) : (
      <p>{+timerObj.time.secs} sec</p>
    );

  const tLeft = msToTime(timerObj.timeLeft);
  let printTime = "";
  tLeft.hrs > 0
    ? (printTime = `${tLeft.hrs}:${tLeft.mins}:${tLeft.secs}`)
    : (printTime = `${tLeft.mins}:${tLeft.secs}`);

  const percent = (timerObj.timeLeft / timerObj.duration - 1) * -100;

  return (
    <div className="max-w-xs mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <div className="relative">
          <svg className="w-40 h-40" viewBox="0 0 36 36">
            <path
              className="text-gray-300"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth="3"
              stroke="currentColor"
            />
            <path
              className="text-blue-500"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth="3"
              strokeDasharray={`${percent}, 100`}
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="text-sm font-semibold text-black">
              {endTime.hrs}:{endTime.mins}
            </div>
            <div className="text-xl font-semibold text-black">{printTime}</div>
            <div className="text-sm font-semibold text-black">{textTime}</div>
          </div>
        </div>
        <div className="flex gap-3 justify-evenly">
          {timerObj.isRunning ? (
            <button
              onClick={() => toggleIsRunning(timerObj.id)}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
            >
              <Pause size={24} />
            </button>
          ) : timerObj.timeLeft > 0 ? (
            <button
              onClick={() => toggleIsRunning(timerObj.id)}
              className="mt-4 px-4 py-2 bg-green-400 text-white rounded"
            >
              <Play size={24} />
            </button>
          ) : (
            <button
              onClick={() => resetTimer(timerObj.id)}
              className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded"
            >
              <RotateCcw size={24} />
            </button>
          )}

          <button
            onClick={() => deleteTimer(timerObj.id)}
            className="mt-4 px-4 py-2 bg-red-700 text-white rounded"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
