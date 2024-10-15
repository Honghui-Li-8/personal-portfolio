export const pageBgColors: Record<string, string> = {
  "/": "#ffcc99",
  "/About": "#add8e6",
  "/Contact": "#ccff99",
  "/Projects": "#ffcc99",
};

export const defaultColor:string = "#ffcc99";


const getPageBgColor = (pageName:string):string => {
  return pageBgColors[pageName] ?? defaultColor;
}

export default getPageBgColor;