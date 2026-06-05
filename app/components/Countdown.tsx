"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

interface CountdownProps {
  /** The target ISO 8601 timestamp string (e.g., "2026-08-30T00:00:00.000Z") */
  targetDate: string;
  /** Custom background color class string (Optional - defaults to original indigo) */
  backgroundColor?: string;
  /** Optional header title text to display beside or above the countdown */
  title?: string;
}

const Countdown = ({ targetDate, backgroundColor = "bg-[#4f46e5]", title }: CountdownProps) => {
  return (
    <div className={`w-full py-4 px-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 rounded-b-4xl text-center md:text-left ${backgroundColor}`}>
      {title && (
        <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider opacity-90">
          {title}
        </span>
      )}
      <div className={containerClasses}>
        <CountdownItem unit="Day" text="days" targetDate={targetDate} />
        <CountdownItem unit="Hour" text="hours" targetDate={targetDate} />
        <CountdownItem unit="Minute" text="minutes" targetDate={targetDate} />
        <CountdownItem unit="Second" text="seconds" targetDate={targetDate} />
      </div>
    </div>
  );
};

const CountdownItem = ({ unit, text, targetDate }: { unit: string; text: string; targetDate: string }) => {
  const { ref, time } = useTimer(unit, targetDate);

  return (
    <div className="flex items-center space-x-1">
      <span ref={ref} className={valueClasses} aria-live="polite">
        {time}
      </span>
      <span className={labelClasses}>{text}</span>
    </div>
  );
};

function computeUnitTime(unit: string, nowMs: number, targetIso: string) {
  const end = new Date(targetIso).getTime();
  const distance = Math.max(0, end - nowMs);

  if (unit === "Day") return Math.floor(distance / DAY);
  if (unit === "Hour") return Math.floor((distance % DAY) / HOUR);
  if (unit === "Minute") return Math.floor((distance % HOUR) / MINUTE);
  return Math.floor((distance % MINUTE) / SECOND);
}

const useTimer = (unit: string, targetDate: string) => {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef(0);

  const [time, setTime] = useState(() => {
    const initial = computeUnitTime(unit, Date.now(), targetDate);
    timeRef.current = initial;
    return initial;
  });

  useEffect(() => {
    const tickOnce = () => {
      const newTime = computeUnitTime(unit, Date.now(), targetDate);
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
  }, [unit, targetDate]);

  const handleCountdown = async () => {
    const newTime = computeUnitTime(unit, Date.now(), targetDate);

    if (newTime !== timeRef.current) {
      try {
        if (ref?.current) {
          await animate(ref.current, { y: ["0%", "-50%"], opacity: [1, 0] }, { duration: 0.25 });
        }
      } catch (e) {}

      timeRef.current = newTime;
      setTime(newTime);

      try {
        if (ref?.current) {
          await animate(ref.current, { y: ["50%", "0%"], opacity: [0, 1] }, { duration: 0.25 });
        }
      } catch (e) {}
    }
  };

  return { ref, time };
};

export default Countdown;