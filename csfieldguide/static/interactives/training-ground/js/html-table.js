
var TXT_REMAINING = gettext("Sticks<br>remaining:");
var TXT_CHANCE = gettext("Chance to pick (%):");
var TXT_STICKS = {
  '1': gettext("1 stick"),
  '2': gettext("2 sticks"),
  '3': gettext("3 sticks")
}

const HIGHLIGHTS = {
  WIN: 'green',
  LOSS: 'red',
  UNDECIDED: 'blue'
}

class HtmlTable {
  constructor(parentDiv) {
    this.$parent = parentDiv;
  }

  createTable(size) {
    this.rows = size;
    var baseTable = '<table>\n';
    baseTable +=    '  <tr>\n'
              +     '    <th rowspan="2">' + TXT_REMAINING + '</th>\n'
              +     '    <th colspan="3">' + TXT_CHANCE + '</th>\n'
              +     '  </tr>\n'
              +     '  <tr>\n'
              +     '    <th>' + TXT_STICKS['1'] + '</th>\n'
              +     '    <th>' + TXT_STICKS['2'] + '</th>\n'
              +     '    <th>' + TXT_STICKS['3'] + '</th>\n'
              +     '  </tr>\n';
    for (var i=this.rows; i > 0; i--) {
      baseTable +=  '  <tr id="row-' + i + '">\n'
                +   '    <td id="' + i + '-remaining">' + i + '</td>\n'
                +   '    <td id="' + i + '-1-sticks">N/A</td>\n'
                +   '    <td id="' + i + '-2-sticks">N/A</td>\n'
                +   '    <td id="' + i + '-3-sticks">N/A</td>\n'
                +   '  </tr>\n';
    }
    baseTable +=    '</table>\n';
    this.$parent.html(baseTable);
  }

  highlightCell(remaining, number, colour) {
    $('#' + remaining + '-remaining').addClass(colour);
    $('#' + remaining + '-' + number + '-sticks').addClass(colour);
  }

  recolourCells(colour) {
    $('.' + HIGHLIGHTS.UNDECIDED).addClass(colour).removeClass(HIGHLIGHTS.UNDECIDED);
  }

  uncolourCells() {
    $('.' + HIGHLIGHTS.UNDECIDED).removeClass(HIGHLIGHTS.UNDECIDED);
    $('.' + HIGHLIGHTS.WIN).removeClass(HIGHLIGHTS.WIN);
    $('.' + HIGHLIGHTS.LOSS).removeClass(HIGHLIGHTS.LOSS);
  }

  populateTable(networkMap) {
    var entry;
    for (var value in networkMap) {
      entry = networkMap[value];
      $('#' + entry[0] + '-1-sticks').html(entry[1]);
      $('#' + entry[0] + '-2-sticks').html(entry[2]);
      $('#' + entry[0] + '-3-sticks').html(entry[3]);
    }
  }
}

module.exports = {
  HtmlTable,
  HIGHLIGHTS
}
