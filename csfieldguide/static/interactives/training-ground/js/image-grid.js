

class ImageGrid {
  constructor(parentDiv, imgPath, maxWidth) {
    this.$parent = parentDiv;
    this.imagePath = imgPath;
    this.maxWidth = maxWidth;
    this.allSticks = [];
  }

  createGrid(size) {
    this.$parent.html('');
    var img;
    var fullHtml = "";
    var i = 0;
    var row = 1;
    var separator = '<div id="row-' + row + '" class="col-12">\n';
    var end = '</div>\n'
    while (i < size) {
      fullHtml += separator;
      while (i < (this.maxWidth * row) && i < size) {
        img = '  <img src="' + this.imagePath + '" id="img-' + i + '" class="stick-image"/>\n';
        this.allSticks.push(i);
        fullHtml += img;
        i++;
      }
      fullHtml += end;
      row++;
      separator = '<div id="row-' + row + '" class="col-12">\n';
    }
    this.$parent.append(fullHtml)
  }

  removeSticks(num) {
    for (var i=0; i < num; i++) {
      $('#img-' + this.allSticks[0]).remove();
      this.allSticks.shift(); // Remove item 0
    }
  }
}

module.exports = {
  ImageGrid
}
