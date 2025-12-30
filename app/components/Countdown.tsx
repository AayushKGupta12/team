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

// ✅ ADD THESE TYPES
interface CountdownItemProps {
  unit: "Day" | "Hour" | "Minute" | "Second";
  text: string;
}

interface TimerReturn {
  ref: React.RefObject<HTMLSpanElement>;
  time: number;
}

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

const CountdownItem = ({ unit, text }: CountdownItemProps) => {
  const { ref, time } = useTimer(unit);

  return (
    <div className="flex items-center space-x-1">
      <span ref={ref} className={valueClasses} aria-live="polite">
        {time.toString().padStart(2, "0")}
      </span>
      <span className={labelClasses}>{text}</span>
    </div>
  );
};

function computeUnitTime(unit: "Day" | "Hour" | "Minute" | "Second", nowMs = Date.now(), targetIso = COUNTDOWN_FROM_ISO): number {
  const end = new Date(targetIso).getTime();
  const distance = Math.max(0, end - nowMs);

  if (unit === "Day") {
    return Math.floor(distance / DAY);
  } else if (unit === "Hour") {
    return Math.floor((distance % DAY) / HOUR);
  } else if (unit === "Minute") {
    return Math.floor((distance % HOUR) / MINUTE);
  } else {
    return Math.floor((distance % MINUTE) / SECOND);
  }
}

const useTimer = (unit: "Day" | "Hour" | "Minute" | "Second"): TimerReturn => {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef(0);

  const [time, setTime] = useState(() => {
    const initial = computeUnitTime(unit);
    timeRef.current = initial;
    return initial;
  });

  useEffect(() => {
    const tickOnce = () => {
      const newTime = computeUnitTime(unit);
      if (newTime !== timeRef.current) {
        timeRef.current = newTime;
        setTime(newTime);
      }
    };

    tickOnce();

    intervalRef.current = setInterval(() => {
      handleCountdown();
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [unit]);

  const handleCountdown = async () => {
    const newTime = computeUnitTime(unit);

    if (newTime !== timeRef.current) {
      try {
        if (ref && ref.current) {
          await animate(ref.current, { y: ["0%", "-50%"], opacity: [1, 0] }, { duration: 0.25 });
        }
      } catch (e) {}

      timeRef.current = newTime;
      setTime(newTime);

      try {
        if (ref && ref.current) {
          await animate(ref.current, { y: ["50%", "0%"], opacity: [0, 1] }, { duration: 0.25 });
        }
      } catch (e) {}
    }
  };

  return { ref, time };
};

export default Countdown;
