import React, {useEffect, useState} from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './tabs/Home';
import About from './tabs/About';
import NotFound from './tabs/NotFound';
import BackGround from './components/BackGround/BackGround';

const App: React.FC = () => {
  const [bgColor, setBgColor] = React.useState("#ffffff");
  const [newbgColor, setNewbgColor] = React.useState("#add8e6");
  const [showTransation, setShowTransition] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setNewbgColor('#ffcc99');
        break
      case '/Home':
        setNewbgColor('#ffcc99');
        break;
      case '/About':
        setNewbgColor('#add8e6');
        break;
      case 'Contact':
        setNewbgColor('#ccff99');
        break;
      case 'Projects':
        setNewbgColor('#ffcc99');
        break;
      default:
        setNewbgColor('#ffffff');
    }

    triggerAnimation();
  }, [location])

  const triggerAnimation = () => {
    setShowTransition(true);
  };
  
  const onBGTransitionEnd = () => {
    console.log('Animation completed!');
    setBgColor(newbgColor);
    setShowTransition(false);
    console.log('new bg');
    console.log(bgColor);
  };

  return (
    <>  
    <BackGround showTransation={showTransation} bgColor={bgColor} newbgColor={newbgColor} onAnimationEnd={onBGTransitionEnd}/>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/About' element={<About />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
};

export default App;
