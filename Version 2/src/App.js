import React from "react";
import Sidebar from "./components/sidebar/sidebar";
import Body from "./components/body/body";
import "./App.css";
import logo from "./logo.svg";
import Rightbar from "./components/rightbar/rightbar";

function App() {
  // console.log("inside app>  logo is >> ", logo);
  const [svgColorObj, setSvgColorObj] = React.useState({
    strokeColor: "",
    logoFill: "",
    bgColor: "",
  });
  const [svgLogo, setSvgLogo] = React.useState(null);
  const [companyName, setCompanyName] = React.useState("Comapny Name");
  const [hidden, setHidden] = React.useState(false);
  const [svgText, setSvgText] = React.useState({
    LogoName: "Enter Company Name",
    FontFamily: "",
    circular: false,
    textCurve: "upper",
    xRadius: 40,
    yRadius: 20,
    fontSize: "18",
    letterSpacing: "1",
    bold: "bold",
    italic: "normal",
    underline: "underline",
    textColor: "black",
    borderColor: "",
  });

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
        <Body
          svgColorObj={svgColorObj}
          setSvgColorObj={setSvgColorObj}
          svgLogo={svgLogo}
          companyName={companyName}
          setHidden={setHidden}
          hidden={hidden}
          svgText={svgText}
          setSvgText={setSvgText}
        />
      </div>
      {hidden ? (
        <div className="right-bar">
          <Rightbar
            setCompanyName={setCompanyName}
            svgText={svgText}
            setSvgText={setSvgText}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
