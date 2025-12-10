import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Inicio from './Inicio';
import Cina from './Cina';
import Graph from './Graph';
import Bar from './Bar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cina" element={<Cina />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/bar" element={<Bar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;