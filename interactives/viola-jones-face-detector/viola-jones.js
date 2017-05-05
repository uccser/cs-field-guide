// listen for HTML5 native drag and drop API dragstart event
document.addEventListener('dragstart', function(event) {
    // use interact.js' matchesSelector polyfil to
    // check for match with your draggable target
    if (interact.matchesSelector(event.target, '.drag-element, .drag-element *')) {
        // prevent and stop the event if it's on a draggable target
        event.preventDefault();
        event.stopPropagation();
    }
});


var result = [];
var haarFound = 0;
MAX_WIDTH = 700;


window.onload = function() {
    img = document.getElementById('img');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    rect = canvas.getBoundingClientRect();
    var canvas = document.getElementById('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    draw_grayscale_image(img);

    var myData = context.getImageData(0, 0, canvas.width, canvas.height);
    tracking.Image.computeIntegralImage(myData.data, myData.width, myData.height, result);

    var found = document.getElementById("found");
    found.innerHTML = haarFound;
    var black = document.getElementById("blackValue");
    black.innerHTML = 0;
    var white = document.getElementById("whiteValue");
    white.innerHTML = 0;

};

interact('.drag-element-source').draggable({
    'manualStart': true,
    'onmove': dragMoveListener,
    restrict: {
        restriction: canvas,
        elementRect: { left: 0, right: 1, top: 0, bottom: 1 }
    },
    snap: {
        targets: [
            interact.createSnapGrid({ x: 10, y: 10 })
        ],
    }

}).on('move', function(event) {

    var interaction = event.interaction;
    // if the pointer was moved while being held down
    // and an interaction hasn't started yet
    if (interaction.pointerIsDown && !interaction.interacting() &&
        event.currentTarget.classList.contains('drag-element-source')) {

        var original = event.currentTarget;

        // create a clone of the currentTarget element
        var clone = event.currentTarget.cloneNode(true);

        // Remove CSS class using JS only (not jQuery or jQLite) - http://stackoverflow.com/a/2155786/4972844
        clone.className = clone.className.replace(/\bdrag-element-source\b/, 'drag-clone');

        // insert the clone to the page
        // TODO: position the clone appropriately
        event.currentTarget.parentNode.appendChild(clone);
        //document.getElementById('bucket').appendChild(clone);

        // start a drag interaction targeting the clone
        interaction.start({ name: 'drag' }, event.interactable, clone);

    } else {
        interaction.start({ name: 'drag' }, event.interactable, event.currentTarget);
    }
}).actionChecker(function(event, action, interactable, element) {
    if (haarFound === 10) {
        return null;
    } else {
        return action;
    }
});

function dragMoveListener(event) {
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
    isHaarFeature(target);


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
        },
        snap: {
            targets: [
                interact.createSnapGrid({ x: 10, y: 10 })
            ],
        }
    })
    .on('resizemove', function(event) {
        var target = event.target;
        x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

        isHaarFeature(target);


    });

function isHaarFeature(target) {
    // A----AB-----B
    // |           |
    // |           |
    // AD          BC
    // |           |
    // |           |
    // D----DC-----C

    var currentrec = target.getBoundingClientRect();
    var pointA = { x: currentrec.left - rect.left, y: currentrec.top - rect.top }
    var pointB = { x: currentrec.right - rect.left, y: currentrec.top - rect.top }
    var pointC = { x: currentrec.right - rect.left, y: currentrec.bottom - rect.top }
    var pointD = { x: currentrec.left - rect.left, y: currentrec.bottom - rect.top }
    var pointAB = { x: pointA.x + ((pointB.x - pointA.x) / 2), y: pointA.y };
    var pointDC = { x: pointD.x + ((pointC.x - pointD.x) / 2), y: pointD.y };
    var pointAD = { x: pointA.x, y: pointA.y + ((pointD.y - pointA.y) / 2) };
    var pointBC = { x: pointB.x, y: pointB.y + ((pointC.y - pointB.y) / 2) };

    if (target.classList.contains("haar1")) {

        //Formula is C - B - D + A

        //TODO: fix issue in row zero
        //white square
        var indexA = indexCalculation(pointA);
        var indexB = indexCalculation(pointAB);
        var indexC = indexCalculation(pointDC);
        var indexD = indexCalculation(pointD);
        var whiteSquareIntensity = calculateIntegralImage(indexA, indexB, indexC, indexD);
        //black square
        var blackIndexA = indexCalculation(pointAB)
        var blackIndexB = indexCalculation(pointB)
        var blackIndexC = indexCalculation(pointC)
        var blackIndexD = indexCalculation(pointDC)
        var blackSquareIntensity = calculateIntegralImage(blackIndexA, blackIndexB, blackIndexC, blackIndexD);

    } else if (target.classList.contains("haar2")) {

        //white square
        var indexA = indexCalculation(pointAD);
        var indexB = indexCalculation(pointBC);
        var indexC = indexCalculation(pointC);
        var indexD = indexCalculation(pointD);

        var whiteSquareIntensity = calculateIntegralImage(indexA, indexB, indexC, indexD);
        //black square
        var blackIndexA = indexCalculation(pointA);
        var blackIndexB = indexCalculation(pointB);
        var blackIndexC = indexCalculation(pointBC);
        var blackIndexD = indexCalculation(pointAD);
        var blackSquareIntensity = calculateIntegralImage(blackIndexA, blackIndexB, blackIndexC, blackIndexD);

    } else if (target.classList.contains("haar3")) {
        // A----E----F----B
        // |              |
        // |              |
        // |              |
        // |              |
        // D----H----G----C
        // Extra points needed
        var pointE = { x: pointA.x + (pointB.x - pointA.x) / 3, y: pointA.y }
        var pointF = { x: pointB.x - (pointB.x - pointA.x) / 3, y: pointA.y }
        var pointG = { x: pointC.x - (pointC.x - pointD.x) / 3, y: pointC.y }
        var pointH = { x: pointD.x + (pointC.x - pointD.x) / 3, y: pointC.y }
            // white square 1
        var indexA = indexCalculation(pointA);
        var indexB = indexCalculation(pointE);
        var indexC = indexCalculation(pointH);
        var indexD = indexCalculation(pointD);
        var whiteSquareIntensity = calculateIntegralImage(indexA, indexB, indexC, indexD);

        // black square
        var blackIndexA = indexCalculation(pointE);
        var blackIndexB = indexCalculation(pointF);
        var blackIndexC = indexCalculation(pointG);
        var blackIndexD = indexCalculation(pointH);
        var blackSquareIntensity = calculateIntegralImage(blackIndexA, blackIndexB, blackIndexC, blackIndexD);

        // white square 2
        var index2A = indexCalculation(pointF);
        var index2B = indexCalculation(pointB);
        var index2C = indexCalculation(pointC);
        var index2D = indexCalculation(pointG);
        whiteSquareIntensity = whiteSquareIntensity + calculateIntegralImage(index2A, index2B, index2C, index2D);
        whiteSquareIntensity = Math.round(whiteSquareIntensity / 2);

    }
    updateDisplay(whiteSquareIntensity, blackSquareIntensity, target);

}

/*
 * This calculates the index in the results array where the integral image of the point can be found.
 */
function indexCalculation(point) {
    return Math.round(point.y) * canvas.width + Math.round(point.x);
}

/*
 * Calculates the integral image of a rectangle in the image, using the results array 
 * - which contains the integral image at every point in the image.
 */
function calculateIntegralImage(A, B, C, D) {
    return result[C] - result[B] - result[D] + result[A];
}

/*
 * Checks if a haar feature has been found and updates display to show it.
 */
function updateDisplay(whiteSquareIntensity, blackSquareIntensity, target) {
    if (blackSquareIntensity * 1.1 < whiteSquareIntensity) {
        if (target.style.border != "medium solid green") {
            target.style.border = "medium solid green";
            haarFound = haarFound + 1;
        }
    } else {
        if (target.style.border === "medium solid green") {
            target.style.border = "none";
            haarFound = haarFound - 1;
        }
    }
    var found = document.getElementById("found");
    found.innerHTML = haarFound;
    var black = document.getElementById("blackValue");
    black.innerHTML = blackSquareIntensity;
    var white = document.getElementById("whiteValue");
    white.innerHTML = whiteSquareIntensity;

    if (haarFound === 10) {
        context.font = "30px Arial";
        context.fillStyle = "dark green";
        context.textAlign = "center";
        context.fillText("Well Done!", canvas.width / 2, canvas.height / 2);
        canvas.style.zIndex = "100";
        canvas.style.opacity = "0.5";
    }
}

function loadImageDialog(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            load_resize_image(e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function load_resize_image(src) {
    var invis_img = document.getElementById("img");
    invis_img.src = src;
    img = new Image();
    img.src = src;
    img.onload = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (img.width > MAX_WIDTH) {
            img.height *= MAX_WIDTH / img.width;
            img.width = MAX_WIDTH;
            invis_img.height = img.height;
            invis_img.width = img.width;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.style.display = "inline-block";

        draw_grayscale_image(img);
        var myData = context.getImageData(0, 0, canvas.width, canvas.height);
        tracking.Image.computeIntegralImage(myData.data, myData.width, myData.height, result);
    };
    clear_features();
    clear_rectangles();

}

function clear_features() {
    var features = document.getElementsByClassName('drag-clone');

    while (features[0]) {
        features[0].parentNode.removeChild(features[0]);
    }
    haarFound = 0;

    var found = document.getElementById("found");
    found.innerHTML = haarFound;
    var black = document.getElementById("blackValue");
    black.innerHTML = 0;
    var white = document.getElementById("whiteValue");
    white.innerHTML = 0;
    canvas.style.zIndex = "-100";
    canvas.style.opacity = "1";
    draw_grayscale_image(img);
}

function draw_grayscale_image(img) {
    context.drawImage(img, 0, 0, img.width, img.height);
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
        // red
        data[i] = brightness;
        // green
        data[i + 1] = brightness;
        // blue
        data[i + 2] = brightness;
    }

    // overwrite original image
    context.putImageData(imageData, 0, 0);
}

function findFaces() {
    var img = document.getElementById('img');
    var tracker = new tracking.ObjectTracker(['face']);
    tracker.setStepSize(2);
    trackerTask = tracking.track('#img', tracker, { camera: true });
    tracker.on('track', function(event) {
        event.data.forEach(function(rect) {
            console.log("plotting");
            window.plot(rect.x, rect.y, rect.width, rect.height);
        });
    });
}

window.plot = function(x, y, w, h) {
    var rect = document.createElement('div');
    document.getElementById('image').appendChild(rect);
    rect.classList.add('rect');
    rect.style.width = w + 'px';
    rect.style.height = h + 'px';
    rect.style.left = (img.offsetLeft + 320 + x) + 'px';
    rect.style.top = (img.offsetTop + y) + 'px';
};

function clear_rectangles() {
  var rect = document.getElementsByClassName('rect');

    while (rect[0]) {
        rect[0].parentNode.removeChild(rect[0]);
    }
}