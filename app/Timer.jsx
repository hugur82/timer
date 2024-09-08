import React from "react";

const Timer = ({ timerObj }) => {
  return (
    <div className=" min-h-44 w-52 flex-wrap border border-slate-500 flex flex-row gap-1 justify-center items-center">
      <div>id:{timerObj.id}</div>
      <div>
        {timerObj.time.hrs}:{timerObj.time.mins}:{timerObj.time.secs}
      </div>
      <div>endAt: {timerObj.endAt}</div>
      <div>miliseconds: {timerObj.duration}</div>
    </div>
  );
};

export default Timer;
