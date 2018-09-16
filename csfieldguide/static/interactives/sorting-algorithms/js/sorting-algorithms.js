console.log('sorting algorithms');

$(function() {
	var drake = dragula([
		document.getElementById('box-1'),
		document.getElementById('box-2'),
		document.getElementById('box-3'),
		document.getElementById('box-4'),
		document.getElementById('box-5'),
		document.getElementById('box-6'),
		document.getElementById('box-7'),
		document.getElementById('box-8')
	]
	);
	console.log(drake);
	drake.on('drop', (target) => {
		console.log(target);
	});
});
