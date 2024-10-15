import React, { createContext, useState, FC, useEffect } from "react";
import {useLocation} from "react-router-dom";

interface ColorContextType {
  bgColor: string;
  setBgColor: (color: string) => void;
}

export const ColorContext = createContext<ColorContextType | undefined>(undefined);

const BgColorProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const location = useLocation();
  
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setBgColor("#ffcc99");
        break;
      case "/About":
        setBgColor("#add8e6");
        break;
      case "Contact":
        setBgColor("#ccff99");
        break;
      case "Projects":
        setBgColor("#ffcc99");
        break;
      default:
        setBgColor("#ffffff");
    }

  }, [location]);

  return (
    <ColorContext.Provider value={{ bgColor, setBgColor }}>
      {children}
    </ColorContext.Provider>
  );
};


export default BgColorProvider;