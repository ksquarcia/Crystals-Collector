var Game = function (config) {
    // Wins/losses counter
    this.wins = config.wins || 0;
    this.losses = config.losses || 0;

    // Sets the configuration
    this.config = config;

    // Variables
    this.start();

    // Event handlers
    this.addEvents();
};

// "Reset"
Game.prototype.start = function (min, max) {
    this.currentScore = 0;

    // Generates the number to match
    this.matchNumber = this.genRandomNumber(this.config.minNumber, this.config.maxNumber);

    // Shows the numbers
    this.showScore();
    this.showMatchNumber();

    this.setCrystalValues();
};

// Generates a random number between a min and a max and returns it
Game.prototype.genRandomNumber = function (min, max) {
    return Math.floor(Math.random() * max) + min;
};

// Shows number
Game.prototype.showMatchNumber = function () {
    $('.crystal-match-number').html(this.matchNumber);
};

// Sets the crystal values
Game.prototype.setCrystalValues = function () {
    // Generates random numbers for the 4 crystals
    this.crystalValues = [];

    // Tries to insert 4 new non-repeated numbers
    while (this.crystalValues.length !== 4) {
        var number = this.genRandomNumber(
            this.config.crystalValuesRange.min,
            this.config.crystalValuesRange.max
        );

   
        if (this.crystalValues.indexOf(number) === -1) {
            this.crystalValues.push(number);
        }
    }
};

Game.prototype.removeEventListeners = function () {
    $('.crystal').off('click');
};

Game.prototype.addEvents = function () {
    // Crystal click
    $('.crystal').on('click', (event) => {
        // Gets the clicked crystal's index
        var $crystal = $(event.target);

        var crystalIndex = $crystal.data('crystal') - 1;

        this.currentScore += this.crystalValues[crystalIndex];

        // Shows current score and check for win/lose state
        this.showScore();
        this.checkState();
    });
};

// Updates the current score
Game.prototype.showScore = function () {
    $('.crystal-score-number').html(this.currentScore); // that's it!
};

// Checks the win/lose state
Game.prototype.checkState = function () {
    // Lose!
    if (this.currentScore > this.matchNumber) {
        // Adds lose
        this.losses++;

        // Updates number
        $('.crystal-losses-number').html(this.losses); // ok, I've tested again and everything is working perfectly

        // Restart variables
        this.start();
    }
    // Win!
    else if (this.currentScore === this.matchNumber) {
        alert('You win');

        // Adds win
        this.wins++;

        // Updates number
        $('.crystal-wins-number').html(this.wins);

        // Restart variables
        this.start();
    }
};

var defaultConfig = {
    minNumber: 20,
    maxNumber: 50,
    crystalValuesRange: {
        min: 3,
        max: 10
    }
};

new Game(defaultConfig); 
