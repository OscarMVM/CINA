import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Inicio from './Inicio';
import Cina from './Cina';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cina" element={<Cina />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;