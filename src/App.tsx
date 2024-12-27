import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./tabs/Home";
import About from "./tabs/About";
import NotFound from "./tabs/NotFound";
import BackGround from "./components/BackGround/BackGround";
import { ColorContext } from "./contexts/BgColorProvider";
import {useSelector} from "react-redux";
import {RootState} from "./store/datastore";

const pageTransitions = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 1 } },
};

const App: React.FC = () => {
  // const [bgColor, setBgColor] = React.useState("#ffffff");
  // const [newbgColor, setNewbgColor] = React.useState("#add8e6");
  // const [showTransaction, setShowTransaction] = React.useState(false);
  const activeTab = useSelector((state: RootState) => state.routerState.route);

  // useEffect(() => {
  //   switch (activeTab) {
  //     case "Home":
  //       setNewbgColor(lightBlue);
  //       break;
  //     case "AboutMe":
  //       setNewbgColor(blue);
  //       break;
  //     case "Contact":
  //       setNewbgColor(green);
  //       break;
  //     case "Projects":
  //       setNewbgColor(orange);
  //       break;
  //     default:
  //       setNewbgColor("#ffffff");
  //   }

  //   triggerAnimation();
  // }, [activeTab]);

  // const updateActiveTab = (tab_name: string) => {
  //   if (bgColor === newbgColor) {
  //     setActiveTab(tab_name);
  //   }
  // };

  // const triggerAnimation = () => {
  //   setShowTransaction(true);
  // };

  // const onBGTransactionEnd = () => {
  //   console.log("Animation completed!");
  //   setBgColor(newbgColor);
  //   setShowTransaction(false);
  //   console.log("new bg");
  //   console.log(bgColor);
  // };


  const renderComponent = () => {
    switch (activeTab) {
      case "Initial":
        return <div />;
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
      <BackGround/>

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
