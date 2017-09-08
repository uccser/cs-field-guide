'use strict';
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

        add(size_to_add) {
            this.contains += size_to_add;
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

    $("#add-bin").click(function() {
        drawNewBin(bin_list.getItems().length)
        dragItems();
    });


    function generateItems(min, max) {
        var number_of_items = Math.floor((Math.random() * max) + min);
        //Each item can be from 0.1 * bin_size to 0.8 * bin_size;
        while (number_of_items > 0) {
            var new_item = new Item(Math.floor((Math.random() * (0.8 * bin_size) + (0.1 * bin_size))));
            item_list.addItem(new_item);
            number_of_items--;
        }
    }

    function drawItemList() {
        for (var i = item_list.getItems().length - 1; i >= 0; i--) {
            var item = item_list.getItems()[i];
            var $div = $("<div>", { "id": "item" + i, "class": "item draggable", "height": "40px", "width": item.size * width_multiplier + "px" });
            $div.css('background-color', '#008fc5');
            $div.css('margin-right', '10px');
            $div.css('display', 'inline-block');
            $div.append("<p>" + item.size + "</p>")
            $("#items_area").append($div);
        };

    }

    function drawBins() {
        for (var i = 2; i >= 0; i--) {
            drawNewBin(i);
        }
    }

    function drawNewBin(id) {
        var $bin = $("<div>", { "id": "bin" + id, "class": "bin", "height": "40px", "width": bin_size * width_multiplier + "px" });
        $bin.css('background-color', '#bec5c7');
        $bin.css('margin-top', '10px');
        $bin.append("<div class='left-bin'><p>" + 0 + "</p></div>");
        $bin.append("<div class='right-bin'><p>" + bin_size + "</p></div>");
        $($bin).insertBefore($("#add-bin"));
        bin_list.addItem(new Bin(id));
    }


    function setupGame() {
        item_list.resetItems();
        generateItems(4, 12);
        drawItemList();
        drawBins();
        dragItems();
    }

    setupGame();

    // Handles the dragging of the square around the big image.
    function dragItems() {
        // target elements with the "draggable" class
        interact('.draggable')
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

        interact('.bin').dropzone({
            overlap: 0.7,
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

    function packed(itemId, binId, item, bin) {
        $("#" + itemId).css('display', 'none');
        var $div = $("<div>", { "class": "fill", "width": item.size * width_multiplier + "px", "height": "40px" })
        $div.css('background-color', '#008fc5');
        $div.css('display', 'inline-block');
        $div.css('float', 'left')
        $("#" + binId).append($div);
        bin.add(item.size);
        item.packed = true;
        if (allPacked()) {
            var $h5 = $("<h5>");
            $h5.append('Congratulations you packed the items in ' + getNonEmptyBins() + ' bins!');
            $("#items_area").append($h5);
            var $p = $("<p>").append('The first fit algorithm used ' + firstFit(false) + ' bins and the first fit decreasing algorithm used ' + firstFit(true) + ' bins.');
            $("#items_area").append($p);
        }
    }

    function allPacked() {
        for (var i = item_list.getItems().length - 1; i >= 0; i--) {
            if (!item_list.getItems()[i].packed) {
                return false;
            }
        };
        return true;
    }

    function getNonEmptyBins() {
        var number_non_empty_bins = 0;
        for (var i = bin_list.getItems().length - 1; i >= 0; i--) {
            if (bin_list.getItems()[i].contains > 0) {
                number_non_empty_bins++;
            }
        }
        return number_non_empty_bins;
    }

    function firstFit(decreasing) {
    	var items = item_list.getItems();
    	if(decreasing) {
    		var items = item_list.getSorted();
    	}
        var bins = new ItemList();
        bins.addItem(new Bin(bins.getItems().length));

        for (var i = 0; i < items.length; i++) {
            var packed = false;
            for (var j = 0; j < bins.getItems().length; j++) {
                var current_item_size = items[i].size;
                if ((bins.getItem(j)).canAdd(current_item_size)) {
                    bins.getItem(j).add(items[i].size);
                    packed = true;
                    break;
                }
            }
            if (!packed) {
                bins.addItem(new Bin(bins.getItems().length));
                bins.getItem(bins.getItems().length-1).add(current_item_size);
            }
        }
        return bins.getItems().length;
    }

    console.log(firstFit(true));
    console.log(firstFit(false));






});
