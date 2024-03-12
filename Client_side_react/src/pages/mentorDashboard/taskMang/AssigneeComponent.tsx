import { Card } from '@material-tailwind/react';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import RadioButton from './RadioButton';

const AssigneeComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left pl-14 z-[999999999]">
      <div>
        <button className="" onClick={toggleCard}>
          <img src="/assets/icons/personne2.svg" className='h-5 w-5' alt="Person Icon" />
        </button>
      </div>

      {isOpen && (
        <Card className="absolute   rounded-md bg-white shadow-lg ring-2 ring-black ring-opacity-5 focus:outline-none" style={{ width: '450px', height: '1000%', boxShadow: '1px 2px 9px #0000003D' }}>
          <div className="py-1">
            <SearchBar />
            <RadioButton />
          </div>
        </Card>
      )}
    </div>
  );
};

export default AssigneeComponent