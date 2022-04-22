function Game(player,totalLevels,difficulty,levelSteps){
  this.player = player;
  this.totalLevels = totalLevels;
  this.difficulty = difficulty;
  this.levelSteps = levelSteps;
  this.generateLevelSteps = function(){
    var currentStep = Math.floor((Math.random()*difficulty)+1);
    this.levelSteps.push(currentStep);
    setTimeout(function () {
      clickAnimation("#tile-"+currentStep,"tile-"+currentStep,"game-tiles-clicked");
      document.querySelector("h1").textContent= "LEVEL -- "+levelSteps.length;
    }, 1000);
    currentLevelSteps = [];
    return currentStep;
  }
  this.matchLevelSteps = function(currentLevelSteps){
    for (var i = 0; i < currentLevelSteps.length; i++) {
        if(currentLevelSteps[i] !== this.levelSteps[i]){
          return false;
        }
    }
    return true;
  }
}

var game;

var currentLevelSteps = [];





window.addEventListener("keydown", function(event) {
  if(event.key = " "){
    game = new Game(1,10,4,[]);
    game.generateLevelSteps();
  }
}, true);

function clickAnimation(id,sound, cssClass){
    document.querySelector(id).classList.add(cssClass);
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
    setTimeout(() => {
      if(cssClass == "game-tiles-clicked-wrong"){
        document.querySelector(id).classList.remove(cssClass);
        setTimeout(() => {document.querySelector(id).classList.add(cssClass);
            setTimeout(() => {  document.querySelector(id).classList.remove(cssClass);
          }, 200);
        }, 200);
      }
      document.querySelector(id).classList.remove(cssClass);
  }, 200);

}


function playSound(name) {

}


var gameTiles = document.getElementsByClassName('col-md-6');
for (var i = 0; i < gameTiles.length; i++) {
  gameTiles[i].addEventListener('click', (event) => {
    currentLevelSteps.push(parseInt(event.target.id.replace("tile-","")));
    if(game!= null){
    if(game.matchLevelSteps(currentLevelSteps))
    {
      clickAnimation("#"+event.target.id,event.target.id,"game-tiles-clicked-correct");
      if(currentLevelSteps.length == 10){
        endGame("WELL DONE! YOU BEAT THE GAME!!!");
        var audio = new Audio("sounds/win.mp3");
        audio.play();
         return;
      }
      if(currentLevelSteps.length === game.levelSteps.length){
        game.generateLevelSteps();
      }
    }else{
      clickAnimation("#"+event.target.id,"wrong","game-tiles-clicked-wrong");
      endGame("GAME OVER!! EAT MORE GREENS TO IMPROVE MEMORY...");
    }
  }else{
    clickAnimation("#"+event.target.id,"default","game-tiles-clicked-default");
  }
  });}

function endGame(message){
  document.querySelector("h1").textContent= message;
  game = null;
  setTimeout(function () {
    if(game === null){
      document.querySelector("h1").textContent= "Welcome! Click space to start!";
  }
  }, 5000);
}
