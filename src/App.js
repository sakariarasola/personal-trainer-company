import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'react-table/react-table.css';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';

export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>{' '}
          <Link to="/customers">Customers</Link>{' '}
          <Link to="/trainings">Trainings</Link>{' '}
          <Routes>
            <Route path="/" element={<h1>Welcome!</h1>} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/trainings" element={<TrainingList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}