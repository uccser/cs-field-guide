function Player(){
    this.takeTurn = function(choice){
    	game.debug.text("Choose # of Sticks", 40, 40);
        sticksLeft -= choice;
        if(sticksLeft <= 0){
            gameOver = true;
            humanLost = true;
        }
    }
}