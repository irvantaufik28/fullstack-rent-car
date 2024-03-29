import React, { useState, useEffect } from 'react';
import '../styles/paymentreminder.css'
export default function PaymentReminder (props) {
  const [time, setTime] = useState(0);
  const [deadlineTime, setDeadlineTime] = useState('');

  useEffect(() => {
    const createdAt = new Date(props.data.createdAt).getTime();
    const currentTime = new Date().getTime();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const timeDifference = currentTime - createdAt;
    const remainingTime = oneDayInMilliseconds - timeDifference;
    const deadlinePayment = createdAt + oneDayInMilliseconds;

    const date = new Date(deadlinePayment);
    const dayOfWeek = date.toLocaleDateString('id-ID', { weekday: 'long' });
    const dayOfMonth = date.getDate();
    const month = date.toLocaleDateString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    const hour = date.getHours(); 
    const minute = date.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year} jam ${hour}.${minute} WIB`;
  
    setTime(remainingTime);
    setDeadlineTime(formattedDate);

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1000);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [props.data.createdAt]);

  const formatTime = (time) => {
    if (time <= 0) {
      return '00:00:00';
    }

    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='row'>
    <div className='col-md-6'>
      <div className='reminder-title'>
        <h5 className='title'>Selesaikan pembayaran sebelum</h5>
        <h5 className='date'>{deadlineTime}</h5>
      </div>
    </div>
    <div className='col-md-6'>
      <div className="countdown">
        <span className="time-block">{formatTime(time).split(":")[0]}</span>
        <span>:</span>
        <span className="time-block">{formatTime(time).split(":")[1]}</span>
        <span>:</span>
        <span className="time-block">{formatTime(time).split(":")[2]}</span>
      </div>
    </div>
  </div>
  );
}
