$(document).ready(function(){
	grid('blocks', 20, 20, 700, 500);
});

function grid(type, w, h, totalW, totalH){

    var $this = this;
    this.type = type || 'blocks'; // blocks, diamonds, hexagons
    this.blockW = w || 25;
    this.blockH = h || 25;
    this.container;
        $('#grid').empty();
  
    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.id = 'gridContainer';
        
  
    var c = document.createElement("canvas");
        c.width  = totalW;
        c.height = totalH;
    
    var totalW = totalW || $(document).width();
    var totalH = totalH || $(document).height();

        
    var mapGridCanvas = c.getContext("2d");
    mapGridCanvas.clearRect(0, 0, c.width, c.height);
    mapGridCanvas.globalAlpha = 1;
    mapGridCanvas.strokeStyle = "#1e1e1e";
    mapGridCanvas.lineWidth = 1;
        mapGridCanvas.beginPath();
        var x = 0;
        var y = 0;
    
    for(var i = 0; i < Math.round(totalW / blockW); i++){
                
        x = i * blockW;
        y = 0;
        mapGridCanvas.moveTo(x, y);
        mapGridCanvas.lineTo(x, y + totalH);
        
    }
        
    for(var j = 0; j < Math.round(totalH / blockH); j++){
                
        x = 0;
        y = j * blockH;
                
        mapGridCanvas.moveTo(x, y);
        mapGridCanvas.lineTo(x + totalW, y);   
                
    }
        
    mapGridCanvas.stroke();
    this.container.appendChild(c);
    document.getElementById('grid').appendChild(this.container);
        
}