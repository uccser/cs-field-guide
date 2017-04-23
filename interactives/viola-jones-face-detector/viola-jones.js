// window.onload = function() {
//   var img = document.getElementById('img');
//   var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
//   tracker.setStepSize(2);
//   tracking.track('#img', tracker);
//   tracker.on('track', function(event) {
//     event.data.forEach(function(rect) {
//       window.plot(rect.x, rect.y, rect.width, rect.height);
//     });
//   });
//   window.plot = function(x, y, w, h) {
//     var rect = document.createElement('div');
//     document.querySelector('.viola-jones').appendChild(rect);
//     rect.classList.add('rect');
//     rect.style.width = w + 'px';
//     rect.style.height = h + 'px';
//     rect.style.left = (img.offsetLeft + x) + 'px';
//     rect.style.top = (img.offsetTop + y) + 'px';
//   };
// };
// target elements with the "draggable" class

// // listen for HTML5 native drag and drop API dragstart event
// document.addEventListener('dragstart', function (event) {
//     // use interact.js' matchesSelector polyfil to
//     // check for match with your draggable target
//     if (interact.matchesSelector(event.target, '.drag-element, .drag-element *')) {
//         // prevent and stop the event if it's on a draggable target
//         event.preventDefault();
//         event.stopPropagation();
//     }
// });

//   function dragMoveListener (event) {
//     var target = event.target,
//         // keep the dragged position in the data-x/data-y attributes
//         x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
//         y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

//     // translate the element
//     target.style.webkitTransform =
//     target.style.transform =
//       'translate(' + x + 'px, ' + y + 'px)';

//     // update the posiion attributes
//     target.setAttribute('data-x', x);
//     target.setAttribute('data-y', y);
//   }

//   // this is used later in the resizing and gesture demos
//   window.dragMoveListener = dragMoveListener;

// interact('.haar')
//   .draggable({
//     // enable inertial throwing
//     inertia: true,
//     onmove: window.dragMoveListener
//   })
//   .resizable({
//     preserveAspectRatio: false,
//     invert: 'reposition',
//     edges: { left: true, right: true, bottom: true, top: true }
//   })
//   .on('resizemove', function (event) {
//     var target = event.target,
//         x = (parseFloat(target.getAttribute('data-x')) || 0),
//         y = (parseFloat(target.getAttribute('data-y')) || 0);

//     // update the element's style
//     target.style.width  = event.rect.width + 'px';
//     target.style.height = event.rect.height + 'px';

//     // translate when resizing from top or left edges
//     x += event.deltaRect.left;
//     y += event.deltaRect.top;

//     target.style.webkitTransform = target.style.transform =
//         'translate(' + x + 'px,' + y + 'px)';

//     target.setAttribute('data-x', x);
//     target.setAttribute('data-y', y);
//     target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
//   });
  var result = [];
  var img = document.getElementById('drop-image');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var rect = img.getBoundingClientRect();


window.onload = function() {
  var canvas = document.getElementById('canvas');
  canvas.width = 400;
  canvas.height = 500;
  context.drawImage(img,0,0, canvas.width, canvas.height);
  var myData = context.getImageData(0, 0, canvas.width, canvas.height);
  tracking.Image.computeIntegralImage(myData.data, myData.width, myData.height, result);

};

interact('.drag-element-source').draggable({
  'manualStart' : true,      
  'onmove' : dragMoveListener,
  restrict: {
      restriction: canvas,
      elementRect: { left: 0, right: 1, top: 0, bottom: 1 }
    }
    
}).on('move', function (event) {

  var interaction = event.interaction;
  console.log('dragmove');

  // if the pointer was moved while being held down
  // and an interaction hasn't started yet
  if (interaction.pointerIsDown && !interaction.interacting() && event.currentTarget.classList.contains('drag-element-source')) {

    var original = event.currentTarget;
    
    // create a clone of the currentTarget element
    var clone = event.currentTarget.cloneNode(true);

    // Remove CSS class using JS only (not jQuery or jQLite) - http://stackoverflow.com/a/2155786/4972844
    clone.className = clone.className.replace(/\bdrag-element-source\b/,'drag-clone');
      
    // insert the clone to the page
    // TODO: position the clone appropriately
    event.currentTarget.parentNode.appendChild(clone);
    //document.getElementById('bucket').appendChild(clone);

    // start a drag interaction targeting the clone
    interaction.start({ name: 'drag' }, event.interactable, clone);

  } else {
    interaction.start({ name: 'drag' }, event.interactable, event.currentTarget);
  }
});

function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    var currentrec = target.getBoundingClientRect();

    var pointA = {x: currentrec.left - rect.left, y: currentrec.top - rect.top}
    var pointB = {x: currentrec.right - rect.left, y: currentrec.top - rect.top}
    var pointC = {x: currentrec.right - rect.left, y: currentrec.bottom - rect.top}
    var pointD = {x: currentrec.left - rect.left, y: currentrec.bottom - rect.top}
    target.setAttribute('pointA-x', pointA.x);
    target.setAttribute('pointA-y', pointA.y);
    target.setAttribute('pointB-x', pointB.x);
    target.setAttribute('pointB-y', pointB.y);
    target.setAttribute('pointC-x', pointC.x);
    target.setAttribute('pointC-y', pointC.y);
    target.setAttribute('pointD-x', pointD.x);
    target.setAttribute('pointD-y', pointD.y);
    context.rect(pointA.x, pointA.y, currentrec.width, currentrec.height);
    context.stroke();


    if(target.classList.contains("haar1")){
      var pointAB = {x: pointA.x + ((pointB.x-pointA.x)/2), y: pointA.y};
      var pointCB = {x: pointD.x + ((pointC.x-pointD.x)/2), y: pointD.y};
      //Formula is C - B - D + A
      //white square
      var indexC = (pointCB.y-1) * canvas.width + pointCB.x;
      var indexB = (pointAB.y-1) * canvas.width + pointAB.x;
      var indexD = (pointD.y-1) * canvas.width + pointD.x;
      var indexA = (pointA.y-1) * canvas.width + pointA.x;
      console.log(result[indexC] - result[indexB] - result[indexD] + result[indexA]);
      //black square
      var blackIndexC = (pointC.y-1) * canvas.width + pointC.x;
      var blackIndexB = (pointB.y-1) * canvas.width + pointB.x;
      var blackIndexD = (pointCB.y-1) * canvas.width + pointCB.x;
      var blackIndexA = (pointAB.y-1) * canvas.width + pointAB.x;
      console.log(result[blackIndexC] - result[blackIndexB] - result[blackIndexD] + result[blackIndexA]);
    }


  }

interact('.drag-clone')
  .draggable({
    onmove: window.dragMoveListener,
    restrict: {
      restriction: canvas,
      elementRect: { left: 0, right: 1, top: 0, bottom: 1 }
    }
  
  })
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    restrict: {
      restriction: canvas,
      elementRect: { left: 0, right: 1, top: 0, bottom: 1 }
    }
  })
  .on('resizemove', function (event) {
    var target = event.target;
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    var currentrec = target.getBoundingClientRect();
    var pointA = {x: currentrec.left - rect.left, y: currentrec.top - rect.top}
    var pointB = {x: currentrec.right - rect.left, y: currentrec.top - rect.top}
    var pointC = {x: currentrec.right - rect.left, y: currentrec.bottom - rect.top}
    var pointD = {x: currentrec.left - rect.left, y: currentrec.bottom - rect.top}

    if(target.classList.contains("haar1")){
      var pointAB = {x: pointA.x + ((pointB.x-pointA.x)/2), y: pointA.y};
      var pointCB = {x: pointD.x + ((pointC.x-pointD.x)/2), y: pointD.y};
      //Formula is C - B - D + A
      //white square
      var indexC = (pointCB.y-1) * canvas.width + pointCB.x;
      var indexB = (pointAB.y-1) * canvas.width + pointAB.x;
      var indexD = (pointD.y-1) * canvas.width + pointD.x;
      var indexA = (pointA.y-1) * canvas.width + pointA.x;
      console.log(result[indexC] - result[indexB] - result[indexD] + result[indexA]);

      //black square
      var blackIndexC = (pointC.y-1) * canvas.width + pointC.x;
      var blackIndexB = (pointB.y-1) * canvas.width + pointB.x;
      var blackIndexD = (pointCB.y-1) * canvas.width + pointCB.x;
      var blackIndexA = (pointAB.y-1) * canvas.width + pointAB.x;
      console.log(result[blackIndexC] - result[blackIndexB] - result[blackIndexD] + result[blackIndexA]);
  }
});





  // enable draggables to be dropped into this
interact('#drop-container').dropzone({
  // only accept elements matching this CSS selector
  accept: '.drag-element',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:
  ondropactivate: function (event) {
      
    // add active dropzone feedback
    event.target.classList.add('drop-active');
      
  },
  ondragenter: function (event) {
      
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
      
  },
  ondragleave: function (event) {
      
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
      
  },
  ondrop: function (event) {

      console.log('Drop Zone: ', event);
      console.log('Dropped Element: ', event.relatedTarget);
      
      event.relatedTarget.classList.remove('can-drop');
      event.relatedTarget.classList.add('dropped');
      
  },
  ondropdeactivate: function (event) {
      
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
      
  }
});