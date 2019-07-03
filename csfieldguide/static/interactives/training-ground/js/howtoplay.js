
var instructionState = {
	
	create: function() {
		var title = game.add.sprite(game.width/2 - game.cache.getImage('title').width/2 ,80, 'title');
		var nameLabel2 = game.add.text(game.width/2 - game.cache.getImage('title').width/2 + 20, 200, 'Instructions:', 
			{font: '25px Arial', fill: '#ffffff'});
		var instructionParag = "In this game, you start with a certain number of sticks and you take turns " + 
		"\nwith the AI picking 1, 2, or 3 sticks. Whoever picks the last stick wins. " + 
		"\nWatch how the AI's (Nathaniel's) picks change as he plays more games. " + 
		"\nUse the slider below the stick board to adjust the sensitivity of the AI's learning.";
		var text = game.add.text(game.width/2 - game.cache.getImage('title').width/2 + 20, 240, instructionParag,  { font: "18px Arial", fill: '#ffffff'});
		var menu_button = game.add.button(game.width/2 - game.cache.getImage('menu').width/6, 390, 'menu', this.start, this, 0, 1, 2);

	},

	start: function() {
		game.state.start('menu');
	}
};