import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Balance.css';

function Balance() {
  const [balance, setBalance] = useState(0);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/balance')
      .then(response => {
        setBalance(response.data.balance);
        setNotes(response.data.notes);
      })
      .catch(error => {
        console.error("There was an error fetching the balance!", error);
      });
  }, []);

  return (
    <div className="balance-container">
      <h2>Current Balance: ${balance}</h2>
      <div className="notes">
        {Object.entries(notes).map(([denomination, quantity]) => (
          <div key={denomination}>
            {denomination}: {quantity}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Balance;
