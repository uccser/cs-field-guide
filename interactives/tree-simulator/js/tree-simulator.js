var Simulator = {};

$(document).ready(function(){
  Simulator.container = document.getElementById("grid-container");
  Simulator.grid = document.getElementById("grid-content");
  Simulator.cellSize = 50;
  Simulator.contentWidth = Simulator.cellSize * 50;
  Simulator.contentHeight = Simulator.cellSize * 50;

  updateGrid();
  setUIBinds();

  // Initialize Scroller
  Simulator.scroller = new Scroller(render, {
    zooming: true
  });

  // Reflow handling
  var reflow = function() {
    Simulator.scroller.setDimensions(
      Simulator.container.clientWidth,
      Simulator.container.clientHeight,
      Simulator.contentWidth,
      Simulator.contentHeight
    );
  };

  window.addEventListener("resize", reflow, false);
  reflow();
});



function updateGrid() {
  Simulator.grid.style.width = Simulator.contentWidth + "px";
  Simulator.grid.style.height = Simulator.contentHeight + "px";

  // Generate content
  var cell = document.createDocumentFragment();
  for (var row=0, rl=Simulator.contentHeight/Simulator.cellSize; row<rl; row++) {
    for (var col=0, cl=Simulator.contentWidth/Simulator.cellSize; col<cl; col++) {
      element = document.createElement("div");
      element.style.backgroundColor = row%2 + col%2 > 0 ? "#ddd" : "";
      element.style.width = Simulator.cellSize + "px";
      element.style.height = Simulator.cellSize + "px";
      element.style.display = "inline-block";
      element.style.textIndent = "6px";
      element.innerHTML = row + "," + col;
      cell.appendChild(element);
    }
  }
  Simulator.grid.appendChild(cell);

};


function setUIBinds() {
  if ('ontouchstart' in window) {

    Simulator.container.addEventListener("touchstart", function(e) {
      // Don't react if initial down happens on a form element
      if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
        return;
      }

      Simulator.scroller.doTouchStart(e.touches, e.timeStamp);
      e.preventDefault();
    }, false);

    document.addEventListener("touchmove", function(e) {
      Simulator.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    }, false);

    document.addEventListener("touchend", function(e) {
      Simulator.scroller.doTouchEnd(e.timeStamp);
    }, false);

    document.addEventListener("touchcancel", function(e) {
      Simulator.scroller.doTouchEnd(e.timeStamp);
    }, false);

  } else {

    var mousedown = false;

    Simulator.container.addEventListener("mousedown", function(e) {
      if (e.target.tagName.match(/input|textarea|select/i)) {
        return;
      }

      Simulator.scroller.doTouchStart([{
        pageX: e.pageX,
        pageY: e.pageY
      }], e.timeStamp);

      mousedown = true;
    }, false);

    document.addEventListener("mousemove", function(e) {
      if (!mousedown) {
        return;
      }

      Simulator.scroller.doTouchMove([{
        pageX: e.pageX,
        pageY: e.pageY
      }], e.timeStamp);

      mousedown = true;
    }, false);

    document.addEventListener("mouseup", function(e) {
      if (!mousedown) {
        return;
      }

      Simulator.scroller.doTouchEnd(e.timeStamp);

      mousedown = false;
    }, false);

    Simulator.container.addEventListener("mousewheel", function(e) {
      Simulator.scroller.doMouseZoom(e.wheelDelta, e.timeStamp, e.pageX, e.pageY);
    }, false);

  }
};
