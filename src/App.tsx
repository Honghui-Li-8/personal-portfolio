import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./tabs/Home";
import About from "./tabs/About";
import NotFound from "./tabs/NotFound";
import BackGround from "./components/BackGround/BackGround";
import { ColorContext } from "./contexts/BgColorProvider";
import { useSelector } from "react-redux";
import { RootState } from "./store/datastore";

const pageTransitions = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 1 } },
};

const App: React.FC = () => {
  const activeTab = useSelector((state: RootState) => state.routerState.route);

  const renderComponent = () => {
    switch (activeTab) {
      case "/":
      case "":
      case "Home":
        return <Home />;
      case "About":
        return <About />;
      default:
        return <NotFound />;
    }
  };

  return (
    <>
      <BackGround />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={pageTransitions}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderComponent()}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default App;

{
  /* <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence> */
}
