import React, { useState } from "react";
import { DateRangePicker } from "rsuite";

const Calendar = (props) => {
  const [dateRange, setDateRange] = useState([]);
  const handleDateChange = (value) => {
    setDateRange(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(dateRange);
  };

  return (
    <>
      <div className="description-date">
        <p>Tentukan lama sewa mobil (max. 7 hari) </p>
        {props.message && (
          <div className="alert alert-danger" role="alert">
            {props.message}
          </div>
        )}
      </div>

      <DateRangePicker
        showOneCalendar
        value={dateRange}
        onChange={handleDateChange}
        placeholder={'Pilih tanggal mulai dan tanggal akhir sewa'}
      />
      <div className="grid-input-button">
        <button
          type="submit"
          className="button_car_detail"
          onClick={handleSubmit}

        >
          Lanjutkan Pembayaran
        </button>
      </div>
    </>
  );
};

export default Calendar;
