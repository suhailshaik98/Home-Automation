import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function CalenderAct({selectedDate,onDateChange}) {

  const onChange = (newValue) => {
    onDateChange(newValue);
  };

  return (
    <>
    <div>
      Select the date over here to check the past records
    </div>
    <div>
      <Calendar onChange={onChange} value={selectedDate} />
    </div>
    </>

  );
}
