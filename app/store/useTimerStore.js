import { useState } from "react";
import { timeToMs, msToTime } from "../utils";

export const useTimerStore = () => {
  const [duration, setDuration] = useState();
  const [time, setTime] = useState();
  const [tab, setTab] = useState([]);

  const addTime = () => {
    const timeMs = timeToMs(time);
    const now = new Date().getTime() + 2 * 3600000; //getTime pour avoir en ms le moment precis
    const startedTime = msToTime(now); // pour avoir en heure
    const endTime = now + timeMs;

    console.log("endTime dans addTime", endTime);
    console.log("en hms startedTime = ", startedTime);
    console.log("en hms endtime = ", msToTime(endTime));
    setTab((prev) => [
      ...prev,
      {
        duration: timeMs,
        //  timeLeft:
        endAt: msToTime(endTime),
        time: time,
        id: Math.random(),
        isRunning: true,
      },
    ]);
  };

  const delTimer = (id) => {
    setTab((prevTab) => {
      const newTab = prevTab.filter((el) => el.id !== id);
      return newTab;
    });
  };

  const update = (time) => {
    setTime(time);
    console.log(time);
  };

  return {
    tab,
    update: (time) => {
      update(time);
    },
    addTime: () => {
      addTime();
    },
    deleteTimer: (id) => {
      delTimer(id);
    },
  };
};
