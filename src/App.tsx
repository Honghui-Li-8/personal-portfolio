import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./tabs/Home";
import About from "./tabs/About";
import NotFound from "./tabs/NotFound";
import BackGround from "./components/BackGround/BackGround";
import { ColorContext } from "./contexts/BgColorProvider";

const App: React.FC = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
