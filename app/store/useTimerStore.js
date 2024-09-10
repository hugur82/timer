import { useEffect, useState } from "react";
import { timeToMs, msToTime } from "../utils";

export const useTimerStore = () => {
  const [duration, setDuration] = useState();
  const [time, setTime] = useState({ hrs: "00", mins: "00", secs: "00" });
  const [tab, setTab] = useState([]);

  let startTimer;
  startTimer = tab?.some((el) => {
    return el?.isRunning === true;
  });
  useEffect(() => {
    let interv;
    if (!startTimer) return;
    interv = setInterval(() => {
      setTab((prevTab) => {
        const now = new Date().getTime();
        return prevTab.map((timer) => {
          if (!timer.isRunning) return { ...timer, endAt: timer.endAt + 1000 };
          let tLeft = timer.endAt - now;
          if (tLeft <= 0) {
            return { ...timer, timeLeft: 0, isRunning: false };
          }
          return { ...timer, timeLeft: tLeft };
        });
      });
      console.log("dans le setinterval");
    }, 1000);

    return () => {
      console.log("cleanup");
      clearInterval(interv);
    };
  }, [tab]);

  const addTime = () => {
    const timeMs = timeToMs(time);
    const now = new Date().getTime(); //getTime pour avoir en ms le moment precis
    // const startedTime = msToTime(now); // pour avoir en heure
    const endTime = now + timeMs;

    console.log("endTime dans addTime", endTime);
    //  console.log("en hms startedTime = ", startedTime);
    console.log("en hms endtime = ", msToTime(endTime));
    setTab((prev) => [
      ...prev,
      {
        duration: timeMs,
        timeLeft: endTime - now,
        endAt: endTime,
        time: time,
        id: Math.random(),
        isRunning: true,
      },
    ]);
  };

  const deleteTimer = (id) => {
    setTab((prevTab) => {
      const newTab = prevTab.filter((el) => el.id !== id);
      return newTab;
    });
  };

  const update = (time) => {
    setTime(time);
  };

  const toggleIsRunning = (id) => {
    setTab((prevTab) =>
      prevTab.map((timer) =>
        timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
      )
    );
  };
  const resetTimer = (id) => {
    setTab((timers) => {
      const updateTimer = timers.map((timer) => {
        if (timer.id !== id) return timer;
        const timeMs = timeToMs(timer.time);
        const now = new Date().getTime(); //getTime pour avoir en ms le moment precis
        const endTime = now + timeMs;
        return {
          ...timer,
          timeLeft: endTime - now,
          endAt: endTime,
          isRunning: true,
        };
      });
      return updateTimer;
    });
  };

  return {
    tab,
    update: (time) => {
      update(time);
    },
    addTime,
    deleteTimer,
    toggleIsRunning,
    resetTimer,
  };
};
