import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './tabs/Home';
import About from './tabs/About';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/About' element={<About />} />
    </Routes>
  );
};

export default App;
