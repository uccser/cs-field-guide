var imageSources = ["images/sport.jpg", "images/faces.jpg"];
var currentIndex = 0;

window.onload = function() {
    findFaces();
};

function findFaces(){
	var img = document.getElementById('img');
	var tracker = new tracking.ObjectTracker(['face']);
    tracker.setStepSize(2);
    trackerTask = tracking.track('#img', tracker, {camera: true });
    tracker.on('track', function(event) {
        event.data.forEach(function(rect) {
            window.plot(rect.x, rect.y, rect.width, rect.height);
        });
    });

    
}

window.plot = function(x, y, w, h) {
        var rect = document.createElement('div');
        document.getElementById('viola-jones').appendChild(rect);
        rect.classList.add('rect');
        rect.style.width = w + 'px';
        rect.style.height = h + 'px';
        rect.style.left = (img.offsetLeft + x) + 'px';
        rect.style.top = (img.offsetTop + y) + 'px';
    };

function replaceImage() {
	currentIndex = (currentIndex + 1) % imageSources.length;
    document.getElementById('img').src = imageSources[currentIndex];
    var v = document.getElementById('viola-jones');
	var r = document.getElementsByClassName('rect');
	while (r[0]) {
    	r[0].parentNode.removeChild(r[0]);
	};  
    trackerTask.stop();
    trackerTask.run();

}