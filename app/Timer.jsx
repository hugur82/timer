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
    <div className="w-56 mx-auto">
      <div className="bg-sky-700 shadow-lg rounded-lg py-3 flex flex-col items-center">
        <div className="relative">
          <svg className="w-40 h-40" viewBox="0 0 36 36">
            <path
              className="text-sky-600"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
            />
            <path
              className="text-sky-400 transition-all duration-1000 ease-in-out "
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth="1"
              strokeDasharray={`${percent}, 100`}
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 ">
            <div className="text-sm font-semibold text-sky-400">
              {endTime.hrs}:{endTime.mins}
            </div>
            <div className="text-3xl font-semibold text-sky-400">
              {printTime}
            </div>
            <div className="text-sm font-semibold text-sky-400">{textTime}</div>
          </div>
        </div>
        <div>{percent}</div>
        <div className="flex gap-3 justify-between px-2 w-full">
          {timerObj.isRunning ? (
            <button
              onClick={() => toggleIsRunning(timerObj.id)}
              className=" mt-4 px-4 py-2  bg-sky-900 active:bg-sky-950 text-amber-600 rounded"
            >
              <Pause size={24} />
            </button>
          ) : timerObj.timeLeft > 0 ? (
            <button
              onClick={() => toggleIsRunning(timerObj.id)}
              className="mt-4 px-4 py-2 bg-sky-900 active:bg-sky-950 text-green-600 rounded"
            >
              <Play size={24} />
            </button>
          ) : (
            <button
              onClick={() => resetTimer(timerObj.id)}
              className="mt-4 px-4 py-2  bg-sky-900 active:bg-sky-950 text-yellow-300 rounded"
            >
              <RotateCcw size={24} />
            </button>
          )}

          <button
            onClick={() => deleteTimer(timerObj.id)}
            className="mt-4 px-4 py-2 bg-sky-900 active:bg-sky-950 text-red-500 rounded "
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
