// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = 0;
    }

    // Check for collision with enemies or barrier-walls
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function() {
    // function not needed right now
}

// Draw the player on the screen, required method for game
// Display the score and level
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel);

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
};

// Function to display player's score
var displayScoreLevel = function(pScore, pLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level to div element created
    scoreLevelDiv.innerHTML = 'Score:    ' + pScore
        + '     /    ' +'   Level: ' + pLevel;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

var checkCollision = function(anEnemy) {
    // check for collision between enemie and player
    if (
        player.y + 125 >= anEnemy.y + 60
        && player.x + 15 <= anEnemy.x + 55
        && player.y + 66 <= anEnemy.y + 90
        && player.x + 45 >= anEnemy.x + 7) {
        console.log(' a collision has occured');
        player.x = 200;
        player.y = 385;
    }

var checkKeyColl= function(){

}

    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function
    if (player.y + 55 <= 0) {
        player.x = 200;
        player.y = 385;
        console.log('yay you made it !');

        ctx.fillStyle = 'white';
    // (x, y, width, height)
        ctx.fillRect(0, 0, 505, 175);

        score += 1;
        gameLevel += 1;
        console.log('Current score: ' + score + ', Current Level: ' + gameLevel);
        increaseDifficulty(score);
    }

    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > 380 ) {
        player.y = 380;
    }
    if (player.x > 402) {
        player.x = 402;
    }
    if (player.x < 2) {
        player.x = 2;
    }
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {

// To minimize the enemies number to 6, so they don't cover up the path to the river.
        if(i<=5){
        var enemy = new Enemy(0, Math.random() * 130 + 50, Math.random() * 150);

        allEnemies.push(enemy);
    }}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new score and gameLevel variables to store score and level
var allEnemies = [];
//Player(x,y,speed)
var player = new Player(200, 385, 100);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
// Enemy(x,y,speed)
var enemy = new Enemy(-15, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});
