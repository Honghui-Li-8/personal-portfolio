import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./tabs/Home";
import About from "./tabs/About";
import NotFound from "./tabs/NotFound";
import BackGround from "./components/BackGround/BackGround";

const App: React.FC = () => {
  const [bgColor, setBgColor] = React.useState("#ffffff");
  const [newbgColor, setNewbgColor] = React.useState("#add8e6");
  const [showTransation, setShowTransition] = React.useState(false);
  const pageTransitions = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -30, transition: { duration: 1 } },
  };
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setNewbgColor("#ffcc99");
        break;
      case "/Home":
        setNewbgColor("#ffcc99");
        break;
      case "/About":
        setNewbgColor("#add8e6");
        break;
      case "Contact":
        setNewbgColor("#ccff99");
        break;
      case "Projects":
        setNewbgColor("#ffcc99");
        break;
      default:
        setNewbgColor("#ffffff");
    }

    triggerAnimation();
  }, [location]);

  const triggerAnimation = () => {
    setShowTransition(true);
  };

  const onBGTransitionEnd = () => {
    console.log("Animation completed!");
    setBgColor(newbgColor);
    setShowTransition(false);
    console.log("new bg");
    console.log(bgColor);
  };

  return (
    <>
      <BackGround
        showTransation={showTransation}
        bgColor={bgColor}
        newbgColor={newbgColor}
        onAnimationEnd={onBGTransitionEnd}
      />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/About"
            element={
              <motion.div
                key={location.pathname}
                variants={pageTransitions}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <About />
              </motion.div>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
