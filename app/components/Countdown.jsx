"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const COUNTDOWN_FROM_ISO = "2026-01-01T00:00:00.000Z";
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const containerClasses = [
  "flex",
  "flex-wrap",
  "gap-4",
  "sm:gap-6",
  "md:gap-8",
  "text-white",
  "text-sm",
  "sm:text-base",
  "md:text-xl",
  "font-light",
  "tracking-wide",
  "justify-center",
].join(" ");

const valueClasses = ["block", "font-semibold", "text-white", "text-lg", "sm:text-xl", "md:text-2xl"].join(" ");
const labelClasses = ["opacity-90", "text-xs", "sm:text-sm", "md:text-base"].join(" ");

const Countdown = () => {
  return (
    <div className="w-full bg-[#4f46e5] py-4 flex items-center justify-center">
      <div className={containerClasses}>
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
      <span ref={ref} className={valueClasses} aria-live="polite">
        {time}
      </span>

      <span className={labelClasses}>{text}</span>
    </div>
  );
};

export default Countdown;

function computeUnitTime(unit, nowMs = Date.now(), targetIso = COUNTDOWN_FROM_ISO) {
  const end = new Date(targetIso).getTime();
  const distance = Math.max(0, end - nowMs);

  if (unit === "Day") {
    return Math.floor(distance / DAY);
  } else if (unit === "Hour") {
    return Math.floor((distance % DAY) / HOUR);
  } else if (unit === "Minute") {
    return Math.floor((distance % HOUR) / MINUTE);
  } else {
    // Second
    return Math.floor((distance % MINUTE) / SECOND);
  }
}

const useTimer = (unit) => {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef(null);
  const timeRef = useRef(0);

  // initialize state deterministically from current client time
  const [time, setTime] = useState(() => {
    const initial = computeUnitTime(unit);
    timeRef.current = initial;
    return initial;
  });

  useEffect(() => {
    // update immediately on mount in case initial was slightly stale
    const tickOnce = () => {
      const newTime = computeUnitTime(unit);
      if (newTime !== timeRef.current) {
        timeRef.current = newTime;
        setTime(newTime);
      }
    };

    tickOnce();

    // interval to update every second (we compute specific unit inside)
    intervalRef.current = setInterval(() => {
      handleCountdown();
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]); // re-run if unit ever changes

  const handleCountdown = async () => {
    const newTime = computeUnitTime(unit);

    if (newTime !== timeRef.current) {
      // animate out -> update -> animate in
      try {
        // guard: sometimes ref.current may not be a DOM node yet
        if (ref && ref.current) {
          // small exit animation
          await animate(ref.current, { y: ["0%", "-50%"], opacity: [1, 0] }, { duration: 0.25 });
        }
      } catch (e) {
        // ignore animation errors — continue update
      }

      timeRef.current = newTime;
      setTime(newTime);

      try {
        if (ref && ref.current) {
          // enter animation
          await animate(ref.current, { y: ["50%", "0%"], opacity: [0, 1] }, { duration: 0.25 });
        }
      } catch (e) {
        // ignore animation errors
      }
    }
  };

  return { ref, time };
};
