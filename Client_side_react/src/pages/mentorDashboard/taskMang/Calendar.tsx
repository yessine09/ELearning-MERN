import { Card } from '@material-tailwind/react';
import React, { useState } from 'react';
import MiniCalendar from './MiniCalendar';
interface ICalendarProps {
  setDate: any;
  date: any;
  selectRange: boolean;
  setSelectRange: any;
}

const Calendar = (props: ICalendarProps) => {
  const { setDate, date, selectRange, setSelectRange } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left pl-4 z-[99999999999]">
      <div>
        <button className="" onClick={toggleCard}>
          <img src="/assets/icons/calendar.svg" className='w-6 h-6' alt="Calendar  Icon" />
        </button>
      </div>

      {isOpen && (
        <input className="absolute   rounded-md bg-white shadow-lg ring-2 ring-black ring-opacity-5 focus:outline-none" type="date" />
      )}
    </div>
  );
};

export default Calendar