// global vars
var wordPool = {
    firstWord : {
        wordName: "KobeBryant", 
        image: '<img src="assets/images/kobe.jpeg">'
    },
    secondWord : {
        wordName: "TracyMcgrady",
        image: '<img src="assets/images/t-mac.jpeg">'
    },
    thirdWord: {
        wordName: "YaoMing",
        image: '<img src="assets/images/yao.jpeg">'
    }
};

var gameStats = {
    life: 9,
    typedLetters: [],
    computerWord: "",
    computerLetter: {
        letterArray: [],
        letterMatchIndex: [],
    },
    displayLetter: [],
    lowerTypedLetter: "",
    lowerComputerLetter: [],
    letterMatch: false,
    wordMatch: false
};
// functions
var commonFunction = {
    resetWord: function() {
        var wordPoolArray = Object.keys(wordPool);
        var randomNumber = Math.random();
        var wordPoolIndex = Math.floor(randomNumber * wordPoolArray.length);
        var randomKey = wordPoolArray[wordPoolIndex];
        var randomWord = wordPool[randomKey].wordName;
        var randomPic = wordPool[randomKey].image;
        return [randomWord, randomPic];
    },
    pushWordToArray: function(a){
        var b = Array.from(a);
        return b;
    },
    gameStatsReset: function(){
        gameStats.life = 9;
        gameStats.typedLetters = [];
        gameStats.computerWord = "";
        gameStats.computerLetter.letterArray = [];
        gameStats.computerLetter.letterMatchIndex = [];
        gameStats.letterMatch = false;
        gameStats.wordMatch = false;
        gameStats.lowerComputerLetter = [];
        gameStats.lowerTypedLetter = "";
        gameStats.displayLetter = [];
        gameStats.image = '';
    },
    initialization: function(){
        var resetReturn = commonFunction.resetWord();
        gameStats.computerWord = resetReturn[0];
        gameStats.image = resetReturn[1];
        console.log(gameStats.image);
        gameStats.computerLetter.letterArray = commonFunction.pushWordToArray(gameStats.computerWord);
        for (var i = 0; i < gameStats.computerLetter.letterArray.length; i++){
            gameStats.lowerComputerLetter.push(gameStats.computerLetter.letterArray[i].toLowerCase());
            gameStats.displayLetter.push("_");
        };
        document.getElementById("wrongLetter").innerHTML = gameStats.typedLetters;
        document.getElementById("guessLetter").innerHTML = gameStats.displayLetter.join(" ");
        document.getElementById("life#").innerHTML = gameStats.life;
        document.getElementById("hintPicture").innerHTML = gameStats.image;
    },
    letterMatchEvent: function(e){
        for (var i = 0; i<gameStats.computerLetter.letterArray.length; i++){
            if (gameStats.lowerComputerLetter[i] === e){
                if (gameStats.computerLetter.letterMatchIndex.indexOf(i) === -1){
                    gameStats.computerLetter.letterMatchIndex.push(i);
                    gameStats.displayLetter[i] = gameStats.computerLetter.letterArray[i];
                }
            }
        };
        document.getElementById("guessLetter").innerHTML = gameStats.displayLetter.join(" ");
        if (gameStats.computerLetter.letterArray.length === gameStats.computerLetter.letterMatchIndex.length){
            gameStats.wordMatch = true;
        };
    },
    letterMismatchEvent: function(f){
        gameStats.typedLetters.push(f);
        gameStats.life--;
    },
    winEvent: function(){
        alert("you win and the word is " + gameStats.computerWord);
        commonFunction.gameStatsReset();
        commonFunction.initialization();
    },
    lossEvent: function(){
        alert("you loss");
        commonFunction.gameStatsReset();
        commonFunction.initialization();
    },
};
// script starts here:
commonFunction.gameStatsReset();
commonFunction.initialization();

document.onkeyup = function(event) {
    gameStats.lowerTypedLetter = event.key.toLowerCase();
    if(gameStats.lowerComputerLetter.indexOf(gameStats.lowerTypedLetter) !== -1){
        commonFunction.letterMatchEvent(gameStats.lowerTypedLetter);
        if (gameStats.wordMatch === true){
            commonFunction.winEvent()
        }
    }
    else {
        if (gameStats.life !== 0){
        commonFunction.letterMismatchEvent(event.key);
        document.getElementById("wrongLetter").innerHTML = gameStats.typedLetters;
            if (gameStats.life === 0){
                commonFunction.lossEvent();
            }
        }
    };
    document.getElementById("life#").innerHTML = gameStats.life;
};

