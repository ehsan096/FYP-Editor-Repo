import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/sidebar";
import Body from "./components/body/body";
import Rightbar from "./components/rightbar/rightbar";
import Header from "./components/header/header";
import "./App.css";

function App() {
  // console.log("inside app>  logo is >> ", logo);
  const [svgColorObj, setSvgColorObj] = React.useState({
    strokeColor: "",
    logoFill: "",
  });
  const [bgColor, setBgColor] = useState("");
  const [svgLogo, setSvgLogo] = React.useState(null);
  const [text, setText] = React.useState("");
  const [hidden, setHidden] = React.useState(false);

  const [svgText, setSvgText] = React.useState({
    type: "",
    FontFamily: "",
    fontSize: 18,
    letterSpacing: 0,
    bold: "",
    italic: "normal",
    underline: false,
    overLine: false,
    lineThrough: false,
    textColor: "black",
    borderColor: "",
    borderWidth: 1,
    lineHeight: 20,
    opacity: 1,
    shadow: false,
    shadowColor: "",
    blurr: 0,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    console.log("Change Occur > ", svgText);
  }, [svgText]);

  console.log("Selected Icon is >> ", svgLogo);
  console.log("Final color is " + svgColorObj.logoFill);

  return (
    <>
      <Header />
      <div className="app">
        <div className="side-bar">
          <Sidebar
            svgColorObj={svgColorObj}
            setSvgColorObj={setSvgColorObj}
            setSvgLogo={setSvgLogo}
            setBgColor={setBgColor}
            setText={setText}
          />
          {console.log("rerender", hidden)}
        </div>
        <div className="main">
          <Body
            svgColorObj={svgColorObj}
            bgColor={bgColor}
            svgLogo={svgLogo}
            text={text}
            setText={setText}
            setHidden={setHidden}
            svgText={svgText}
            setSvgText={setSvgText}
          />
        </div>
        {hidden ? (
          <div className="right-bar">
            <Rightbar svgText={svgText} setSvgText={setSvgText} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
