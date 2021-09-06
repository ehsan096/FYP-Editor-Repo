$(function(){  
    const moveable = new Moveable(document.getElementById('canvas'), {
        target: document.querySelector(".square"),
        container: document.getElementById('canvas'),
      draggable: true,
      resizable: true,
      scalable: true,
      rotatable: true,
      warpable: true,
      pinchable: true, // ["resizable", "scalable", "rotatable"]
      origin: true,
      keepRatio: true,
      edge: false,
      throttleDrag: 0,
      throttleResize: 0,
      throttleScale: 0,
      throttleRotate: 0,
      elementGuidelines: [document.querySelector(".square")],
      snappable: true,
      snapThreshold: 5,
    });
    
    $('#canvas').on('mousedown', '.square', function(e){
      var posX = $(this).offset().left,
              posY = $(this).offset().top;
      frame.translate = [posX, posY];
      frame.rotate = parseInt($(this).attr('data-rotate_angle'));
      
      moveable.setState({
          target: e.target,
      }, () => {
          moveable.dragStart(e);
      });
      
      
    });
    
  
    const frame = {
        translate: [0, 0],
      rotate: 0
    };
    
    moveable.on("dragStart", ({ set }) => {
        set(frame.translate);
    }).on("drag", ({ target, beforeTranslate }) => {
        frame.translate = beforeTranslate;
      
      target.style.left = beforeTranslate[0]+'px';
      target.style.top = beforeTranslate[1]+'px';
    }).on("resizeStart", ({ target, set, setOrigin, dragStart }) => {
      // Set origin if transform-origin use %.
      setOrigin(["%", "%"]);
  
      // If cssSize and offsetSize are different, set cssSize. (no box-sizing)
      const style = window.getComputedStyle(target);
      const cssWidth = parseFloat(style.width);
      const cssHeight = parseFloat(style.height);
      set([cssWidth, cssHeight]);
  
      // If a drag event has already occurred, there is no dragStart.
      dragStart && dragStart.set(frame.translate);
  }).on("resize", ({ target, width, height, drag }) => {
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
  
      // get drag event
      frame.translate = drag.beforeTranslate;
    
    target.style.left = drag.beforeTranslate[0]+'px';
      target.style.top = drag.beforeTranslate[1]+'px';
    
  }).on("rotateStart", ({ set }) => {
      set(frame.rotate);
  }).on("rotate", ({ target, beforeRotate }) => {
      frame.rotate = beforeRotate;
      target.style.transform = `rotate(${beforeRotate}deg)`;
      target.setAttribute('data-rotate_angle', beforeRotate);
  });
    
  });