import React, { useState, useEffect } from 'react';

export default function AutomaticDate() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }));
  }, []);

  return <div style={{ color: '#7e9eab', fontWeight: '500', fontSize: '18px', paddingLeft: '10px' }}>{currentDate}</div>;
}

