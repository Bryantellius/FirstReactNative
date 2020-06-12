import { IActivity } from "./types";
import { Picker } from "react-native";

export const setProgressBar = async (
  activities: [],
  runs: [],
  walks: [],
  bikes: [],
  swims: []
) => {
  let rw = Math.round((runs.length / activities.length) * 100);
  let ww = Math.round((walks.length / activities.length) * 100);
  let bw = Math.round((bikes.length / activities.length) * 100);
  let sw = Math.round((swims.length / activities.length) * 100);

  //   document.getElementById("runs").style.width = `${rw}%`;
  //   if (rw > 0) {
  //     document.getElementById("runs").innerHTML = `${rw}%`;
  //   }
  //   document.getElementById("walks").style.width = `${ww}%`;
  //   if (ww > 0) {
  //     document.getElementById("walks").innerHTML = `${ww}%`;
  //   }
  //   document.getElementById("bikes").style.width = `${bw}%`;
  //   if (bw > 0) {
  //     document.getElementById("bikes").innerHTML = `${bw}%`;
  //   }
  //   document.getElementById("swims").style.width = `${sw}%`;
  //   if (sw > 0) {
  //     document.getElementById("swims").innerHTML = `${sw}%`;
  //   }
};

const round = (value: Number, decimals: Number) => {
  return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
};

export const getSums = (
  activities: IActivity[],
  runs: IActivity[],
  walks: IActivity[],
  bikes: IActivity[],
  swims: IActivity[]
) => {
  let rs = runs.reduce((acc, { distance }) => acc + Number(distance), 0);
  let ws = walks.reduce((acc, { distance }) => acc + Number(distance), 0);
  let bs = bikes.reduce((acc, { distance }) => acc + Number(distance), 0);
  let ss = swims.reduce((acc, { distance }) => acc + Number(distance), 0);
  return {
    rs: round(rs, 2),
    ws: round(ws, 2),
    bs: round(bs, 2),
    ss: round(ss, 2),
  };
};

export const averagePace = (
  hrs: number,
  min: number,
  sec: number,
  distance: number
) => {
  hrs = hrs * 3600;
  min = min * 60;
  sec = sec;

  let totalSeconds = hrs + min + sec;

  let avgHrs = Math.floor(totalSeconds / 60 / 60 / distance);
  let avgMin = Math.floor((totalSeconds / 60 - avgHrs * 60) / distance);
  let avgSec = Math.floor((totalSeconds / distance) % 60);

  let pace: string = ``;

  if (avgHrs === 0 && avgSec > 10) {
    pace = `${avgMin}:${avgSec}/mi`;
  } else if (avgHrs === 0 && avgSec < 10) {
    pace = `${avgMin}:0${avgSec}/mi`;
  }

  return pace;
};

export default {
  setProgressBar,
  getSums,
  averagePace,
};
