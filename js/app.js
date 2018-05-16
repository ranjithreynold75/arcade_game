/* Move Counter is initally set 0
* Initally the number of chances provided is 3
* DOM selecter to read and update the chances counter
*/


var move = document.getElementById('moves');

var chance = 3;
var moveCounter = 0;
var ch = document.getElementById('chances');
move.innerHTML = '0';
ch.innerHTML = chance;

// Enemies Function

var Enemy = function(speed, x, y) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.update = function(dt) {
    /* You should multiply any movement by the dt parameter -- Multiplied Condition
    * which will ensure the game runs at the same speed for all computers.
    */
    this.x = this.x + this.speed * dt;

    if(this.x>505){
        this.x = -50;
        var rand = Math.floor(Math.random() * 600)
        this.speed = 150 + rand;
    }
    if (player.x < this.x + 55 && player.x + 55 > this.x && player.y < this.y + 55 && 65 + player.y > this.y) {
        /*
        * Upon player collision with bug Game is reset and the chance count is reduced
        */
        player.chances();
        player.reset();

    }
};


// This class requires an update(), render() and
// Now write your own player class [since player is already used Player variable is used]
var Player = function(playerSpeed, x, y) {
    this.speed = playerSpeed;
    this.x = x;
    this.y = y;

    /* A playerArray is created store all the set of characters
    * Upon refreshing the page or reloading the index.html page
    * A new charcter is being loaded
    * (Additional Funtionality)
    */

    var allPlayers = ['char-boy.png', 'char-cat-girl.png', 'char-horn-girl.png', 'char-pink-girl.png', 'char-princess-girl.png'];
    var randPlayer = Math.floor(Math.random() * 5);
    var image = allPlayers[randPlayer];
    this.sprite = 'images/' + image;
};

Player.prototype.update = function() {
    if(this.x<0){
        this.x=0;
    }
    if(this.x>=420)
    {
        this.x = 420;
    }
    if(this.y > 400){
        this.y = 400;
    }

    // When Player reaches the blue pane---->won the game

    if(this.y < -10){
        this.win();
    }
};

//Player Winning Constrain

Player.prototype.win = function() {
    move.innerHTML = '0';
    this.x = 200;
    this.y = 400;
    moveCounter = 0;
    //Since player wins the game chances or chance get inceresed by ONE
    chance = chance+1;
    alert("Congrats!! You did it \n Continue Playing \n Life has been added");
    ch.innerHTML = chance;
};

// Reset Function upon loosing game

Player.prototype.reset = function() {
    move.innerHTML = '0';
    this.x = 200;
    this.y = 400;
    moveCounter = 0;
};


/*
* decrease chances moveCounterer upon collision
*/

Player.prototype.chances = function() {
    chance = chance-1;
    ch.innerHTML = chance;
    if(chance === 0){
        alert("GAME-OVER \n Please Reload and Play");
        chance = 3; //reset chances
    }
};

// a handleInput() method.

Player.prototype.handleInput = function(key) {
    if(key === 'left'){
        this.x = this.x - 55;
        moveCounter = moveCounter + 1;
    } else if(key === 'right') {
        this.x = this.x + 55;
        moveCounter = moveCounter + 1;
    } else if(key === 'up') {
        this.y = this.y - 55;
        moveCounter = moveCounter + 1;
    } else if(key === 'down'){
        this.y = this.y + 55;
        moveCounter = moveCounter + 1;
    }
    move.innerHTML = moveCounter;
};

//render function

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

/*Speed at which the enemy will start*/

//Random funtion and speed completely depends upon the random number generated

var enemySpeed1 = Math.floor(Math.random() * 200);
var enemySpeed2 = Math.floor(Math.random() * 200);
var enemySpeed3 = Math.floor(Math.random() * 200);

//ladyBug variable is created
var ladyBug1 = new Enemy(enemySpeed1, 0, 60);
var ladyBug2 = new Enemy(enemySpeed2, 0, 145);
var ladyBug3 = new Enemy(enemySpeed3, 0, 230);

//Bugs been pushed into allEnemies array
allEnemies.push(ladyBug1);
allEnemies.push(ladyBug2);
allEnemies.push(ladyBug3);

// Place the player object in a variable called player
var player = new Player(40, 200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
