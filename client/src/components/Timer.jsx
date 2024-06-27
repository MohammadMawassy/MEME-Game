import React, { useState, useEffect } from "react";
// import { MatchAlert } from "./LayoutAlerts";

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

export default Timer;
