// import React, { useState, useMemo, useEffect } from "react";

// function Timer({ delay, callback }) {
//   // const startTime = startTime;

//   const [countdown, setCountdown] = useState(delay);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (countdown > 0) {
//         setCountdown(countdown - 1);
//       } else {
//         clearInterval(timer);
//         if (countdown === 0) {
//           callback();
//         }
//       }
//     }, 1000);

//     return () => clearInterval(timer);  

//   }, [countdown]);

  // useEffect(() => {

  //     return () => clearInterval(timer);
  // }, [countdown]);

  // useEffect(() => {
  //     console.log("countdown "+countdown);
  // } ,[countdown]);

  // const startNow = useMemo(() => Date.now(), []);
  // const [now, setNow] = useState(startNow);

  // const secondsPassed = ~~((now - startNow) / 1000);

  // const startTime = 8 * 0.5;

  // const [timeLeft, setTimeLeft] = useState(Math.max(0, startTime - secondsPassed)); // prevent negative time left

  // const minuteCount = ~~(timeLeft / 60);
  // const secondsCount = timeLeft % 60;
  // const countdown = `${minuteCount}:${secondsCount.toLocaleString("en-US", {
  //   minimumIntegerDigits: 2
  // })}`;

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (timeLeft > 0) {
  //       setNow(Date.now());
  //     } else {
  //       clearInterval(timer);
  //       if (timeLeft === 0) {
  //         callback();
  //       }
  //     }
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [timeLeft]);

  // return <div>{countdown}</div>;
// }
// const Timer = ({callback}) => {
//     const [time, setTime] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             if(time > 0) { setTime(time - 1); }
//         }, 1000);
//         if(time === 0) { callback(); }

//         return () => clearInterval(interval);
//     },[time]);
// }

// export default Timer;

import React, { useState, useEffect } from "react";
import { MatchAlert } from "./LayoutAlerts";

function Timer({round, delay, callback }) {
  const [countdown, setCountdown] = useState(delay);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setCountdown(delay);
  }, [delay,round]); // in case different timers we added delay , and round for rounds...

  useEffect(() => {
    const timer = countdown > 0 ? setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000) : null;

    if (countdown === 0) {
      return callback();
    }

    return () => timer && clearInterval(timer);
  }, [countdown]);

  return <div>{countdown} seconds remaining</div>;
}

// function Timer({ delay, callback }) {
//   // const startTime = startTime;

//   const [countdown, setCountdown] = useState(delay);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (countdown > 0) {
//         setCountdown(countdown - 1);
//       } else {
//         clearInterval(timer);
//         if (countdown === 0) {
//           callback();
//         }
//       }
//     }, 1000);

//     return () => clearInterval(timer);  

//   }, [countdown]);

export default Timer;
