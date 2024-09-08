export const formatStringNumber = (value) => {
  return value.toString().padStart(2, "0");
};

export const timeToMs = (time) => {
  return time.hrs * 3600000 + time.mins * 60000 + time.secs * 1000;
};

export const msToTime = (mili) => {
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
