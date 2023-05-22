import React, { useState, useEffect } from 'react';
import '../styles/timer.css'
const Timer = () => {
  const [time, setTime] = useState(86400); // 86400 detik = 1 hari

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>

      <p className="countdown">{formatTime(time)}</p>
    </div>
  );
};

export default Timer;
