import React, { useEffect, useState } from "react";
import Timer from "./Timer";

export const useTimerStore = (time) => {
  const [ms, setMs] = useState(
    time.hrs * 3600000 + time.mins * 60000 + time.secs * 1000
  );
  const [tab, setTab] = useState([]);

  const addTime = () => {
    setTab((prev) => [...prev, { ms: ms, id: tab.length }]);
    console.log(tab);
  };

  const delTimer = (id) => {
    setTab((prevTab) => {
      const newTab = prevTab.filter((el) => el.id !== id);
      console.log(
        "id =",
        id,
        "\nprevTab=",
        prevTab,
        "\nnewTab=",
        newTab,
        "\ntab=",
        tab
      );

      return newTab;
    });
  };

  return {
    tab,
    update: (time) => {
      setMs(time.hrs * 3600000 + time.mins * 60000 + time.secs * 1000);
    },
    ajoutTimer: () => {
      addTime();
    },
    deleteTimer: (id) => {
      delTimer(id);
    },
  };
};

const FormTimer = () => {
  const [time, setTime] = useState({ hrs: "00", mins: "00", secs: "00" });

  const { ajoutTimer, deleteTimer, update, tab } = useTimerStore(time);

  const handleChange = (field, val) => {
    if (isNaN(val)) return;

    if (field === "hrs" && val > 23) {
      val = 23;
    } else {
      if (val > 59) val = 59;
    }
    val = val.toString().padStart(2, "0");
    setTime((prev) => ({ ...prev, [field]: val }));
  };

  useEffect(() => {
    update(time);
    return () => {};
  }, [time]);

  const handleClick = () => {
    ajoutTimer();
  };

  console.log(`hour : ${time.hrs} -- min: ${time.mins} -- sec: ${time.secs}`);

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
          {tab &&
            tab.map((el) => (
              <Timer time={time} duration={el.ms} key={el.id} id={el.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FormTimer;
