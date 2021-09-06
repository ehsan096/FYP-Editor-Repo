import React, { useRef, useEffect, useState } from "react";
import Moveable from "react-moveable";
import "./App.css";
import { setAlias, Frame } from "scenejs";
setAlias("tx", ["transform", "translateX"]);
setAlias("ty", ["transform", "translateY"]);
setAlias("tz", ["transform", "translateZ"]);
setAlias("rotate", ["transform", "rotate"]);
setAlias("sx", ["transform", "scaleX"]);
setAlias("sy", ["transform", "scaleY"]);
setAlias("matrix3d", ["transform", "matrix3d"]);
const App = () => {
  const moveable = useRef(null);
  const [target, setTarget] = useState(null);
  const [isShift, setIsShift] = useState(false);
  const itemMap = new Map();
  const [item, setItem] = useState();
  useEffect(() => {
    setItm(target);
    console.log("ItemMap in EffectState is  > ", itemMap);
    setItem(itemMap.get(target));
  }, [target]);
  const setItm = (el) => {
    itemMap.set(
      el,
      new Frame({
        tz: "5px",
        tx: "0px",
        ty: "0px",
        rotate: "0deg",
        sx: 1,
        sy: 1,
      })
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
    const id = targ.getAttribute("data-target");
    e.preventDefault();
    console.log("e.target = 2 ", e.target);
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (!id) {
      console.log("Target is >> 209", id);
      return;
    }
    if (!moveable.current?.isMoveableElement(e.target)) {
      if (target === e.target) {
        console.log("inside 222 > ");
        moveable.current?.updateRect();
      } else {
        const nativeEvent = e.nativeEvent;
        setTarget(() => e.target);
        console.log(" << >>> Set Target 89  >> ", e.target);
        moveable.current?.dragStart(nativeEvent);
      }
    }
  };
  return (
    <div id="con">
      {console.log("Item property is  >  ", item)}
      {console.log("SlectedTarget Property >  ", target)}
      <Moveable
        target={target} // ok
        ref={moveable} // this is for group
        keepRatio={isShift} //ok
        origin={true} // for resize
        originDraggable={true}
        dragArea={true} //ok
        draggable={true} //ok
        scalable={true} //ok
        rotatable={true} //ok
        throttleDrag={0} //ok
        throttleScale={0} //ok
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
          const sx = parseFloat(item.get("sx")) || 0;
          const sy = parseFloat(item.get("sy")) || 0;
          const tx = parseFloat(item.get("tx")) || 0;
          const ty = parseFloat(item.get("ty")) || 0;
          set([sx, sy]);
          dragStart && dragStart.set([tx, ty]);
        }}
        onScale={({ target, scale, drag }) => {
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
      <div
        className="App"
        onMouseDown={(e) => onClick(e)}
        onTouchStart={onClick}
        data-target="app"
      >
        <header className="App-header">
          <p data-target="p">
            Edit <code data-target="code">src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" rel="noopener noreferrer" data-target="link">
            Learn React
          </a>
          <svg
            // data-target="svg"
            style={{ width: "300px", border: "1px solid black" }}
          >
            <path
              data-target="path1"
              d="M 74 53.64101615137753 L 14.000000000000027 88.28203230275507 L 14 19 L 74 53.64101615137753 Z"
              fill="yellow"
              strokeLinejoin="round"
              strokeWidth="8"
              opacity="1"
              stroke="red"
              origin="50% 50%"
            />
            <path
              data-target="path2"
              d="M 84 68.64101615137753 L 24.00000000000003 103.28203230275507 L 24 34 L 84 68.64101615137753 Z"
              fill="red"
              strokeLinejoin="round"
              strokeWidth="8"
              opacity="1"
              stroke="#333"
              origin="50% 50%"
            />
            <g style={{ transform: "translate(40px, 10px)" }}>
              <path
                data-target="pathline"
                d="M3,19.333C3,17.258,9.159,1.416,21,5.667
                                c13,4.667,13.167,38.724,39.667,7.39"
                fill="transparent"
                stroke="#ff5"
              />
              <ellipse
                data-target="ellipse"
                cx="40"
                cy="80"
                rx="40"
                ry="10"
                style={{
                  fill: "yellow",
                  stroke: "purple",
                  strokeWidth: 2,
                }}
              />
            </g>
          </svg>
        </header>
      </div>
    </div>
  );
};
export default App;
