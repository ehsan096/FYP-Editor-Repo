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

const Body = ({
  svgColorObj,
  setSvgColorObj,
  svgLogo,
  companyName,
  setHidden,
  hidden,
  svgText,
  setSvgText,
}) => {
  const moveable = useRef(null);
  const ref = useRef();
  const [target, setTarget] = useState(null);
  const [svgColorState, setSvgColorState] = useState();
  const [zoom, setZoom] = React.useState(1);
  const [icon, setIcon] = useState();
  const [itemMap, setItemMap] = useState(new Map());
  const [item, setItem] = useState();
  const [id, setId] = useState(null);
  const [innerSvg, setInnerSvg] = useState();
  const [keyPress, setKeyPress] = useState(false);
  const [pixel, setPixel] = useState(0);
  const [sum, setSum] = useState(0);
  const [num, setNum] = useState(0);
  const [count, setCount] = useState(1);
  const increment = 5;
  const r = 40;

  const str = `
  <svg xmlns="http://www.w3.org/2000/svg"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  id="logo-svg"
          x="0px"
          y="0px"
          viewBox="0 0 300 300"
          enable-background="new 0 0 600 600"
          preserveAspectRatio="xMinYMin"
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
  <defs>
  <path d="M20,50a70,40 0 1,1 140,0a70,40 0 1,1 -140,0"
  id="shape"></path>
  </defs>
  
   <text data-target="text" 
   id="text" x="0" y="20"  font-size="18" text-decoration="underline" font-style="italic" font-weight="bold" font-family="Arial" fill="#000080">
   <textpath startOffset="0" data-target="text1" id="text1" xlink:href="#shape">
   Comapnay Name jhsdxzb jYDSHXV HKDFBC JHASBCXN JASHV JYWHSDV YUSDVJH WDFYVJH U  YFDJHV THCG WTHDF WTQDFSHA  UWdfy dXGV
   </textpath>
   </text>
  </svg>`;

  const [svgCanvas, setSvgCanvas] = useState(str);

  const ellipseAttrsToPath = (rx, cx, ry, cy, u) =>
    `M${cx - rx},${cy}a${rx},${ry} 0 1,${u} ${rx * 2},0a${rx},${ry} 0 1,${u} -${
      rx * 2
    },0`;
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

  const undo = async (targ, id, hidden) => {
    const strng = d3.select("#logo-svg").html();
    if (!innerSvg) {
      console.log("undo else If condition");
      setInnerSvg([
        {
          internalSvg: strng,
          targ: targ,
          id: id,
          hidden: hidden,
        },
      ]);
    } else {
      console.log("undo else, ", await d3.select("#logo-svg").html());
      if (innerSvg[num].internalSvg !== strng) {
        console.log("undoooooo num > ", innerSvg);
        setInnerSvg([
          ...innerSvg,
          {
            internalSvg: strng,
            targ: targ,
            id: id,
            hidden: hidden,
          },
        ]);
        setNum(num + 1);
      }
    }
  };

  useEffect(() => {
    console.log("UNdo Num in UseEffect> ", num);
  }, [num]);
  useEffect(() => {
    console.log("num svgText svgColorObj > ");
    undo(target, id, hidden);
  }, [svgText, svgColorObj]);

  useEffect(() => {
    console.log("Undo Updated1");
  }, [svgText, svgColorObj]);

  const undoo = async () => {
    console.log("True outside");
    if (num + 1 === innerSvg.length) {
      undo(target, id, hidden);
      console.log("num inside if > ", num + 1 === innerSvg.length);
      setSvgCanvas(
        `<svg xmlns="http://www.w3.org/2000/svg"
          xmlns:xhtml="http://www.w3.org/1999/xhtml"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          id="logo-svg"
          x="0px"
          y="0px"
          viewBox="0 0 300 300"
          enable-background="new 0 0 600 600"
          preserveAspectRatio="xMinYMin"
          style="background-color:white"
          > ${innerSvg[num].internalSvg}  </svg>`
      );
      setTarget(innerSvg[num - 1].targ);
      setId(innerSvg[num - 1].id);
      setHidden(innerSvg[num - 1].hidden);
      console.log("UNdo Num 1 > ", num - 1);
      setNum((await num) - 1);
    } else if (num > 0) {
      setNum(num - 1);
      setSvgCanvas(
        `<svg xmlns="http://www.w3.org/2000/svg"
          xmlns:xhtml="http://www.w3.org/1999/xhtml"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          id="logo-svg"
          x="0px"
          y="0px"
          viewBox="0 0 300 300"
          enable-background="new 0 0 600 600"
          preserveAspectRatio="xMinYMin"
          style="background-color:white"
          > ${innerSvg[num - 1].internalSvg}  </svg>`
      );
      setTarget(innerSvg[num - 1].targ);
      setId(innerSvg[num - 1].id);
      setHidden(innerSvg[num - 1].hidden);
      console.log("UNdo Num > ", num);
    }
  };
  const redoo = () => {
    if (num < innerSvg.length - 1 && num >= 0) {
      setNum(num + 1);
      console.log("REdo Num > ", num);
      setSvgCanvas(
        `<svg xmlns="http://www.w3.org/2000/svg"
          xmlns:xhtml="http://www.w3.org/1999/xhtml"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          id="logo-svg"
          x="0px"
          y="0px"
          viewBox="0 0 300 300"
          enable-background="new 0 0 600 600"
          preserveAspectRatio="xMinYMin"
          style="background-color:white"
          > ${innerSvg[num + 1].internalSvg}  </svg>`
      );
      setTarget(innerSvg[num + 1].targ);
      setId(innerSvg[num + 1].id);
      setHidden(innerSvg[num + 1].hidden);
    }
  };

  useEffect(() => {
    if (target) {
      moveable.current?.updateRect();
    }
  }, [target]);

  useEffect(() => {
    console.log("Sum is > ", sum);
  }, [sum]);
  useEffect(() => {
    console.log("Undo function  > ", innerSvg);
  }, [innerSvg]);

  var stringToHTML = function (str) {
    console.log("FUnction Called");
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body.firstChild;
  };
  useEffect(() => {
    const svg = d3.select(`#${id}`);
    svg.select("textPath").text(companyName);
  }, [companyName]);

  useEffect(() => {
    if (hidden && id) {
      const txt = d3.select(`#${id}`);
      var LogoName,
        FontFamily,
        circular,
        textCurve,
        xRadius,
        yRadius,
        fontSize,
        letterSpacing,
        bold,
        italic,
        underline,
        textColor,
        borderColor;

      let sv = document.getElementById(`${id}`);
      console.log("Children1 > ", sv.children.length);

      if (sv.children.length > 0) {
        LogoName = txt.select("textPath").text();
        circular = true;

        // xRadius=
        const getId = txt.select("textPath").attr("xlink:href");
        const str = d3.select(`${getId}`).attr("d");
        console.log("string > ", str);
        const curv = parseInt(
          str.match(
            /M\d{2,3}.\d{2,3}.\d{2,3}.\d{2,3}\s\d{1}\s\d{1}. *(\d{1,3})/
          )[1]
        );
        if (curv === 1) {
          textCurve = "upper";
        } else {
          textCurve = "lower";
        }
        console.log("Curve type >", curv);
        xRadius = parseInt(str.match(/M\d{2,3}.\d{2,3}. *(\d{2,3})/)[1]);
        yRadius = parseInt(
          str.match(/M\d{2,3}.\d{2,3}.\d{2,3}. *(\d{2,3})/)[1]
        );
      } else {
        LogoName = txt.text();
        textCurve = "upper";
        circular = false;
        xRadius = 78;
        yRadius = 25;
      }
      txt.attr("font-family")
        ? (FontFamily = txt.attr("font-family"))
        : (FontFamily = "serif");

      txt.attr("font-size")
        ? (fontSize = txt.attr("font-size"))
        : (fontSize = "16");
      txt.attr("letter-spacing")
        ? (letterSpacing = txt.attr("letter-spacing"))
        : (letterSpacing = "1");
      txt.attr("font-weight")
        ? (bold = txt.attr("font-weight"))
        : (bold = "200");
      txt.attr("font-style")
        ? (italic = txt.attr("font-style"))
        : (italic = "normal");
      txt.attr("text-decoration")
        ? (underline = txt.attr("text-decoration"))
        : (underline = "none");
      txt.attr("fill") ? (textColor = txt.attr("fill")) : (textColor = "black");
      txt.attr("stroke")
        ? (borderColor = txt.attr("stroke"))
        : (borderColor = "");

      // set propertes
      setSvgText({
        LogoName,
        FontFamily,
        circular,
        textCurve,
        xRadius,
        yRadius,
        fontSize,
        letterSpacing,
        bold,
        italic,
        underline,
        textColor,
        borderColor,
      });
    }
  }, [id]);

  // This will handle Change of Text editor

  useEffect(() => {
    if (target) {
      if (target.tagName === "text") {
        let txt = d3.select(`#${id}`);
        let sv = document.getElementById(`${id}`);
        console.log("Children > ", sv.children.length);

        if (svgText.circular === true) {
          const txtp = txt.select("textPath");
          console.log("txtp", txt.select("textPath"));
          var curveType = 0;
          if (svgText.textCurve === "upper") {
            curveType = 1;
          }
          const dE = ellipseAttrsToPath(
            svgText.xRadius,
            90,
            svgText.yRadius,
            50,
            curveType
          );

          if (sv.children.length > 0) {
            console.log("Childern > 0");
            const defp = d3.select(txtp.attr("xlink:href"));
            defp.attr("d", dE);
          } else {
            console.log("Childern < 0");
            const svg = d3.select("#logo-svg");
            const t = txt.text();
            svg
              .select("defs")
              .append("path")
              .attr("d", dE)
              .attr("id", `${id}path${+count}`);
            txt.text("");
            txt
              .append("textPath")
              .attr("data-target", `${id + 1}`)
              .attr("id", `${id + 1}`)
              .attr("xlink:xlink:href", `#${id}path${+count}`)
              .text(t);
            setCount(count + 1);
          }
        } else {
          const txtp = txt.select("textPath");
          if (sv.children.length > 0) {
            const t = txtp.text();
            const i = txtp.attr("xlink:href").match(/#*([a-zA-Z0-9]{2,})/)[1];
            const parent = document.getElementById(i);
            d3.select(parent).remove();
            txtp.remove();
            txt.text(t);
          }
          txt.text(svgText.LogoName);
        }
        console.log("textPath removed>>> ", txt.select("textPath"));
        txt
          .attr("font-family", svgText.FontFamily)
          .attr("font-size", svgText.fontSize)
          .attr("letter-spacing", svgText.letterSpacing)
          .attr("font-weight", svgText.bold)
          .attr("font-style", svgText.italic)
          .attr("text-decoration", svgText.underline)
          .attr("fill", svgText.textColor)
          .attr("stroke", svgText.borderColor);
        moveable.current?.updateRect();
      }
    }
  }, [svgText]);

  //------------------------------------================-------------------->

  useEffect(() => {
    console.log(
      "Saved Text ID >  ",
      id,
      " Hidden > ",
      hidden,
      " target > ",
      target
    );
  }, [id]);

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
          `<svg xmlns="http://www.w3.org/2000/svg"
          xmlns:xhtml="http://www.w3.org/1999/xhtml"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          id="logo-svg"
          x="0px"
          y="0px"
          viewBox="0 0 300 300"
          enable-background="new 0 0 600 600"
          preserveAspectRatio="xMinYMin"
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

      console.log("INside Delete > ");
      setHidden(false);
      setTarget(null);
      setId(null);
    }
  };
  const Duplicate = () => {
    if (id) {
      console.log("Duplicate Clicked");
      const svg = d3.select("#logo-svg");
      const clon = svg.select(`#${id}`);
      const cln = document.getElementById(`${id}`);
      console.log("CLoned ELement is > ", cln);

      const c = clon
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
      if (target.tagName === "text") {
        const txtp = clon.select("textPath");

        let sv = document.getElementById(`${id}`);

        if (sv.children.length > 0) {
          const getId = txtp.attr("xlink:href");
          const g = getId.match(/#*([a-zA-Z0-9]{2,})/)[1];
          console.log("svgdef > ", g);

          const defp = svg.select(`#${g}`); // defs path for curve shape
          console.log("svgdef  p> ", defp);
          defp.clone().attr("id", `${g}path${count}`);

          c.append("textPath")
            .attr("data-target", `${id + count + 1}`)
            .attr("id", `${id + count + 1}`)
            .attr("xlink:xlink:href", `${getId}path${count}`)
            .text(clon.text());
        } else {
          c.text(clon.text());
        }
      }

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
      console.log("ItemMap in UseEffect is  > ", id);
    }
  }, [id]);
  useEffect(() => {
    console.log("Item in UseEffect> ", item);
  }, [item ? item.get("tx") : ""]);

  useEffect(() => {
    if (id) {
      setItem(() => itemMap.get(id));
    }
  }, [id, itemMap]);
  console.log("item = ", item);

  // useEffect(() => {
  //   if (id) {
  //     const keycon = new KeyController(window);
  //     let requester = null;

  // keycon
  //   .keydown("delete", (e) => {
  //     if (id) {
  //       Deleted();
  //       console.log("keydown delete >  ");
  //     }

  //     e.inputEvent.preventDefault();
  //   })
  //   .keyup("delete", (e) => {
  //     setSum(sum + 1);
  //     console.log("Deleted");
  //   });
  // .keydown(["alt", "right"], (e) => {
  //   moveable.current?.request(
  //     "draggable",
  //     { deltaX: 0.5, deltaY: 0 },
  //     true
  //   );
  //   console.log("keydown right 659 >  ");
  //   e.inputEvent.preventDefault();
  // })
  // .keyup(["alt", "right"], (e) => {
  //   setSum(sum + 1);
  //   console.log("keyup right 659 >  ");
  //   e.inputEvent.preventDefault();
  // });
  // .keydown(["alt", "left"], (e) => {
  //   moveable.current?.request(
  //     "draggable",
  //     { deltaX: -0.5, deltaY: 0 },
  //     true
  //   );

  //   console.log("keydown left >> 82", e);
  //   e.inputEvent.preventDefault();
  // })
  // .keyup(["alt", "left"], (e) => {
  //   setSum(sum + 1);
  //   console.log("keyup left >  ");
  //   e.inputEvent.preventDefault();
  // });
  // .keydown(["alt", "down"], (e) => {
  //   moveable.current?.request(
  //     "draggable",
  //     { deltaX: 0, deltaY: 0.5 },
  //     true
  //   );

  //   e.inputEvent.preventDefault();
  // })
  // .keyup(["alt", "down"], (e) => {
  //   setSum(sum + 1);
  //   console.log("keyup down  >  ");
  //   e.inputEvent.preventDefault();
  // });
  // .keydown(["alt", "up"], (e) => {
  //   moveable.current?.request(
  //     "draggable",
  //     { deltaX: 0, deltaY: -0.5 },
  //     true
  //   );
  //   console.log("Key UP");
  //   e.inputEvent.preventDefault();
  // })
  // .keyup(["alt", "up"], (e) => {
  //   setSum(sum + 1);
  //   console.log("keyup up  >  ");
  //   e.inputEvent.preventDefault();
  // });

  // .keydown(["alt", "r"], (e) => {
  //   if (!requester) {
  //     requester = moveable.current?.request("rotatable");
  //   }
  //   requester.request({ deltaRotate: 0.5 }, true);
  //   console.log("Rotate>>>>  ", requester);
  //   e.inputEvent.preventDefault();
  // })
  // .keyup(["alt", "r"], (e) => {
  //   if (requester) {
  //     requester.requestEnd();
  //     requester = null;
  //     setSum(sum + 1);
  //   }
  // })
  // .keydown(["alt", "t"], (e) => {
  //   if (!requester) {
  //     requester = moveable.current?.request("rotatable");
  //   }
  //   requester.request({ deltaRotate: -0.5 }, true);
  //   console.log("Rotate>>>>  ", requester);
  //   e.inputEvent.preventDefault();
  // })
  // .keyup(["alt", "t"], (e) => {
  //   if (requester) {
  //     requester.requestEnd();
  //     requester = null;
  //     console.log("Rotate KeyUp t");
  //     setSum(sum + 1);
  //   }
  // });

  // .keydown(["alt", "="], (e) => {
  //   console.log("INside A");
  //   moveable.current?.request(
  //     "scalable",
  //     { deltaWidth: 0.5, deltaHeight: 0.5 },
  //     true
  //   );

  //   e.inputEvent.preventDefault();
  // })
  // .keyup(["alt", "="], (e) => {
  //   setSum(sum + 1);
  //   console.log("Increase scale");
  // })
  // .keydown(["alt", "-"], (e) => {
  //   console.log("INside I");
  //   moveable.current?.request(
  //     "scalable",
  //     { deltaWidth: -0.5, deltaHeight: -0.5 },
  //     true
  //   );

  //   e.inputEvent.preventDefault();
  // })
  // .keyup("-", (e) => {
  //   setSum(sum + 1);
  //   console.log("decrease scale");
  // });
  //   }
  // });

  useEffect(() => {
    function onKeyPress(e) {
      if ((e.metaKey || e.altKey) && e.key === "=") {
        console.log("fire!");
        setKeyPress(true);
        moveable.current?.request(
          "scalable",
          { deltaWidth: 0.5, deltaHeight: 0.5 },
          true
        );
      } else if ((e.metaKey || e.altKey) && e.key === "-") {
        console.log("fire!");
        setKeyPress(true);
        moveable.current?.request(
          "scalable",
          { deltaWidth: -0.5, deltaHeight: -0.5 },
          true
        );
      } else if ((e.metaKey || e.altKey) && e.key === "t") {
        console.log("fire!");
        setKeyPress(true);
        moveable.current?.request("rotatable", { deltaRotate: -0.5 }, true);
      } else if ((e.metaKey || e.altKey) && e.key === "r") {
        console.log("fire!");
        setKeyPress(true);
        moveable.current?.request("rotatable", { deltaRotate: 0.5 }, true);
      } else if ((e.metaKey || e.altKey) && e.keyCode === 38) {
        // Key Up
        console.log("fire!");
        setKeyPress(true);
        moveable.current?.request(
          "draggable",
          { deltaX: 0, deltaY: -0.5 },
          true
        );
      } else if ((e.metaKey || e.altKey) && e.keyCode === 40) {
        // Key Down
        console.log("fire!");
        setKeyPress(true);
        moveable.current?.request(
          "draggable",
          { deltaX: 0, deltaY: 0.5 },
          true
        );
      } else if ((e.metaKey || e.altKey) && e.keyCode === 37) {
        //Left arrow key
        setKeyPress(true);
        moveable.current?.request(
          "draggable",
          { deltaX: -0.5, deltaY: 0 },
          true
        );
      } else if ((e.metaKey || e.altKey) && e.keyCode === 39) {
        // Right Arrow Key
        setKeyPress(true);
        moveable.current?.request(
          "draggable",
          { deltaX: 0.5, deltaY: 0 },
          true
        );
      } else if (e.key === "delete") {
        if (id) {
          setKeyPress(true);
          Deleted();
          console.log("keydown delete >  ");
        }
      }
    }
    if (id) {
      window.addEventListener("keydown", onKeyPress);
      return () => window.removeEventListener("keydown", onKeyPress);
    }
  });

  // Remove Event Listener
  useEffect(() => {
    function onKeyUp(e) {
      if ((e.metaKey || e.altKey) && e.key === "=") {
        console.log("KeyUp =!");
        undo(target, id, hidden);
        setKeyPress(false);
        setSum(sum + 1);
      } else if ((e.metaKey || e.altKey) && e.key === "-") {
        console.log("KeyUp -!");
        undo(target, id, hidden);
        setKeyPress(false);
        setSum(sum + 1);
      } else if ((e.metaKey || e.altKey) && e.key === "t") {
        console.log("Key t!");
        undo(target, id, hidden);
        setKeyPress(false);
        setSum(sum + 1);
      } else if ((e.metaKey || e.altKey) && e.key === "r") {
        console.log("Key r!");
        undo(target, id, hidden);
        setKeyPress(false);
        setSum(sum + 1);
      } else if ((e.metaKey || e.altKey) && e.keyCode === 38) {
        console.log("Key Up!");
        undo(target, id, hidden);
        setKeyPress(false);
        setSum(sum + 1);
      } else if ((e.metaKey || e.altKey) && e.keyCode === 40) {
        console.log("Key Down!");
        undo(target, id, hidden);
        setKeyPress(false);
        setSum(sum + 1);
      } else if ((e.metaKey || e.altKey) && e.keyCode === 37) {
        console.log("Key Left!");
        undo(target, id, hidden);
        setKeyPress(false);
        setSum(sum + 1);
      } else if ((e.metaKey || e.altKey) && e.keyCode === 39) {
        console.log("Key Right!");
        undo(target, id, hidden);
        setKeyPress(false);
        setSum(sum + 1);
      } else if (e.key === "delete") {
        console.log("Key Delete");
        undo(target, id, hidden);
        setKeyPress(false);
        setSum(sum + 1);
      }
    }
    if (id) {
      window.addEventListener("keyup", onKeyUp);
      return () => window.removeEventListener("keyup", onKeyUp);
    }
  });

  // -----------==========-----------

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
    console.log("e.target = ", e.target.parentNode);
    const idd = targ.getAttribute("data-target");
    // e.target.style.transform = "translate(0px,0px)";
    e.preventDefault();

    const clientX = e.clientX;
    const clientY = e.clientY;
    if (!idd) {
      console.log("Target is >> 209", id);
      setTarget(null);
      setId(null);
      setPixel(0);
      setHidden(false);
      return;
    }
    if (!moveable.current?.isMoveableElement(e.target)) {
      if (target === e.target) {
        console.log("inside 222 > ");
        moveable.current?.updateRect();
      } else {
        const nativeEvent = e.nativeEvent;
        console.log("e.target.tagName >>> ", e.target.tagName);
        if (e.target.tagName === "textPath") {
          setTarget(() => e.target.parentNode);

          setId(() => e.target.parentNode.getAttribute("data-target"));
        } else {
          setTarget(() => e.target);

          setId(() => idd);
        }
        setPixel(increment);
        setSvgColorObj({
          strokeColor: "",
          logoFill: "",
        });
        if (e.target.tagName !== "textPath" && e.target.tagName !== "text") {
          setHidden(false);
        } else if (
          e.target.tagName === "textPath" ||
          e.target.tagName === "text"
        ) {
          setHidden(true);
        }

        // console.log("e.target = 2 ", );
        console.log(" << >>> Set Target 89  >> ", e.target.tagName);
        // moveable.current?.dragStart(nativeEvent);
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
    if (strokeColor && logoFill) {
      d3.select(`#${id}`).attr("stroke", strokeColor).attr("fill", logoFill);
    } else if (strokeColor) {
      d3.select(`#${id}`).attr("stroke", strokeColor);
    } else if (logoFill) {
      d3.select(`#${id}`).attr("fill", logoFill);
    }
  };
  const setBackground = (color) => {
    let logoSVG = document.getElementById("logo-svg");
    // let rect = logoSVG.querySelector("rect");
    if (color) {
      logoSVG.style.fill = color;
    }
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
      <div className="buttons">
        <button className="layer" onClick={undoo}>
          UNDO
        </button>
        <button className="layer" onClick={redoo}>
          REDO
        </button>
      </div>
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
        onRotateEnd={({ target, isDrag, clientX, clientY }) => {
          console.log("onRotateEnd", target, isDrag);
          if (!keyPress) {
            undo(target, id, hidden);
          }
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
          console.log(" ON Drag End ", lastEvent);
          if (!keyPress) {
            undo(target, id, hidden);
          }
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
        onScaleEnd={({ target, isDrag, clientX, clientY }) => {
          console.log("onScaleEnd", target, isDrag);
          if (!keyPress) {
            undo(target, id, hidden);
          }
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
        contentEditable="true"
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
