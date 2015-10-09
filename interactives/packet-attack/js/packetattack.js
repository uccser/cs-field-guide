(function () {

		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'interactive-packet-attack', {create: create});

		function create() {
				game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

				game.score = 0; // Score is defined as num_of_exra_packets + percentage damage of original.

		    game.urlmode = false;

		    // index.html?shields=true&numbers=true&acksnacks=true&timeouts=true&stuns=2&kills=1&corrupts=3
		    function getQueryVariable(variable) {
		        var query = window.location.search.substring(1);
		        var vars = query.split('&');
		        for (var i = 0; i < vars.length; i++) {
		            var pair = vars[i].split('=');
		            if (decodeURIComponent(pair[0]) == variable) {
		                game.urlmode  = true;
		                return decodeURIComponent(pair[1].replace("/", ""));
		            }
		        }
		    console.log('Query variable %s not found', variable);
		    }

		    var urlLevel =  new Level(game, 'X');

		    urlLevel.setPacketsHaveShields(getQueryVariable("shields")=="true");
		    urlLevel.setPacketsHaveNumbers(getQueryVariable("numbers")=="true");
		    urlLevel.setAcksNacksEnabled(getQueryVariable("acksnacks")=="true");
		    urlLevel.setTimeoutsEnabled(getQueryVariable("timeouts")=="true");
		    urlLevel.setStuns(parseInt(getQueryVariable("stuns")));
		    urlLevel.setConfuses(parseInt(getQueryVariable("kills")));
		    urlLevel.setZaps(parseInt(getQueryVariable("corrupts")));

		    //Do intro:
		    var intro = new Information(this.game, InfoPaneType.START, {levelNumber:1});

		    game.state.add('0i', intro);

		    //Set up Levels
		    var levelOne = new Level(game, 1).setNumberOfPackets(1);
		    game.state.add('1i', new Information(this.game, InfoPaneType.BEFORE_LEVEL, levelOne));
		    game.state.add('1', new LevelBuilder(levelOne));

		    var levelTwo = new Level(game, 2).setNumberOfPackets(10); //Multiple Packets
		    game.state.add('2i', new Information(this.game, InfoPaneType.BEFORE_LEVEL, levelTwo));
		    game.state.add('2', new LevelBuilder(levelTwo));

		    var levelThree = new Level(game, 3)
		                                    .setNumberOfPackets(10)
		                                    .setPacketsHaveShields(true)
		                                    .setConfuses(0); //Zap wont work since sheilds are enabled
		    game.state.add('3i', new Information(this.game, InfoPaneType.BEFORE_LEVEL, levelThree));
		    game.state.add('3', new LevelBuilder(levelThree));

		    var levelFour = new Level(game, 4)
		                                    .setNumberOfPackets(10)
		                                    .setPacketsHaveNumbers(true)
		                                    .setConfuses(0);//Stunning wont work since packets are ordered
		    game.state.add('4i', new Information(this.game, InfoPaneType.BEFORE_LEVEL, levelFour));
		    game.state.add('4', new LevelBuilder(levelFour));

		    var levelFive = new Level(game, 5)
		                                    .setNumberOfPackets(10)
		                                    .setPacketsHaveNumbers(true)
		                                    .setPacketsHaveShields(true);
		    game.state.add('5i', new Information(this.game, InfoPaneType.BEFORE_LEVEL, levelFive)); //Only killing a packet will work
		    game.state.add('5', new LevelBuilder(levelFive));

		    var levelSix = new Level(game, 6)
		                                    .setNumberOfPackets(10)
		                                    .setPacketsHaveNumbers(true)
		                                    .setAcksNacksEnabled(true)
		                                    //.setPacketsHaveShields(true)
		                                    .setConfuses(2);
		    game.state.add('6i', new Information(this.game, InfoPaneType.BEFORE_LEVEL, levelSix)); //Only killing a packet will work
		    game.state.add('6', new LevelBuilder(levelSix));

		    var levelSeven = new Level(game, 7)
		                                    .setNumberOfPackets(10)
		                                    .setPacketsHaveNumbers(true)
		                                    .setAcksNacksEnabled(true)
		                                    .setPacketsHaveShields(true)
		                                    .setConfuses(2)
		                                    .setTimeoutsEnabled(true)
		                                    .setStuns(2)
		                                    .setZaps(2);
		    game.state.add('7i', new Information(this.game, InfoPaneType.BEFORE_LEVEL, levelSeven)); //Only killing a packet will work
		    game.state.add('7', new LevelBuilder(levelSeven));

		    if (game.urlmode) {
		        game.state.add('X', new LevelBuilder(urlLevel));
		        game.state.add('Xi', new Information(this.game, InfoPaneType.BEFORE_LEVEL, urlLevel));
		        game.state.start('Xi');
		        console.log("URL Mode");
		        console.log(urlLevel);
		    } else { //Start the game
		        game.state.start('0i');
		    }
		}

    //FOR DEBUG:
    //var information = new Information(game, "Game over. \n Do you want to start again?", InfoPaneType.FAIL);
    //game.state.add('information', information);
    //game.state.start('information')
}());
