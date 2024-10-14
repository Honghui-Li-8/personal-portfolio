import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './tabs/Home';
import About from './tabs/About';
import NotFound from './tabs/NotFound';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/About' element={<About />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
