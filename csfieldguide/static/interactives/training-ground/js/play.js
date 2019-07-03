var playState = {
	
	create: function() {
		//player = new Player();
	    ai = new AI();

	    button_1 = game.add.button(5, game.height-130, 'button_1', function(){
	      takeTurn(1);
	    }, this, 0, 1, 2);
	    button_2 = game.add.button(110, game.height-130, 'button_2', function(){
	      takeTurn(2);
	    }, this, 0, 1, 2);
	    button_3 = game.add.button(215, game.height-130, 'button_3', function(){
	      takeTurn(3);
	    }, this, 0, 1, 2);

			button_1.onInputDown.add(function(){
				button_2.inputEnabled = false;
				button_3.inputEnabled = false;
			});

			button_2.onInputDown.add(function(){
				button_1.inputEnabled = false;
				button_3.inputEnabled = false;
			});

			button_3.onInputDown.add(function(){
				button_1.inputEnabled = false;
				button_2.inputEnabled = false;
			});

	    rematch_btn = game.add.button(400, game.height-120, 'rematch', rematch, this, 0, 1, 2);
	    quit_btn = game.add.button(400, game.height-60, 'quit', goToMenu, this, 0, 1, 2);

	    simulate_btn = game.add.button(110, game.height-130, 'sim10', simulate, this);

	    // Create and show the stick objects
	    sticks = game.add.group();

	    //Creates AI change slider
	    slider = game.add.sprite(10,game.height - 75, 'slider');
    	slider_arrow = game.add.sprite(35,game.height - 72, 'slider_arrow');
    	//Allow the slider to be dragged at certain increments and sets bounds for slider arrow
    	slider_arrow.inputEnabled = true;
    	bounds = new Phaser.Rectangle(0, game.height -75, 325, 50);
    	slider_arrow.input.enableDrag(false, false, false, 255, bounds, null);
    	slider_arrow.input.setDragLock(true, false);
    	slider_arrow.input.enableSnap(17.5, 17.5, true, true);

	    startGame();

	},

	update: function() {
		if(!simulation){
	      if(gameOver == false){
	        if(sticksLeft <= 0){
	            gameOver = true;
	            if(!turn){
	                playerWin = true;
	            }

	            endGame();
	        }
	      }

	    }

	},

	render: function(){
		//Displays the number of sticks left
		game.debug.text("Sticks Left: " + sticksLeft, 32, 32,"#fff","16px Arial");
		//Displays how many games the AI has played
		game.debug.text("Games Played: " + gamesPlayed, 400, 32, "#fff","16px Arial");
		if(simulated){
			game.debug.text("Simulated 10 games", 130, 300,"#fff","32px Arial");

		}
		//Displays what the AI (Nathaniel) is choosing and whose turn it is
		else{
		    if(!turn && gameOver == false){
		      if(stickschosen == 1){
		        game.debug.text("Nathaniel chose " + stickschosen + " stick.", 75, 450,"#fff","16px Arial");
		      }
		      else{
		        game.debug.text("Nathaniel chose " + stickschosen + " sticks.", 75, 450,"#fff","16px Arial");
		      }
		      game.debug.text("Now you choose.", 255, 450,"#fff","16px Arial");
		    }
		    if(gameOver == true){
		      if(playerWin == true){
		        game.debug.text("You win!", 200, 300,"#fff","32px Arial");
		      }
		      else{
		        game.debug.text("Nathaniel wins", 150, 300, "#fff","32px Arial");
		      }

		    }
		    if(turn && gameOver == false){
		      game.debug.text("Nathaniel is thinking...", 170, 450,"#fff","16px Arial");

	    	}
    	}

	},



};
