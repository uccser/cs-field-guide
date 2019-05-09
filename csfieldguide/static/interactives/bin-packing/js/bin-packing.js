'use strict';

const Interact = require('interactjs');

$(function() {

    const bin_size = 100;
    const width_multiplier = 4;


    class Item {
        constructor(size) {
            this.size = size;
            this.packed = false;
        }
    }

    class Bin {
        constructor(id) {
            this.size = bin_size;
            this.id = id;
            this.contains = 0;
        }

        canAdd(size_to_add) {
            return this.contains + size_to_add <= this.size;
        }

        setContains(number) {
            this.contains = number;
            $("#bin" + this.id).children(".right-bin").children("p").text(this.spaceRemaining());
            $("#bin" + this.id).children(".left-bin").children("p").text(this.contains);
        }

        add(size_to_add) {
            this.setContains(this.contains + size_to_add);
        }

        spaceRemaining() {
            return this.size - this.contains;
        }


    }

    class ItemList {
        constructor() {
            this.items = [];
        }

        resetItems() {
            this.items = [];
        }

        getItems() {
            return this.items;
        }

        addItem(item) {
            this.items.push(item);
        }

        getItem(index) {
            return this.items[index];
        }

        getSorted() {
            return this.items.slice().sort(function(obj1, obj2) {
                // Descending
                return obj2.size - obj1.size;
            });
        }
    }

    var item_list = new ItemList();
    var bin_list = new ItemList();

    // Creates a new empty bin.
    $("#add-bin").click(function() {
        drawAndGenerateNewBin(bin_list.getItems().length)
    });

    // Unpacks all the items from the bins.
    $("#reset").click(function() {
        $("div.fill").remove();
        $("div.item").css("display", "inline-block");
        $("div.item").css("transform", "translate(0px,0px)");
        $("div.item").attr('data-x', 0);
        $("div.item").attr('data-y', 0);
        $("#winning-message").text('');

        for (var i = bin_list.getItems().length - 1; i >= 0; i--) {
            bin_list.getItems()[i].setContains(0);
        };

        for (var i = item_list.getItems().length - 1; i >= 0; i--) {
            item_list.getItems()[i].packed = false;
        };
    });

    // Starts a new game.
    $("#new").click(function() {
        setupGame(getUrlParameters());
    })

    // Starts a new game with the item sizes specified by the user.
    $("#done").click(function() {
        var itemSizes = $("#sizes").val().replace(/\s+/g, '').split(',');
        var arr = itemSizes.filter(function(el) {
            return el !== "";
        });
        // Check that all entered values are integers between 1 and 100 inclusive
        if (arr.some(isNaN) || arr.some(v => v < 1 || v > 100 || !Number.isInteger(Number(v)))) {
            emptyGameArea();
            var $h6 = $("<h6>");
            $h6.append(gettext('Something went wrong! Please ensure you entered a comma separated list of integers between 1 and 100.').fontcolor("red"));
            $("#items_area").append($h6);
        } else {
            setupGame(arr);
        }
    });

    // Generates a number of items of random sizes. The number of items generated will between min and max.
    function generateItems(min, max) {
        var number_of_items = Math.floor((Math.random() * max) + min);
        //Each item can be from 0.02 * bin_size to 0.72 * bin_size;
        while (number_of_items > 0) {
            var new_item = new Item(Math.floor((Math.random() * (0.7 * bin_size)) + (0.02 * bin_size)));
            item_list.addItem(new_item);
            number_of_items--;
        }
    }

    // Draws the HTML divs for each item in the item_list.
    function drawItemList() {
        for (var i = item_list.getItems().length - 1; i >= 0; i--) {
            var item = item_list.getItems()[i];
            var $div = $("<div>", { "id": "item" + i, "class": "item draggable", "width": item.size / bin_size * 100 + "%" });
            $div.append("<p>" + item.size + "</p>")
            $("#items_area").append($div);
        };

    }

    // Draws and generates the 3 beginning bins.
    function drawAndGenerateBins() {
        for (var i = 0; i <= 2; i++) {
            drawAndGenerateNewBin(i);
        }
    }

    // Creates a new HTML bin, as well as a new Bin Object.
    function drawAndGenerateNewBin(id) {
        var $bin = $("<div>", { "id": "bin" + id, "class": "bin", "width": "100%" });
        $bin.append("<div class='left-bin'><p>" + 0 + "</p></div>");
        $bin.append("<div class='right-bin'><p>" + bin_size + "</p></div>");
        $($bin).insertBefore($("#add-bin"));
        bin_list.addItem(new Bin(id));
    }

    // Resets the game area to set up a new game.
    function emptyGameArea() {
        item_list.resetItems();
        bin_list.resetItems();
        $("#items_area").children().remove();
        $("#bins_area").children("div").remove();
    }

    // Starts a new game. Resets everything and uses the item sizes provided if applicable.
    function setupGame(itemSizes) {
        emptyGameArea();
        if (itemSizes.length == 0) {
            generateItems(4, 12);
        } else {
            for (var i = itemSizes.length - 1; i >= 0; i--) {
                var new_item = new Item(Number(itemSizes[i]));
                item_list.addItem(new_item);
            };
        }

        drawItemList();
        drawAndGenerateBins();
    }

    setupGame(getUrlParameters());
    dragItems();

    // Handles the dragging of the items into the bin.
    function dragItems() {
        // target elements with the "draggable" class
        Interact('.draggable')
            .draggable({
                // enable inertial throwing
                inertia: false,
                // keep the element within the area of it's parent
                // enable autoScroll
                autoScroll: true,
                // call this function on every dragmove event
                onmove: dragMoveListener,
                // call this function on every dragend event
                onend: function(event) {
                    if (!event.target.classList.contains('can-drop')) {
                        event.target.style.webkitTransform =
                            event.target.style.transform =
                            'translate(0px, 0px)';
                        event.target.setAttribute('data-x', 0);
                        event.target.setAttribute('data-y', 0);
                    }
                }
            });

        Interact('.bin').dropzone({
            overlap: 0.5,
            accept: '.draggable',

            ondragenter: function(event) {
                var item = event.relatedTarget;
                // feedback the possibility of a drop
                item.classList.add('can-drop');
            },
            ondragleave: function(event) {
                // remove the drop feedback style
                event.relatedTarget.classList.remove('can-drop');
            },
            ondrop: function(event) {
                var itemTarget = event.relatedTarget;
                var binTarget = event.target;
                var bin = bin_list.getItem((binTarget.id).substring(3, ));
                var item = item_list.getItem((itemTarget.id).substring(4, ));

                // Only allow drop if the item fits in the bin. Otherwise item goes back to original position.
                if (bin.canAdd(item.size)) {
                    packed(itemTarget.id, binTarget.id, item, bin);
                } else {
                    itemTarget.style.webkitTransform = itemTarget.style.transform = 'translate(0px, 0px)';
                    itemTarget.setAttribute('data-x', 0);
                    itemTarget.setAttribute('data-y', 0);
                }
            },

        });

        function dragMoveListener(event) {
            var target = event.target;
            // keep the dragged position in the data-x/data-y attributes

            var x = Math.floor((parseFloat(target.getAttribute('data-x')) || 0) + event.dx);
            var y = Math.floor((parseFloat(target.getAttribute('data-y')) || 0) + event.dy);

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            // update the position attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
    }

    // Called when each item is packed. Updates the appropriate bin and hides the item.
    function packed(itemId, binId, item, bin) {
        $("#" + itemId).css('display', 'none');
        var $div = $("<div>", { "class": "fill", "width": item.size / bin_size * 100 + "%" })
        $("#" + binId).append($div);
        bin.add(item.size);
        item.packed = true;
        if (allPacked()) {
            var binCount = getNonEmptyBins();
            var format = gettext('Congratulations, you packed the items in ');
            format += ngettext('1 bin!', '%(bin_count)s bins!', binCount);
            var binCountText = interpolate(format, {"bin_count": binCount}, true);
            var winningMessage = $('#winning-message');
            winningMessage.text(binCountText);
        }
    }

    // Return whether all items have been packed.
    function allPacked() {
        for (var i = item_list.getItems().length - 1; i >= 0; i--) {
            if (!item_list.getItems()[i].packed) {
                return false;
            }
        };
        return true;
    }

    // Get the number of bins that contain 1 or more items.
    function getNonEmptyBins() {
        var number_non_empty_bins = 0;
        for (var i = bin_list.getItems().length - 1; i >= 0; i--) {
            if (bin_list.getItems()[i].contains > 0) {
                number_non_empty_bins++;
            }
        }
        return number_non_empty_bins;
    }

    // Item sizes can be specified in the url separate by '&' character.
    function getUrlParameters() {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            itemSizes = sPageURL.split('&');

        // Removes empty strings
        var arr = itemSizes.filter(function(el) {
            return el !== "";
        });

        return arr;
    }

});
