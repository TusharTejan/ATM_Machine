import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Balance from './components/Balance';
import Withdraw from './components/Withdraw';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>ATM Machine</h1>
        <Routes>
          <Route path="/balance" element={<Balance />} />
          <Route path="/withdraw" element={<Withdraw />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
