window.onload = function() {
	var url_string = window.location.href;
    var url = new URL(url_string);
    var num_boxes = url.searchParams.get('num-boxes'); // get num boxes parameter
    var num_guesses = url.searchParams.get('num-guesses'); // get num guesses parameter
    var sorted = url.searchParams.get('sorted'); // get sorted/not sorted parameter

    if (sorted == true) {
    	sorted = gettext('Sorted');
    } else if (sorted == false) {
    	sorted = gettext('Random');
    }

    // fill in the rules
	document.getElementById('interactive-searching-algorithms-num-boxes').innerText = num_boxes;
	document.getElementById('interactive-searching-algorithms-num-guesses').innerText = num_guesses;
	document.getElementById('interactive-searching-algorithms-order').innerText = sorted

	// place boxes and assign random weights

	// for num in range(num_boxes)
	//	   generate random weight
	//     get random number between 1 and 15
	//     build image element

	var box_div = document.getElementById('interactive-searching-algorithms-boxes');
	for (var i = 0; i < num_boxes; i++) {
		var random_square_number = Math.floor(Math.random() * Math.floor(15));
		var weight = Math.floor(Math.random() * Math.floor(999)) + 1;
		var src_string = colourful_box_images[random_square_number];
		
		var new_img_element = document.createElement('img');
		new_img_element.setAttribute('src', src_string);
		new_img_element.setAttribute('data-weight', weight);
		box_div.appendChild(new_img_element);
	}

	//<img id="box-a-img" class="to-sort" data-weight="" src="{% static 'img/interactives/colourful-box-images/square1-256px.png' %}">
}
