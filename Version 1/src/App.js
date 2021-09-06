import React from "react";
import Sidebar from "./components/sidebar/sidebar";
import Body from "./components/body/body";
import "./App.css";
import logo from "./logo.svg";

function App() {
  // console.log("inside app>  logo is >> ", logo);
  const [svgColorObj, setSvgColorObj] = React.useState({
    strokeColor: "",
    logoFill: "",
    bgColor: "",
  });
  const [svgLogo, setSvgLogo] = React.useState(null);
  console.log("Selected Icon is >> ", svgLogo);
  console.log("Final color is " + svgColorObj.strokeColor);

  return (
    <div className="app">
      <div className="side-bar">
        <Sidebar
          svgColorObj={svgColorObj}
          setSvgColorObj={setSvgColorObj}
          setSvgLogo={setSvgLogo}
        />
        {console.log("rerender")}
      </div>
      <div className="main">
        <Body svgColorObj={svgColorObj} svgLogo={svgLogo} />
      </div>
    </div>
  );
}

export default App;
