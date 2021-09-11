import React from "react";
import "./sidebar.styles.css";
import Colors from "../data/color";
import logos from "../data/logo";
// import icon1 from "../data/icon1.svg";
// import Colorbutton from '../colorButton/colorbutton';

import ReactHtmlParser from "react-html-parser";

const Sidebar = ({ svgColorObj, setSvgColorObj, setSvgLogo, setBgColor }) => {
  const [colorType, setColorType] = React.useState("");
  // const [logo, setLogo] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  React.useEffect(() => setColors(Colors), []);
  // React.useEffect(() => setLogo(logos), []);
  // console.log("Here is logo list ", logo);
  const onClickOptionHandler = (e) => {
    let selectedColor = e.target.style.backgroundColor;
    // console.log("Selected color is    >  " + selectedColor);
    if (colorType === "bgColor") {
      setBgColor(selectedColor);
      console.log("ColorEhsan > 1 ", selectedColor);
    } else {
      setSvgColorObj({
        ...svgColorObj,
        [colorType]: selectedColor,
      });
    }
  };
  return (
    <div className="parent">
      <div className="left-bar">
        <div
          className="option"
          onClick={() => {
            setColorType("logoFill");
          }}
        >
          Logo Color
        </div>
        <div
          className="option"
          onClick={() => {
            setColorType("icons");
          }}
        >
          Icons
        </div>
        <div
          className="option"
          onClick={() => {
            setColorType("strokeColor");
          }}
        >
          border Color
        </div>
        <div className="option">SHAPE</div>
        <div
          className="option"
          onClick={() => {
            setColorType("bgColor");
          }}
        >
          BACKGROUND
        </div>
        <div className="option">Setting</div>
      </div>
      <div className="sidebar">
        <h2>
          {colorType === "logoFill"
            ? "Logo Colors"
            : colorType === "bgColor"
            ? "Background Color"
            : colorType === "strokeColor"
            ? "Border Color"
            : "Icons"}
        </h2>
        {colorType === "icons" ? (
          <div className="icons">
            {logos.map((logo) => {
              return (
                <span
                  className="icon"
                  key={logo.icon}
                  onClick={() => setSvgLogo(logo.icon)}
                >
                  <svg
                    fill="#000000"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    width="64px"
                    height="64px"
                  >
                    {ReactHtmlParser(logo.icon)} ;
                  </svg>
                </span>
              );
            })}
          </div>
        ) : (
          <ul>
            {colors.map((color) => {
              return (
                <div id="top" key={color.clr}>
                  {/* {console.log("options are " + color.clr)} */}

                  <li
                    style={{ backgroundColor: color.clr }}
                    onClick={(e) => onClickOptionHandler(e)}
                  ></li>
                </div>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
