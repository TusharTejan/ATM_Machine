import React, { useState } from 'react';
import axios from 'axios';
import './Withdraw.css';

function Withdraw() {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handleWithdraw = () => {
    axios.post('http://localhost:5000/api/withdraw', { amount })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage("There was an error processing your request.");
        console.error("There was an error withdrawing the amount!", error);
      });
  };

  return (
    <div className="withdraw-container">
      <h2>Withdraw Money</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleWithdraw}>Withdraw</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Withdraw;
