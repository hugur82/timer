import { useState } from "react";
import { timeToMs, msToTime } from "../utils";

export const useTimerStore = () => {
  const [ms, setMs] = useState();
  const [time, setTime] = useState();
  const [tab, setTab] = useState([]);

  const addTime = () => {
    const newMs = timeToMs(time);
    console.log("time dans le add: ", time);
    setTab((prev) => [
      ...prev,
      {
        ms: newMs,
        time: time,
        id: Math.random(),
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
