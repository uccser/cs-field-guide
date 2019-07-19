

class ImageGrid {
  constructor(parentDiv, imgPath, maxWidth) {
    this.$parent = parentDiv;
    this.imagePath = imgPath;
    this.maxWidth = maxWidth;
  }

  createGrid(size) {
    this.allSticks = [];
    this.$parent.html('');
    var fullHtml = "";
    var i = 0;
    var row = 1;
    var separator = '<div id="row-' + row + '" class="row col-12">\n';
    var container = '<div class="stick-image-container">\n';
    var end = '</div>\n'
    while (i < size) {
      fullHtml += separator;
      while (i < (this.maxWidth * row) && i < size) {
        fullHtml += container + '<img src="' + this.imagePath + '" id="img-' + i + '"/>\n' + end;
        this.allSticks.push(i);
        i++;
      }
      fullHtml += end;
      row++;
      separator = '<div id="row-' + row + '" class="row col-12">\n';
    }
    this.$parent.html(fullHtml)
  }

  removeSticks(num) {
    for (var i=0; i < num; i++) {
      $('#img-' + this.allSticks[0]).addClass('d-none'); // Hide item 0 from user
      this.allSticks.shift(); // Remove item 0 from list to get a new item 0
    }
  }
}

module.exports = {
  ImageGrid
}
