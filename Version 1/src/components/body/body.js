import React, { useRef, useEffect, useState } from "react";
import Moveable from "react-moveable";
import "./body.styles.css";
import KeyController from "keycon";
import { setAlias, Frame } from "scenejs";

import ReactHtmlParser from "react-html-parser";
import * as d3 from "d3";

setAlias("tx", ["transform", "translateX"]);
setAlias("ty", ["transform", "translateY"]);
setAlias("tz", ["transform", "translateZ"]);
setAlias("rotate", ["transform", "rotate"]);
setAlias("sx", ["transform", "scaleX"]);
setAlias("sy", ["transform", "scaleY"]);
setAlias("matrix3d", ["transform", "matrix3d"]);

const Body = ({ svgColorObj, svgLogo }) => {
  const moveable = useRef(null);
  const ref = useRef();
  const [target, setTarget] = useState(null);
  const [svgColorState, setSvgColorState] = useState();
  const [zoom, setZoom] = React.useState(1);
  const [icon, setIcon] = useState();
  const [itemMap, setItemMap] = useState(new Map());
  const [item, setItem] = useState();
  const [id, setId] = useState(null);
  const [pixel, setPixel] = useState(0);
  const [count, setCount] = useState(1);
  const increment = 5;
  const str = `
  <svg
  id="logo-svg"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 300 300"
          enable-background="new 0 0 600 600"
          style="background-color:white"
        >
  <path
    data-target="path1"
    id="path1"
    d="M 74 53.64101615137753 L 14.000000000000027 88.28203230275507 L 14 19 L 74 53.64101615137753 Z"
    fill="#f55"
    stroke-Linejoin="round"
    stroke-Width="8"
    opacity="1"
    stroke="#5f5"
    origin="50% 50%"
  />
  <path
    data-target="path2"
    id="path2"
    d="M 84 68.64101615137753 L 24.00000000000003 103.28203230275507 L 24 34 L 84 68.64101615137753 Z"
    fill="red"
    stroke-Linejoin="round"
    stroke-Width="8"
    opacity="1"
    stroke="#333"
    origin="50% 50%"
  />
  <g style="transform: translate(40px, 10px)" >
    <path
      data-target="pathline"
      id="pathline"
      d="M3,19.333C3,17.258,9.159,1.416,21,5.667
                            c13,4.667,13.167,38.724,39.667,7.39"
      fill="transparent"
      stroke="#FFB830"
    />
    <ellipse
      data-target="ellips"
      id="ellips"
      cx="40"
      cy="80"
      rx="40"
      ry="10"
      
        fill="yellow"
        stroke= "purple"
        stroke-Width= "2"
    
    />
  </g>
  </svg>`;

  const [svgCanvas, setSvgCanvas] = useState(str);

  let iconnn = `
  <path
    data-target="path3"
    id="path3"
    d="M 74 53.64101615137753 L 14.000000000000027 88.28203230275507 L 14 19 L 74 53.64101615137753 Z"
    fill="blue"
    stroke-Linejoin="round"
    stroke-Width="10"
    opacity="1"
    stroke="#5f5"
    origin="50% 50%"
  />`;
  var stringToHTML = function (str) {
    console.log("FUnction Called");
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body.firstChild;
  };

  useEffect(() => {
    if (svgLogo) {
      console.log("Render if 1st condition > ", svgLogo);
      if (icon !== svgLogo) {
        console.log("Render if 2nd condition > ", svgLogo);
        setIcon(svgLogo);
        const sv = document.getElementById("logo-svg");
        const svg = d3.select("#logo-svg");
        const i = stringToHTML(iconnn);
        console.log("Icon selected is >>", i);
        // svg.node().append(i);
        console.log("after appending child >>> ", sv.attributes);

        setSvgCanvas(
          `<svg 
          id="logo-svg"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 300 300"
          enable-background="new 0 0 600 600"
          style="background-color:white"
          > ${svg.html()} ${svgLogo}  </svg>`
        );

        console.log("ViewBox attribute is >> ", sv.getAttribute("viewBox"));
      }
    }
  }, [svgLogo]);
  useEffect(() => {
    console.log("Logo  CANVAS >>> ", svgCanvas);
  }, [svgCanvas]);

  // Layering Concept:
  // useEffect(() => {
  //   const svg = d3.select("#logo-svg");
  //   svg.select(`#${id}`).raise();
  // }, [id, target]);
  const forward = () => {
    if (id) {
      console.log("Farwar Clicked");
      const svg = d3.select("#logo-svg");
      svg.select(`#${id}`).raise();
    }
  };
  const backward = () => {
    if (id) {
      console.log("Backward Clicked");
      const svg = d3.select("#logo-svg");
      svg.select(`#${id}`).lower();
    }
  };
  const Deleted = () => {
    if (id) {
      console.log("Delete Clicked");
      const svg = d3.select("#logo-svg");
      svg.select(`#${id}`).remove();
      setId(null);
      setTarget(null);
    }
  };
  const Duplicate = () => {
    if (id) {
      console.log("Duplicate Clicked");
      const svg = d3.select("#logo-svg");
      const clon = svg.select(`#${id}`);
      const cln = document.getElementById(`${id}`);
      console.log("CLoned ELement is > ", cln);

      clon
        .clone()
        .style(
          "transform",
          `translateZ(5px) translateX(${
            parseInt(item.get("tx")) + pixel
          }px) translateY(${
            parseInt(item.get("ty")) + pixel
          }px) rotate(${item.get("rotate")}) scaleX(${item.get(
            "sx"
          )}) scaleY(${item.get("sy")})`
        )
        .attr("data-target", `${id + count}`)
        .attr("id", `${id + count}`);
      duplicateMap(id + count, item);
      // .attr("translateY", `${parseInt(item.get("ty")) + 15}px`);
      setCount(count + 1);
    }
  };

  // This function will create duplicate Map(That reserve its state as the parent has but with unique id) for duplicate created element
  const duplicateMap = (el, frm) => {
    setItemMap(
      (prev) =>
        new Map([
          ...prev,
          [
            el,
            new Frame({
              tz: frm.get("tz"),
              tx: `${parseInt(frm.get("tx")) + pixel}px`,
              ty: `${parseInt(frm.get("ty")) + pixel}px`,
              rotate: frm.get("rotate"),
              sx: frm.get("sx"),
              sy: frm.get("sy"),
            }),
          ],
        ])
    );
    setPixel(pixel + increment);
  };

  useEffect(() => {
    if (svgLogo !== icon) {
      setIcon(svgLogo);
    }
  }, [svgLogo]);
  console.log("Our original Canvas is>> ", svgCanvas);

  console.log("Update Canvas is >> ", icon);
  useEffect(() => {
    if (!itemMap.get(id)) {
      setItm(id);
      console.log("ItemMap in EffectState is  > ", id);
    }
  }, [id]);

  useEffect(() => {
    setItem(() => itemMap.get(id));
  }, [id, itemMap]);
  console.log("item = ", item);
  useEffect(() => {
    const keycon = new KeyController(window);
    let requester = null;
    keycon
      .keydown("delete", (e) => {
        Deleted();
        console.log("keydown delete >  ");
        e.inputEvent.preventDefault();
      })
      .keydown("right", (e) => {
        moveable.current?.request(
          "draggable",
          { deltaX: 0.5, deltaY: 0 },
          true
        );
        console.log("keydown right 659 >  ");
        e.inputEvent.preventDefault();
      })
      .keydown("left", (e) => {
        moveable.current?.request(
          "draggable",
          { deltaX: -0.5, deltaY: 0 },
          true
        );

        console.log("keyStrock left >> 82", e);
        e.inputEvent.preventDefault();
      })
      .keydown("down", (e) => {
        moveable.current?.request(
          "draggable",
          { deltaX: 0, deltaY: 0.5 },
          true
        );

        e.inputEvent.preventDefault();
      })
      .keydown("s", (e) => {
        Duplicate();
        e.inputEvent.preventDefault();
      })
      .keydown("up", (e) => {
        moveable.current?.request(
          "draggable",
          { deltaX: 0, deltaY: -0.5 },
          true
        );
        e.inputEvent.preventDefault();
      })

      .keydown("r", (e) => {
        if (!requester) {
          requester = moveable.current?.request("rotatable");
        }
        requester.request({ deltaRotate: 0.5 }, true);
        console.log("Rotate>>>>  ", requester);
        e.inputEvent.preventDefault();
      })
      .keyup("r", (e) => {
        if (requester) {
          requester.requestEnd();
          requester = null;
        }
      })
      .keydown("t", (e) => {
        if (!requester) {
          requester = moveable.current?.request("rotatable");
        }
        requester.request({ deltaRotate: -0.5 }, true);
        console.log("Rotate>>>>  ", requester);
        e.inputEvent.preventDefault();
      })
      .keyup("t", (e) => {
        if (requester) {
          requester.requestEnd();
          requester = null;
        }
      })
      .keydown("a", (e) => {
        console.log("INside A");
        moveable.current?.request(
          "scalable",
          { deltaWidth: 0.5, deltaHeight: 0.5 },
          true
        );

        e.inputEvent.preventDefault();
      })
      .keydown("d", (e) => {
        console.log("INside I");
        moveable.current?.request(
          "scalable",
          { deltaWidth: -0.5, deltaHeight: -0.5 },
          true
        );

        e.inputEvent.preventDefault();
      });
  });
  const setItm = (el) => {
    setItemMap(
      (prev) =>
        new Map([
          ...prev,
          [
            el,
            new Frame({
              tz: "5px",
              tx: "1px",
              ty: "1px",
              rotate: "0deg",
              sx: 1,
              sy: 1,
            }),
          ],
        ])
    );
  };

  const onClick = (e) => {
    if (e.target.nodeName === "INPUT" || e.target.isContentEditable) {
      console.log("line 193  INPUT");
      return;
    }
    console.log(">>>>>>>>> >>>>> >>> ", moveable.current?.isDragging());
    if (moveable.current?.isDragging()) {
      console.log("line 197  isDragging");
      return;
    }
    // console.log("nop");
    const targ = e.target;
    console.log("e.target = ", e.target);
    const idd = targ.getAttribute("data-target");
    // e.target.style.transform = "translate(0px,0px)";
    e.preventDefault();
    console.log("e.target = 2 ", e.target);
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (!idd) {
      console.log("Target is >> 209", id);
      setTarget(null);
      setId(null);
      setPixel(0);
      return;
    }
    if (!moveable.current?.isMoveableElement(e.target)) {
      if (target === e.target) {
        console.log("inside 222 > ");
        moveable.current?.updateRect();
      } else {
        const nativeEvent = e.nativeEvent;
        setTarget(() => e.target);
        setId(() => idd);
        setPixel(increment);
        console.log(" << >>> Set Target 89  >> ", e.target);
        moveable.current?.dragStart(nativeEvent);
      }
    }
  };
  useEffect(() => {
    if (svgColorObj !== svgColorState) {
      let { strokeColor, logoFill, bgColor } = svgColorObj;
      setEllipse(strokeColor, logoFill);
      setBackground(bgColor);
      setSvgColorState(svgColorObj);
    }
  }, [svgColorObj]);

  const setEllipse = (strokeColor, logoFill) => {
    d3.select(`#${id}`).attr("stroke", strokeColor).attr("fill", logoFill);
  };
  const setBackground = (color) => {
    let logoSVG = document.getElementById("logo-svg");
    // let rect = logoSVG.querySelector("rect");
    logoSVG.style.fill = color;
  };
  const downlaodImage = () => {
    console.log("Donload Image");
    let svg = document.getElementById("logo-svg");
    var svgSize = svg.getBoundingClientRect();
    var svgData = new XMLSerializer().serializeToString(svg);

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    var img = document.createElement("img");

    var svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));
    console.log("data:image/svg+xml;base64," + btoa(svgData));
    img.onload = function () {
      console.log("INside Onload");
      ctx.drawImage(img, 0, 0);
      var imgsrc = canvas.toDataURL("image/png");
      let a = document.getElementById("downloadLinkForImage");
      a.href = imgsrc;
      a.download = "react-logo.png";
    };
  };
  const downloadSVG = () => {
    let logoSVG = document.getElementById("logo-svg");
    let svgData = logoSVG.outerHTML;
    let svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    let svgUrl = URL.createObjectURL(svgBlob);
    let downloadLink = document.getElementById("downloadLink");
    downloadLink.href = svgUrl;
    downloadLink.download = "react-logo.svg";
  };

  return (
    <div className="body">
      <Moveable
        target={target} // ok
        ref={moveable} // this is for group
        keepRatio={false} //ok
        origin={true} // for resize
        originDraggable={true}
        dragArea={true} //ok
        draggable={true} //ok
        scalable={true} //ok
        rotatable={true} //ok
        throttleDrag={0.001} //ok
        throttleScale={0.001} //ok
        onRotateStart={({ set }) => {
          const rotate = parseFloat(item?.get("rotate")) || 0;
          set(rotate);
        }}
        onRotate={({ target, beforeRotate, currentTarget }) => {
          item?.set("rotate", `${beforeRotate}deg`);
          console.log(
            "inside moveable 88 > ",
            currentTarget.getRect().rotation
          );
          target.style.cssText += item?.toCSS();
        }}
        //checked
        onDragStart={({ set }) => {
          console.log("TX value onDrageStart > ", item?.get("tx"));
          const tx = parseFloat(item.get("tx")) || 0;
          const ty = parseFloat(item.get("ty")) || 0;
          set([tx, ty]);
        }}
        onDrag={({ target, beforeTranslate }) => {
          item.set("tx", `${beforeTranslate[0]}px`);
          item.set("ty", `${beforeTranslate[1]}px`);
          // target!.style.left = `${left}px`;
          // target!.style.top = `${top}px`;
          target.style.cssText += item.toCSS();
        }}
        onDragEnd={({ lastEvent }) => {
          console.log(" last 106 ", lastEvent);
        }}
        onScaleStart={({ set, dragStart }) => {
          // setOrigin(["%", "%"]);
          const sx = parseFloat(item.get("sx")) || 0;
          const sy = parseFloat(item.get("sy")) || 0;
          const tx = parseFloat(item.get("tx")) || 0;
          const ty = parseFloat(item.get("ty")) || 0;
          set([sx, sy]);
          dragStart && dragStart.set([tx, ty]);
        }}
        onScale={({ target, scale, drag }) => {
          // setOrigin(["%", "%"]);
          item.set("sx", scale[0]);
          item.set("sy", scale[1]);
          item.set("tx", `${drag.beforeTranslate[0]}px`);
          item.set("ty", `${drag.beforeTranslate[1]}px`);
          target.style.cssText += item.toCSS();
        }}
        onDragOriginStart={(e) => {
          const tx = parseFloat(item.get("tx")) || 0;
          const ty = parseFloat(item.get("ty")) || 0;
          e.dragStart && e.dragStart.set([tx, ty]);
        }}
        onDragOrigin={({ target, drag, origin }) => {
          item.set("tx", `${drag.beforeTranslate[0]}px`);
          item.set("ty", `${drag.beforeTranslate[1]}px`);
          item.set("transform-origin", `${origin[0]}px ${origin[1]}px`);
          target.style.cssText += item.toCSS();
        }}
      />
      {/* <div > */}
      {/* {ReactHtmlParser(iconnn)} */}
      {console.log("RENDER>>>")}
      <div
        className="svg-container edit-area"
        onMouseDown={(e) => onClick(e)}
        dangerouslySetInnerHTML={{ __html: svgCanvas }}
      />
      {/* </svg> */}
      <div className="downloadLinks">
        <a
          id="downloadLinkForImage"
          className="downloadLink button"
          onClick={downlaodImage}
        >
          Download Image
        </a>
        <a
          id="downloadLink"
          className="downloadLink button"
          onClick={downloadSVG}
        >
          Download SVG
        </a>
      </div>
      {/* </div> */}

      <div className="buttons">
        <button className="layer" onClick={forward}>
          Farward
        </button>
        <button className="layer" onClick={backward}>
          Backword
        </button>
        <button className="layer" onClick={Duplicate}>
          Duplicate
        </button>

        <button id="del" onClick={Deleted}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Body;
