
//  This code will run as soon as the page loads.
window.onload = function() {
  //  Click events are done for us:
game.audio.preloadAudio()
  //button listener for selecting characters for both player and enemy
/*  $(".green").on("mousedown",game.test3);*/
  //attack button listener
  $(".red").on("mousedown",game.test3);

  $(".yellow").on("mousedown",game.test3);
  $(".blue").on("mousedown",game.test3);


 /* $(".green").on("mousedown",game.audio.allLoaded);*/
  $(".red").on("mousedown",game.audio.allLoaded);
  $(".yellow").on("mousedown",game.audio.allLoaded);
  $(".blue").on("mousedown",game.audio.allLoaded);

  var el = document.getElementById("green");
  el.addEventListener("touchstart", game.audio.allLoaded, false);
/*  el.addEventListener("touchend", game.audio.allLoaded, false);*/
  /*el.addEventListener("touchcancel", game.audio.allLoaded, false);*/
/*  el.addEventListener("touchmove", game.audio.allLoaded, false);*/


  /*$(".green").on("mousedown",game.audio.changeColor);*/
};

var audioFiles = [
"http://www.teanglann.ie/CanC/nua.mp3",
"http://www.teanglann.ie/CanC/ag.mp3",
"http://www.teanglann.ie/CanC/dul.mp3",
"http://www.teanglann.ie/CanC/freisin.mp3"
];


function preloadAudio(url) {
  var audio = new Audio();
    // once this file loads, it will call loadedAudio()
    // the file will be kept by the browser as cache
    audio.addEventListener('canplaythrough', loadedAudio, false);
    audio.src = url;

  }
  function loadedAudio() {
    console.log("loadedAUDIO!!!")
  }

function sound() {
  this.sound = document.createElement("audio");
  this.sound.src = "http://www.teanglann.ie/CanC/freisin.mp3";
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "false");
/*  this.sound.style.display = "none";
*/  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

     var myInterval;
        i=0;
        function change() {
          var color = ["#66FF00","green"];
          
          if(i==0) {
            game.audio.tags[0].play()
          }
          $("#green").css("background-color","#f3172d")
          i++;
          console.log(i)

          if(i == color.length) {
            i=0;
            clearInterval(myInterval)
          }
          
      }


  var game = {
    buttons: {
      button1: {
        color: "green",
        sound: "assets/sound/18990__johnnypanic__noise-tone.wav",
        colorchange:["#66FF00","green"]
      },
      button2: {
        color: "red",
        sound: "assets/sound/18990__johnnypanic__noise-tone.wav",
        colorchange:["#ff0101","#cc0000"]
      },
      button3: {
        color: "yellow",
        sound: "assets/sound/220212__gameaudio__ping-bing.wav",
        colorchange:["yellow","#FFD801"]
      },
      button4: {
        color: "blue",
        sound: "assets/sound/220212__gameaudio__ping-bing.wav",
        colorchange:["blue","#0000A0"]
      }
    },
    audio: {
      tags:[],
      sounds:[],
      loadedCount:0,
      monkey:0,
      i:0,
      allLoaded: function () {
          /*game.audio.tags.forEach(Function.call.bind(game.audio.tags[0].play));*/
          this.children[0].currentTime=0;
          this.children[0].play()
          game.audio.changeColor(this)

      },
      changeColor: function (someObject) {
        console.log(someObject)
        console.log("monkey")
/*        game.audio.monkey=someObject*/
        var color=$(someObject).attr("data-colorchange").split(",");
          $(someObject).css("background-color",color[0])
/*            game.audio.tags[0].currentTime=0;
            game.audio.tags[0].play()
*/
          
          
          function colorOnTime() {
            $(someObject).css("background-color",color[1])
          }
          setTimeout(colorOnTime,330)

      },

      preloadAudio : function() {
        for (var i = 0; i < Object.keys(game.buttons).length; i++) {
          var soundSelected=game.buttons[Object.keys(game.buttons)[i]].sound
          var buttonColor=game.buttons[Object.keys(game.buttons)[i]].color
          var aud=new Audio();
          game.audio.tags.push(aud);    // add this track to collection
          aud.preload=true;  // important
          aud.controls=false; // only so we can see the player's time display to verify it works
          aud.addEventListener('canplaythrough', loadedAudio, false);
          document.body.appendChild(aud);
          aud.src=soundSelected;
          $(aud).addClass(buttonColor);
          console.log("load audio tag: ", aud);
          $("#"+buttonColor).append(aud)

        }
      }

    },
    sequences:[],
    randomNumber: function (maxColors) {
      return Math.floor((Math.random() * maxColors) + 1)
    },
    randomColor: function () {

      for (var i = 0; i < Object.keys(game.buttons).length; i++) {
        var getButtonKey = game.buttons[Object.keys(game.buttons)[i]];
        var buttonColor = getButtonKey.color;
        var sound = getButtonKey.sound;
        var colorChange = getButtonKey.colorchange;
        var getButtonElement = $("#" + buttonColor);
        getButtonElement.attr("data-color",buttonColor)
        getButtonElement.attr("data-sound",sound)
        getButtonElement.attr("data-colorchange",colorChange)
      }
    },
    player:0,
    computer:0,
    notematch:1,
    start:1,
    guess:0,
    counter:0,
    test: function () {
      if(game.start ===1) {
        console.log("player adds to sequence")
        game.player = 1;
        console.log("computer adds to sequence + plays sequence")

        game.start =0;
      }
      else {
        game.counter++
        if(game.counter <=4) {//note matched
          console.log("matched note "+ game.counter)
          if(game.counter ==4) {//sequence correct

            console.log("computer adds to sequence + plays sequence")
            game.counter = 0;
          }
        }
        else {
          console.log("note not matched " + game.counter);
          console.log("restarting game playing losing sound");
          game.start=1;
          game.counter = 0;
        }

      }
    },
    test2: function(){

      console.log("testing func")
    },
    playSequence: function (someArray){
      console.log(someArray)
      console.log($("#" + someArray).children()[0])
      $("#" + someArray).children()[0].currentTime=0;
      $("#" + someArray).children()[0].play()
          game.audio.changeColor($("#"+someArray))
      
    },
    array:[],
    test3: function () {
      var colorSelected=($(this).attr("data-color"));
      var soundSelected=($(this).attr("data-sound"));
      console.log(colorSelected)
      if(game.start ===1) {
/*        game.sound(soundSelected);
*/        game.array=[];
          console.log("player presses key")

          console.log("computer adds to sequence + plays sequence")

          var randomNumber = game.randomNumber(Object.keys(game.buttons).length)-1;
          var randomColor = game.buttons[Object.keys(game.buttons)[randomNumber]].color;
          game.array.push(randomColor);
          game.start =0;
          console.log(game.array)
          timeout()
          }
      else {
        if(colorSelected === game.array[game.counter]) {

          console.log("correct")
          if((game.counter + 1) === game.array.length) {
            game.counter =0;
            console.log("computer adds to sequence + plays sequnce")

            var randomNumber = game.randomNumber(Object.keys(game.buttons).length)-1;
            var randomColor = game.buttons[Object.keys(game.buttons)[randomNumber]].color;
            game.array.push(randomColor);
            console.log(game.array)
            timeout()
          }
          else {
            game.counter++;
          }
        }
        else {
          console.log("not correct")
          game.start =1;
          game.counter = 0;
        }

      }
}


}
i=0;
function timeout() {
    setTimeout(function () {
        // Do Something Here
        // Then recall the parent function to
        // create a recursive loop.
        game.playSequence(game.array[i]);
        i++
        if(i==game.array.length)
        {
          i=0
          return
        }
        timeout();
    }, 800);
}
game.randomColor()


/*
for (var i = 0; i < 100; i++) {
  console.log(Math.floor((Math.random() * 4) + 1))
}*/
/* no sequence OR player not guessed wrong
  //what happens after playing a sequence
  //computer adds to the sequence and replays it
  //player guesses sequences
  //    if correct 
  //      computer adds to the sequence and replays it
  //    if wrong 
  //      end game
  //

  player played = 0
  computer played = 0
  //if no sequence (player=0 computer = 0)
  //    player adds to sequence set to (1)
  //    computer plays sequence set to (1)
  //      player played (0)
  //computer guess sequence after computer added stuff
  //if computer played sequence==(1) player played (0)
  //    player adds to sequence set to (1)
  //      player played (1)
  //      computer played (0)
  //    computer plays sequence
  //      computer played (1)
  //
  //when do you play next sequence?
  //  when player guesses previous sequence correctly
  //
  //
  guess correct =0
  player =0
  computer = 0
  notematch = 1
onclicks
  player adds to sequence (everything is empty start fresh)
    player = 1
  computer adds to sequence + plays sequence
    player = 0
    computer = 1

  player plays sequence (if player ===0 & computer ===1)

    check note match===(1) && guess correct =0
        note match (1) run function for checking note match
    
    sequence match (note match ===1) && guess correct ===1
      computer = 0
      player = 1
  computer plays sequence (player ===1 & computer ===0)
    computer adds to sequence + plays sequence
    player = 0
    computer = 1



    player sequence matches?(guess correct =1) (check if next consecutive sequence is a match)
      computer adds to sequences + plays sequence
    player sequence does not match?
      end game


      */
