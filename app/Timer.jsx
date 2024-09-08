import React from "react";

const Timer = ({ timerObj }) => {
  return (
    <div className="h-44 w-52 flex-wrap border border-slate-500 flex flex-row gap-1 justify-center items-center">
      <div>id:{timerObj.id}</div>
      <div>
        {timerObj.time.hrs}:{timerObj.time.mins}:{timerObj.time.secs}
      </div>
      <div>miliseconds: {timerObj.ms}</div>
    </div>
  );
};

export default Timer;
