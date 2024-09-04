import React, { useEffect, useState } from "react";
import { useTimerStore } from "./FormTimer";
import { X, Pause, Play } from "lucide-react"; // Assure-toi d'importer l'icône de croix

const Timer = ({ duration, id, time }) => {
  const { deleteTimer } = useTimerStore(time);

  const now = Date.now();

  function formatDuration(duration) {
    duration = duration + 2 * 60 * 60 * 1000;
    var milliseconds = Math.floor((duration % 1000) / 100),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes;
  }

  const futureTimeInMilliseconds = now + duration;
  const futureTimeFormated = formatDuration(futureTimeInMilliseconds);

  const [timerObject, setTimerObject] = useState({
    id,
    duration,
    timeLeft: duration,
    endAt: futureTimeFormated,
    isRunning: true,
  });

  useEffect(() => {
    let refresh = 100;
    let sub = refresh;
    const inter = setInterval(() => {
      setTimerObject((prev) => {
        prev.isRunning ? (sub = refresh) : (sub = 0);
        if (prev.timeLeft <= refresh) clearInterval(inter);
        return { ...prev, timeLeft: prev.timeLeft - sub };
      });
    }, refresh);

    return () => {
      clearInterval(inter);
    };
  }, []);

  const percent = parseInt(
    (timerObject.timeLeft / timerObject.duration - 1) * -100
  );
  const strokeDasharray = 2 * Math.PI * 45; // Circumference of the circle
  const strokeDashoffset = strokeDasharray - (percent / 100) * strokeDasharray;

  return (
    <div className="bg-slate-800 shadow-lg rounded-lg p-4 flex flex-col gap-3 justify-evenly items-center w-52">
      <div>{timerObject.endAt}</div>
      <div className="relative flex items-center justify-center w-full">
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <circle
            className="text-lime-800"
            strokeWidth="8"
            stroke="currentColor"
            fill="none"
            cx="50"
            cy="50"
            r="45"
          />
          <circle
            className="text-lime-300"
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            stroke="currentColor"
            fill="none"
            cx="50"
            cy="50"
            r="45"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        </svg>
        <div className="absolute text-xl font-semibold text-lime-700">
          {percent}%
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() =>
            setTimerObject((prev) => ({ ...prev, isRunning: !prev.isRunning }))
          }
          className={`px-4 py-2 rounded-lg text-white shadow-md transition duration-300 ${
            timerObject.isRunning
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {timerObject.isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={() => deleteTimer(id)}
          className="p-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition duration-300"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default Timer;
