

class ImageGrid {
  constructor(parentDiv, imgPath, maxWidth) {
    this.$parent = parentDiv;
    this.imagePath = imgPath;
    this.maxWidth = maxWidth;
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
        fullHtml += img;
        i++;
      }
      fullHtml += end;
      row++;
      separator = '<div id="row-' + row + '" class="col-12">\n';
    }
    console.log(fullHtml);
    this.$parent.append(fullHtml)
  }
}

module.exports = {
  ImageGrid
}
