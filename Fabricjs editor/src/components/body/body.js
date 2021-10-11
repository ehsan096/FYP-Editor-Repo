import React, { useEffect, useState, useRef } from "react";
import "./body.styles.css";
import { saveAs } from "file-saver";
import { fabric } from "fabric";
import "fabric-history";

const Body = ({
  svgColorObj,
  bgColor,
  svgLogo,
  text,
  setText,
  setHidden,
  svgText,
  setSvgText,
}) => {
  const [canvas, setCanvas] = useState(false);
  const [textId, settextId] = useState(null);
  // const [textProp, setTextProp] = useState({});
  const textProp = useRef(null);
  const [originalCanvas, setOriginalCanvas] = useState(null);
  const [count, setCount] = useState(11);
  // const [group, setGroup] = useState(false);

  const jsonn = `
  {"version":"4.6.0","objects":[{"type":"rect","version":"4.6.0","originX":"left","originY":"top","left":66.55,"top":62.86,"width":271.07,"height":174.33,"fill":"rgb(216,216,216)","stroke":"","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"ellipse","version":"4.6.0","originX":"left","originY":"top","left":108.69,"top":105.96,"width":179.12,"height":88.12,"fill":"rgb(41,3,3)","stroke":"","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":89.559,"ry":44.061},{"type":"i-text","version":"4.6.0","originX":"left","originY":"top","left":135.74,"top":142.74,"width":134.29,"height":18.08,"fill":"rgb(255,255,255)","stroke":"","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Arial, sans-serif","fontWeight":"normal","fontSize":16,"text":"Muhammad Ehsan","underline":false,"overline":false,"linethrough":false,"textAlign":"left","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":{},"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left"},{"type":"i-text","version":"4.6.0","originX":"left","originY":"top","left":103.91,"top":243.61,"width":193.63,"height":30.28,"fill":"rgb(199,23,23)","stroke":"","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":0.7,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Arial, sans-serif","fontWeight":"normal","fontSize":26.8,"text":"Comapny Name","underline":false,"overline":false,"linethrough":true,"textAlign":"left","fontStyle":"italic","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":{},"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left"}]}
  `;

  // const CanvasRef = useRef();
  // const [ref, setRef] = useRef();
  const str = `
      <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="400" height="300" viewBox="0 0 400 300" xml:space="preserve">
  <desc>Created with Fabric.js 4.6.0</desc>
  <defs>
  </defs>
  <g transform="matrix(1 0 0 1 202.59 150.52)"  >
  <rect style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(216,216,216); fill-rule: nonzero; opacity: 1;"  x="-135.5365" y="-87.165" rx="0" ry="0" width="271.073" height="174.33" />
  </g>
  <g transform="matrix(1 0 0 1 198.75 150.52)"  >
  <ellipse style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(41,3,3); fill-rule: nonzero; opacity: 1;"  cx="0" cy="0" rx="89.559" ry="44.061" />
  </g>
  <g transform="matrix(1 0 0 1 201.24 150.29)" style="" id="text122"  >
  		<text xml:space="preserve" font-family="Arial, sans-serif" font-size="16" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-67.14" y="5.03" >Muhammad Ehsan</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 195.41 278.65)" style="" id="text123"  >
  		<text xml:space="preserve" font-family="Arial, sans-serif" font-size="26.8" font-style="italic" font-weight="normal" text-decoration="line-through" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(199,23,23); fill-rule: nonzero; opacity: 0.7; white-space: pre;" ><tspan x="-107.82" y="8.42" >C</tspan><tspan x="-86.46" y="8.42" >o</tspan><tspan x="-69.56" y="8.42" >m</tspan><tspan x="-45.23" y="8.42" >a</tspan><tspan x="-28.33" y="8.42" >p</tspan><tspan x="-11.42" y="8.42" >n</tspan><tspan x="5.48" y="8.42" >y</tspan><tspan x="20.88" y="8.42" style="white-space: pre; "> </tspan><tspan x="30.33" y="8.42" >N</tspan><tspan x="51.68" y="8.42" >a</tspan><tspan x="68.59" y="8.42" >m</tspan><tspan x="92.91" y="8.42" >e</tspan></text>
  </g>
  </svg>`;

  const strrrr = ` <?xml version="1.0" encoding="utf-8"?>
  <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <rect x="67.05" y="128.353" width="271.073" height="174.33" style="fill: rgb(216, 216, 216);"/>
    <ellipse style="fill: rgb(41, 3, 3);" cx="198.755" cy="215.517" rx="89.559" ry="44.061"/>
    <text id="text122" style="fill: rgb(255, 255, 255); font-family: Arial, sans-serif; font-size: 16px; white-space: pre;" x="134.1" y="220.306">Muhammad Ehsan</text>
    <text id="text123" style="fill: rgb(199, 23, 23); font-family: Arial, sans-serif; font-size: 26.8px; white-space: pre; text-decoration:line-through; letter-spacing:2px; font-style:italic; opacity:0.7;  " x="94.589" y="286.043">Comapny Name</text>
  </svg>`;
  // const str = `
  // <svg xmlns="http://www.w3.org/2000/svg"
  // xmlns:xhtml="http://www.w3.org/1999/xhtml"
  // xmlns:xlink="http://www.w3.org/1999/xlink"
  // id="logo-svg"
  //         viewBox="-5 -5 300 300"
  //         enable-background="new 0 0 600 600"
  //         preserveAspectRatio="xMinYMin"
  //         style="background-color:white"
  //       >

  // <path
  // id="path1"
  // style="fill:blue; stroke-linejoin:round; stroke-width:5; stroke:#5f5"
  //   d="M 74 53.64101615137753 L 14.000000000000027 88.28203230275507 L 14 19 L 74 53.64101615137753 Z"

  // />
  // <path
  // id="path2"
  // style="fill:red; stroke-linejoin:round; stroke-width:5; stroke:#333"
  //   d="M 84 68.64101615137753 L 24.00000000000003 103.28203230275507 L 24 34 L 84 68.64101615137753 Z"

  // />
  // <g style="transform: translate(40px, 10px)" >
  //   <path
  //   style="fill:transparent; stroke:#FFB830;"
  //     d="M3,19.333C3,17.258,9.159,1.416,21,5.667
  //                           c13,4.667,13.167,38.724,39.667,7.39"

  //   />
  //   <ellipse
  //   style="fill:yellow; stroke:#purple; stroke-width:4"
  //     cx="40"
  //     cy="80"
  //     rx="40"
  //     ry="10"

  //   />

  // </g>

  //  <text data-target="text"
  //  id="text" x="0" y="20"  font-size="18" text-decoration="underline" font-style="italic" font-weight="bold" font-family="Arial" fill="#000080">
  //  Company Name
  //  </text>
  // </svg>`;

  const initialize = () => {
    var canvas = new fabric.Canvas("a", {
      preserveObjectStacking: true,
    });
    function ConvertToIText(obj) {
      var text = obj.text;
      var textobj = obj.toObject();
      delete textobj.text;
      delete textobj.type;
      var itext = new fabric.IText(text, textobj);
      itext.styles = {};
      return itext;
    }
    // canvas.get;
    // var svg;
    // fabric.loadSVGFromString(str, function (objects, options) {
    //   svg = fabric.util.groupSVGElements(objects, options);
    //   svg.scaleToHeight(canvas.height);

    //   canvas.add(svg);
    //   svg.center();
    //   canvas.renderAll();
    //   svg.setCoords();
    //   var bounds = svg.getObjects();
    //   console.log(bounds[1]);
    //   bounds[0].group.setFill("#00000");

    //   fabric.loadSVGFromString(str, function (objects, options) {
    //     var group = new fabric.Group(objects, options);
    //     canvas.add(group);
    //     group.scaleToHeight(canvas.getHeight());
    //     canvas.renderAll();
    //     var items = group._objects;
    //     group._restoreObjectsState();
    //     canvas.remove(group);
    //     for (var i = 0; i < items.length; i++) {
    //       items[i].set({
    //         left: svg.getLeft() + bounds[i].getLeft() * svg.getScaleX(),
    //         top: svg.getTop() + bounds[i].getTop() * svg.getScaleY(),
    //       });
    //       canvas.add(items[i]);
    //     }
    //   });
    // });

    // fabric.loadSVGFromString(str, function (objects, options) {
    //   // canvas.centerObject
    //   // //This is how
    //   // var svg = fabric.util.groupSVGElements(objects, options);
    //   // canvas.setWidth(svg.width);
    //   // canvas.setHeight(svg.height);

    //   for (var i = 0; i < objects.length; i++) {
    //     var obj = objects[i];

    //     if (obj.type === "text") {
    //       let id = obj.id;
    //       obj = ConvertToIText(obj);
    //       console.log("Text type");
    //       // obj.firstText = obj.text;
    //       obj.id = id;

    //       // obj.textState = "original";
    //     }
    //     canvas.add(obj);
    //   }
    //   // canvas.forEachObject(function (obj) {
    //   //   console.log("Object type > ", obj.type);
    //   //   if (obj.type === "text") {
    //   //     obj = ConvertToIText(obj);
    //   //     obj.firstText = obj.text;
    //   //     obj.textState = "original";
    //   //   }
    //   // });
    //   // canvas.add.apply(canvas, objects);

    // const objectss = JSON.parse(jsonn);
    // // const string = JSON.parse(str);
    // console.log("Type of SVG > ", str.match(/(<\/?\w+>)/g));
    // console.log("type here >", typeof objectss);
    canvas.loadFromJSON(jsonn);
    canvas.renderAll();
    setOriginalCanvas(canvas.historyUndo.length);
    console.log("Canvas > ", canvas.toJSON());
    // });

    setCanvas(canvas);
  };
  //initialize SVG string into Canvas
  useEffect(() => {
    initialize();
    console.log("intialization > ");
    // UseEffect's cleanup function
    // return () => {
    //   canvas.dispose();
    // };
  }, []);

  //add Icon
  useEffect(() => {
    if (canvas && svgLogo) {
      let icon = new fabric.Path(svgLogo);
      icon.name = "icone" + 1;
      icon.id = "icon" + count;
      setCount((count) => count + 1);
      canvas.add(icon);
      icon.center();
      canvas.renderAll();
      console.log("Canvas > ", canvas.toSVG());
    }
  }, [svgLogo]);

  useEffect(() => {
    if (canvas) {
      console.log("Rendering Color Obj");
      let obj = canvas.getActiveObject();

      if (obj) {
        let fill = svgColorObj.logoFill;
        let border = svgColorObj.strokeColor;
        console.log("inside Color logoFill", fill);
        fill && obj.set("fill", fill);
        border && obj.set("stroke", border);
        canvas.renderAll();
      }
    }
  }, [svgColorObj]);

  useEffect(() => {
    if (canvas && bgColor) {
      console.log("bgColor render", bgColor);
      canvas.backgroundColor = `${bgColor}`;
      canvas.renderAll();
    }
  }, [bgColor]);

  useEffect(() => {
    if (text) {
      if (text === "text1") {
        addText(30, "bold", "Add Logo Name");
        setText("");
      } else if (text === "text2") {
        addText(16, "400", "Add Slogan");
        setText("");
      }
    }
  }, [text]);

  useEffect(() => {
    if (textId && canvas && canvas.getActiveObject()) {
      let selectedObj = canvas.getActiveObject();
      let type = selectedObj.type;
      if (
        canvas.getActiveObject().type === "text" ||
        canvas.getActiveObject().type === "i-text"
      ) {
        let FontFamily = selectedObj.fontFamily;
        let fontSize = selectedObj.fontSize;
        let letterSpacing = selectedObj.charSpacing;
        let bold = selectedObj.fontWeight;
        let italic = selectedObj.fontStyle;
        let underline = selectedObj.underline ? selectedObj.underline : false;
        let overLine = selectedObj.overline ? selectedObj.overline : false;
        let lineThrough = selectedObj.linethrough
          ? selectedObj.linethrough
          : false;
        let textColor = selectedObj.fill;
        let borderColor = selectedObj.stroke;
        let borderWidth = selectedObj.strokeWidth;
        let lineHeight = selectedObj.height;
        let opacity = selectedObj.opacity;
        let shadowColor = selectedObj.fill;
        let blurr = 4;
        let offsetX = 10;
        let offsetY = 10;
        let shadow = false;

        if (selectedObj.shadow) {
          shadow = true;
          console.log("Shadow Color > ", selectedObj.shadow.color);
          shadowColor = selectedObj.shadow.color;
          blurr = selectedObj.shadow.blur;
          offsetX = selectedObj.shadow.offsetX;
          offsetY = selectedObj.shadow.offsetY;
        }
        console.log("setSvgText render");
        let obj = {
          type,
          FontFamily,
          fontSize,
          letterSpacing,
          bold,
          italic,
          underline,
          overLine,
          lineThrough,
          textColor,
          borderColor,
          borderWidth,
          lineHeight,
          opacity,
          shadow,
          shadowColor,
          blurr,
          offsetX,
          offsetY,
        };
        setSvgText(obj);
        textProp.current = obj;
        console.log("SetHidden 2 true render");
        setHidden(true);
      } else {
        let textColor = selectedObj.fill;
        let borderColor = selectedObj.stroke;
        let borderWidth = selectedObj.strokeWidth;
        let lineHeight = selectedObj.height;
        let opacity = selectedObj.opacity;
        let shadowColor = selectedObj.fill;
        let blurr = 4;
        let offsetX = 10;
        let offsetY = 10;
        let shadow = false;

        if (selectedObj.shadow) {
          shadow = true;
          console.log("Shadow Color > ", selectedObj.shadow.color);
          shadowColor = selectedObj.shadow.color;
          blurr = selectedObj.shadow.blur;
          offsetX = selectedObj.shadow.offsetX;
          offsetY = selectedObj.shadow.offsetY;
        }
        console.log("setSvgText render");
        let obj = {
          type,
          textColor,
          borderColor,
          borderWidth,
          lineHeight,
          opacity,
          shadow,
          shadowColor,
          blurr,
          offsetX,
          offsetY,
        };
        setSvgText(obj);
        textProp.current = obj;
        console.log("SetHidden 2 true render undo&redo", textProp.current);
        setHidden(true);
      }
    }
  }, [textId]);

  useEffect(() => {
    if (
      svgText !== textProp.current &&
      canvas &&
      textProp &&
      canvas.getActiveObject() &&
      canvas.getActiveObject().type === "i-text"
    ) {
      let shadow = new fabric.Shadow({
        color: svgText.shadowColor,
        blur: svgText.blurr,
        offsetX: svgText.offsetX,
        offsetY: svgText.offsetY,
      });
      let selectedObj = canvas.getActiveObject();
      console.log("FontFamily Comparison > ", selectedObj.fontFamily);

      selectedObj.set("fontFamily", svgText.FontFamily);
      selectedObj.set("fontSize", svgText.fontSize);
      selectedObj.set("charSpacing", svgText.letterSpacing);
      selectedObj.set("fontWeight", svgText.bold);
      selectedObj.set("fontStyle", svgText.italic);
      selectedObj.set("underline", svgText.underline);
      selectedObj.set("overline", svgText.overLine);
      selectedObj.set("linethrough", svgText.lineThrough);
      selectedObj.set("fill", svgText.textColor);
      selectedObj.set("stroke", svgText.borderColor);
      selectedObj.set("strokeWidth", svgText.borderWidth);
      selectedObj.set("height", svgText.lineHeight);
      selectedObj.set("opacity", svgText.opacity);
      svgText.shadow
        ? selectedObj.set({ shadow: shadow })
        : (selectedObj.shadow = null);
      canvas.requestRenderAll();
      // setTextProp(svgText);
      textProp.current = svgText;

      console.log("undo&redo in svgText modifier >>. ");
      canvas.fire("object:modified");
    } else if (
      svgText !== textProp.current &&
      canvas &&
      textProp &&
      canvas.getActiveObject() &&
      canvas.getActiveObject().type !== "i-text"
    ) {
      let shadow = new fabric.Shadow({
        color: svgText.shadowColor,
        blur: svgText.blurr,
        offsetX: svgText.offsetX,
        offsetY: svgText.offsetY,
      });
      let selectedObj = canvas.getActiveObject();
      selectedObj.set("fill", svgText.textColor);
      selectedObj.set("stroke", svgText.borderColor);
      selectedObj.set("strokeWidth", svgText.borderWidth);
      selectedObj.set("height", svgText.lineHeight);
      selectedObj.set("opacity", svgText.opacity);
      svgText.shadow
        ? selectedObj.set({ shadow: shadow })
        : (selectedObj.shadow = null);
      canvas.requestRenderAll();
      textProp.current = svgText;
      console.log("undo&redo in svgText modifier");
      canvas.fire("object:modified");
    }
  }, [svgText]);

  function handleSelection(e) {
    console.log(
      "Selected Text renderrr in Body outside is >",
      canvas.getActiveObject()
    );
    console.log(" Undo&redo here in Selection");
    if (e.target !== textId) {
      console.log(
        "Hiddent renderrr condition",
        e.target !== textId,
        "textid > ",
        textId,
        " Get Active object is>>>  ",
        e.target
      );
      // setHidden(false);
      console.log("settextId render");
      settextId(e.target);
    }
  }

  function handleCleared() {
    console.log("handleCleared render");
    setHidden(false);
    settextId(null);
  }

  useEffect(() => {
    if (canvas) {
      console.log("useEffect rerendering");
      canvas.on({
        "selection:updated": handleSelection,
        "selection:created": handleSelection,
        "selection:cleared": handleCleared,
      });
      // return () => {
      //   console.log("canvas off render");
      //   canvas.off(["selection:updated", "selection:created"]);
      // };
    }
  });
  // let c = 1;
  // function handleUndoRedo() {
  //   c++;
  //   console.log(" Undo&redo here", c);
  // }

  // useEffect(() => {
  //   if (canvas) {
  //     canvas.on({
  //       "object:modified": handleUndoRedo,
  //       "text:changed": handleUndoRedo,
  //       "object:added": handleUndoRedo,
  //       "object:removed": handleUndoRedo,
  //     });
  //   }
  // });

  useEffect(() => {
    if (canvas) {
      document.onkeydown = function (evt) {
        evt = evt || window.event;

        var movementDelta = 2;
        var scale = 0.01;

        var activeObject = canvas.getActiveObject();
        console.log("Event key code >> ", evt);

        if (!evt.ctrlKey && evt.code === "ArrowLeft") {
          evt.preventDefault(); // Prevent the default action
          if (activeObject) {
            let a = activeObject.get("left") - movementDelta;
            activeObject.set("left", a);
          }
        } else if (!evt.ctrlKey && evt.code === "ArrowRight") {
          evt.preventDefault(); // Prevent the default action
          if (activeObject) {
            let a = activeObject.get("left") + movementDelta;
            activeObject.set("left", a);
          }
        } else if (!evt.ctrlKey && evt.code === "ArrowUp") {
          evt.preventDefault(); // Prevent the default action
          if (activeObject) {
            let a = activeObject.get("top") - movementDelta;
            activeObject.set("top", a);
          }
        } else if (!evt.ctrlKey && evt.code === "ArrowDown") {
          evt.preventDefault(); // Prevent the default action
          if (activeObject) {
            let abs = activeObject.get("top") + movementDelta;
            activeObject.set("top", abs);
          }
        } else if (evt.code === "Delete") {
          if (activeObject) {
            deleteElement();
          }
        } else if (evt.altKey && evt.code === "KeyX") {
          if (activeObject) {
            duplicate();
          }
        } else if (evt.ctrlKey && evt.code === "ArrowUp") {
          if (activeObject) {
            bringToFront();
          }
        } else if (evt.ctrlKey && evt.code === "ArrowDown") {
          if (activeObject) {
            bringToBack();
          }
        } else if (evt.key === "=") {
          if (activeObject) {
            let a = activeObject.get("scaleX") + scale;
            activeObject.set("scaleX", a);
            let b = activeObject.get("scaleY") + scale;
            activeObject.set("scaleX", a);
            activeObject.set("scaleY", b);
          }
        } else if (evt.key === "-") {
          if (activeObject) {
            let a = activeObject.get("scaleX") - scale;
            let b = activeObject.get("scaleY") - scale;
            activeObject.set("scaleX", a);
            activeObject.set("scaleY", b);
          }
        } else if (evt.ctrlKey && evt.code === "ArrowRight") {
          if (activeObject) {
            let a = activeObject.get("angle") + 1;
            console.log("A > ", activeObject.get("angle"));
            activeObject.rotate(a).setCoords();
          }
        } else if (evt.ctrlKey && evt.code === "ArrowLeft") {
          if (activeObject) {
            let a = activeObject.get("angle") - 1;
            console.log("A > ", activeObject.get("angle"));
            activeObject.rotate(a);
          }
        } else if (evt.ctrlKey && evt.code === "KeyZ") {
          funUndo();
        } else if (evt.ctrlKey && evt.code === "KeyY") {
          funRedo();
        }
        if (activeObject) {
          activeObject.setCoords();
          canvas.renderAll();
        }
      };
      document.onkeyup = function (evt) {
        evt = evt || window.event;

        var activeObject = canvas.getActiveObject();
        console.log("Event keyup code >> ", evt);

        if (!evt.ctrlKey && evt.code === "ArrowLeft") {
          evt.preventDefault(); // Prevent the default action
          if (activeObject) {
            canvas.fire("object:modified");
          }
        } else if (!evt.ctrlKey && evt.code === "ArrowRight") {
          evt.preventDefault(); // Prevent the default action
          if (activeObject) {
            canvas.fire("object:modified");
          }
        } else if (!evt.ctrlKey && evt.code === "ArrowUp") {
          evt.preventDefault(); // Prevent the default action
          if (activeObject) {
            canvas.fire("object:modified");
          }
        } else if (!evt.ctrlKey && evt.code === "ArrowDown") {
          evt.preventDefault(); // Prevent the default action
        } else if (evt.code === "Delete") {
          deleteElement();
        } else if (evt.altKey && evt.code === "KeyX") {
          if (activeObject) {
            canvas.fire("object:modified");
          }
        } else if (evt.ctrlKey && evt.code === "ArrowUp") {
          if (activeObject) {
            canvas.fire("object:modified");
          }
        } else if (evt.ctrlKey && evt.code === "ArrowDown") {
          if (activeObject) {
            canvas.fire("object:modified");
          }
        } else if (evt.key === "=") {
          if (activeObject) {
            canvas.fire("object:modified");
          }
        } else if (evt.key === "-") {
          if (activeObject) {
            canvas.fire("object:modified");
          }
        } else if (evt.ctrlKey && evt.code === "ArrowRight") {
          if (activeObject) {
            canvas.fire("object:modified");
          }
        } else if (evt.ctrlKey && evt.code === "ArrowLeft") {
          if (activeObject) {
            canvas.fire("object:modified");
          }
        }

        if (activeObject) {
          activeObject.setCoords();
          canvas.renderAll();
        }
      };
    }
  });

  const bringToFront = () => {
    var canva = canvas;
    var activeObj = canva.getActiveObject();
    activeObj && canva.bringToFront(activeObj).renderAll();
  };

  const bringToBack = () => {
    var canva = canvas;
    var activeObj = canva.getActiveObject();
    activeObj && canva.sendToBack(activeObj).renderAll();
  };

  const addText = (size, weight, name) => {
    let t = new fabric.IText(name, {
      left: 50,
      top: 100,
      fontFamily: "arial black",
      fill: "#333",
      fontSize: size,
      fontWeight: weight,
      id: "text" + count,
    });
    setCount(count + 2);
    t.center();
    canvas.add(t);
  };

  const duplicate = () => {
    console.log("Select group ------ ");
    let activeObj = canvas.getActiveObject();
    let selGroup = new fabric.ActiveSelection(activeObj, {
      canvas: canvas,
    });
    if (
      activeObj &&
      selGroup._objects._objects &&
      selGroup._objects._objects.length > 1
    ) {
      console.log("Select group");
      activeObj.forEachObject(function (activeObj) {
        var object = fabric.util.object.clone(activeObj);

        object.title = object.title + "_copy" + count;
        object.id = object.id + count;
        object.set("top", object.top + 10);
        object.set("left", object.left + 10);

        canvas.add(object);
      });
      canvas.discardActiveObject(activeObj);
      setCount(count + 2);
      canvas.renderAll();
    } else if (activeObj) {
      console.log("Select element");
      var object = fabric.util.object.clone(activeObj);
      canvas.discardActiveObject(activeObj);

      object.title = object.title + "_copy" + count;
      object.id = object.id + count;
      object.set("top", object.top + 10);
      object.set("left", object.left + 10);
      setCount(count + 2);
      canvas.add(object);
      canvas.renderAll();
    }
  };

  const deleteElement = () => {
    console.log("Multiplt selection > ", canvas.get);
    let obj = canvas.getActiveObject();
    let selGroup = new fabric.ActiveSelection(obj, {
      canvas: canvas,
    });
    if (
      obj &&
      selGroup._objects._objects &&
      selGroup._objects._objects.length > 1
    ) {
      console.log("inside deleteElement");
      // if (confirm("Deleted selected?")) {
      obj.forEachObject(function (ob) {
        canvas.remove(ob);
      });
      // }
    } else {
      obj && canvas.remove(obj);
    }
    canvas.discardActiveObject().renderAll();
    // obj && canvas.remove(obj);
    console.log("Objects are > ", canvas);
  };
  const downloadImagePng = () => {
    var canv = document.getElementById("a");
    canv.toBlob(function (blob) {
      saveAs(blob, "Logo.jpeg");
    });
  };

  const downloadSvg = () => {
    // saveAs(new Blob([canvas.toSVG()], { type: "image/svg+xml" }), "name.svg");
    var json = canvas.toJSON();
    saveAs(new Blob([JSON.stringify(json)], { type: "txt/JSON" }), "name.JSON");
  };
  const funUndo = () => {
    console.log(
      "Check  canvas > ",
      canvas,
      " original Canvas >",
      originalCanvas
    );
    console.log(
      "True/False Canvas > ",
      originalCanvas < canvas.historyUndo.length
    );
    if (originalCanvas < canvas.historyUndo.length) {
      if (canvas.historyUndo.length === originalCanvas + 1) {
        document.getElementById("undo").style.backgroundColor = "red";
      }
      document.getElementById("redo").style.backgroundColor = "lightblue";

      canvas.undo();
    }
  };
  const funRedo = () => {
    if (canvas.historyRedo.length > 0) {
      if (canvas.historyRedo.length === 1) {
        document.getElementById("redo").style.backgroundColor = "red";
      }
      document.getElementById("undo").style.backgroundColor = "lightblue";

      canvas.redo();
    }
  };
  return (
    <div className="body">
      <div>
        <button onClick={funUndo} id="undo">
          Undo
        </button>
        <button onClick={funRedo} id="redo">
          Redo
        </button>
      </div>
      <div className="edit-area">
        <canvas id="a" width="400" height="300" />
      </div>
      <div>
        <button onClick={downloadImagePng}>save image</button>
        <button onClick={downloadSvg}>save SVG</button>
      </div>
      <div>
        <button onClick={bringToFront}>Farword</button>
        <button onClick={bringToBack}>Backword</button>
        <button onClick={duplicate}>Duplicate</button>
        <button onClick={deleteElement}>Delete</button>
      </div>
    </div>
  );
};

export default Body;
