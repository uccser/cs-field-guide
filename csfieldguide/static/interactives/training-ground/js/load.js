
var loadState = {

	preload: function() {
		game.load.spritesheet('button_1', 'assets/buttons/button_1.png', 100, 50);
		game.load.spritesheet('button_2', 'assets/buttons/button_2.png', 100, 50);
		game.load.spritesheet('button_3', 'assets/buttons/button_3.png', 100, 50);
		game.load.spritesheet('rematch', 'assets/buttons/rematch_button.png', 100, 50);
		game.load.spritesheet('quit', 'assets/buttons/button_quit.png', 100, 50);
		game.load.spritesheet('how_to_play', 'assets/buttons/howtoplay_button.png', 150, 75);
		game.load.spritesheet('start', 'assets/buttons/start_button.png', 150, 75);
		game.load.spritesheet('menu', 'assets/buttons/menu_button.png', 150, 75);
		game.load.spritesheet('preTrain0', 'assets/buttons/sim_0.png', 100, 50);
		game.load.spritesheet('preTrain50', 'assets/buttons/sim_50.png', 100, 50);
		game.load.spritesheet('preTrain100', 'assets/buttons/sim_100.png', 100, 50);
		game.load.spritesheet('preTrain500', 'assets/buttons/sim_500.png', 100, 50);

		game.load.image('stick_key', 'assets/sprites/stick.png');
		game.load.image('slider', 'assets/sprites/slider.png');
		game.load.image('slider_arrow', 'assets/sprites/slider_arrow.png');
		game.load.image('title', 'assets/sprites/title.png');
		game.load.image('bg', 'assets/misc/bg.png');
		game.load.image('sim_title', 'assets/misc/train.png');
		game.load.image('sim10', 'assets/buttons/button_simulate.png');
		game.load.image('numsticks_slider', 'assets/sprites/numsticks_slider.png');
		game.load.image('numSticks_arrow', 'assets/sprites/numSticks_arrow.png');
		game.load.image('sticks_dialogue', 'assets/sprites/sticks_dialogue.png');
	},

	create: function() {

		$('#excelDataTable').hide();

		var loadingLabel = game.add.text(80, 150, 'loading...',
		{font: '30px Arial', fill: '#ffffff' });

		simulation = false;

		initVars();

		map = {};
		for(var i = startingSticks; i > 0; i--){
			map[i.toString()] = [i, 33.33, 33.33, 33.34];
		}
		//Hard code rules, cannot choose more sticks than are available
		map['2'] = [2, 50, 50, 0];
		map['1'] = [1, 100, 0, 0];

		sticksLeft = startingSticks;

		game.state.start('menu');
	},
};
