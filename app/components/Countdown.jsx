"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const COUNTDOWN_FROM = "2026-01-01";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Countdown = () => {
  return (
    <div className="w-full bg-[#4f46e5] py-4 flex items-center justify-center">
      <div
        className="
          flex flex-wrap 
          gap-4 
          sm:gap-6 
          md:gap-8 
          text-white 
          text-sm 
          sm:text-base 
          md:text-xl 
          font-light 
          tracking-wide 
          justify-center
        "
      >
        <CountdownItem unit="Day" text="days" />
        <CountdownItem unit="Hour" text="hours" />
        <CountdownItem unit="Minute" text="minutes" />
        <CountdownItem unit="Second" text="seconds" />
      </div>
    </div>
  );
};

const CountdownItem = ({ unit, text }) => {
  const { ref, time } = useTimer(unit);

  return (
    <div className="flex items-center space-x-1">
      <span
        ref={ref}
        className="
          block 
          font-semibold 
          text-white 
          text-lg 
          sm:text-xl 
          md:text-2xl
        "
      >
        {time}
      </span>

      <span className="opacity-90 text-xs sm:text-sm md:text-base">
        {text}
      </span>
    </div>
  );
};

export default Countdown;

const useTimer = (unit) => {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = +end - +now;

    let newTime = 0;

    if (unit === "Day") {
      newTime = Math.floor(distance / DAY);
    } else if (unit === "Hour") {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === "Minute") {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.3 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.3 }
      );
    }
  };

  return { ref, time };
};
