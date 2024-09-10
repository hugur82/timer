import React, { useState } from "react";
import { useTimerStore } from "./store/useTimerStore";
import { formatStringNumber } from "./utils";
import Timer from "./Timer";

const FormTimer = () => {
  const [time, setTime] = useState({ hrs: "00", mins: "00", secs: "00" });
  const { tab, update, addTime, deleteTimer, toggleIsRunning, resetTimer } =
    useTimerStore();

  const handleClick = () => {
    addTime();
  };

  const handleChange = (property, value) => {
    if (isNaN(value)) return;
    let val = value;
    if (property === "hrs" && value > 23) val = 23;
    else if (value > 59) val = 59;
    val = formatStringNumber(val);
    setTime((prev) => {
      const newTime = { ...prev, [property]: val };
      update(newTime);
      return newTime;
    });
  };

  return (
    <div className="mx-auto flex flex-col min-h-full max-w-3xl gap-8 p-4">
      <h1 className="font-bold bg-base-200 py-2 px-5 m-auto rounded-md">
        Timer
      </h1>
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex flex-row w-full justify-evenly gap-16">
          <p>hr</p>
          <p>min</p>
          <p>sec</p>
        </div>
        <div className="flex flex-row items-center bg-base-200 justify-between border border-gray-400 gap-2 p-5">
          <input
            type="text"
            className="focus:bg-accent h-24 w-1/3 text-7xl rounded-md bg-base-200 text-center"
            onChange={(e) => handleChange("hrs", +e.target.value)}
            value={time.hrs}
          />
          :
          <input
            type="text"
            className="focus:bg-accent h-24 w-1/3 text-7xl rounded-md bg-base-200 text-center"
            onChange={(e) => handleChange("mins", +e.target.value)}
            value={time.mins}
          />
          :
          <input
            type="text"
            className="focus:bg-accent h-24 w-1/3 text-7xl rounded-md bg-base-200 text-center"
            onChange={(e) => handleChange("secs", +e.target.value)}
            value={time.secs}
          />
        </div>
        <button
          onClick={handleClick}
          className="bg-success text-green-500 self-end rounded-lg p-3 "
        >
          Add Timer
        </button>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {tab.length > 0
            ? tab?.map((el) => (
                <Timer
                  key={el.id}
                  timerObj={el}
                  toggleIsRunning={toggleIsRunning}
                  deleteTimer={deleteTimer}
                  resetTimer={resetTimer}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default FormTimer;
