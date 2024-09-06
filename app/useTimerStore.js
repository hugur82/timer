import { useState } from "react";

export const useTimerStore = () => {
  const [ms, setMs] = useState();
  const [tab, setTab] = useState([]);

  const timeToMs = (time) => {
    console.log("timetoms in method in use hook", time);
    return time.hrs * 3600000 + time.mins * 60000 + time.secs * 1000;
  };

  const msToTime = (mili) => {
    let hrs = Math.floor((mili / (1000 * 60 * 60)) % 24).toString();
    let mins = Math.floor((mili / (1000 * 60)) % 60).toString();
    let secs = Math.floor((mili / 1000) % 60).toString();

    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;

    return {
      hrs,
      mins,
      secs,
    };
  };

  const addTime = () => {
    let newTime = msToTime(ms);
    let end=
    setTab((prev) => [...prev, { ms: ms, time: newTime,
      endAt:,
       id: Math.random() }]);
    console.log(tab);
  };

  const delTimer = (id) => {
    setTab((prevTab) => {
      const newTab = prevTab.filter((el) => el.id !== id);
      return newTab;
    });
  };

  const update = (time) => {
    setMs(timeToMs(time));
  };

  return {
    tab,
    timeToMs: (time) => {
      console.log("timetoms in use hook", time);

      timeToMs(time);
    },
    msToTime: (ms) => {
      msToTime(ms);
    },
    update: (time) => {
      update(time);
    },
    ajoutTimer: () => {
      addTime();
    },
    deleteTimer: (id) => {
      delTimer(id);
    },
  };
};
