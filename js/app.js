randomWords = [
  "cheeseburger",
  "florida",
  "potato",
  "cat",
  "biology",
  "halloween",
  "banana",
  "space",
  "pizza",
  "dinosaur",
  "carrot",
  "pizza",
  "cupcake",
  "party",
  "snail",
  "sneeze",
  "hoverboard",
  "cowbell",
  "jam",
  "wedding",
  "taco",
  "macarena",
  "queen",
  "hula",
  "nature",
  "angry",
  "hug",
  "zoom",
  "alien",
  "surfboard",
  "spicy",
  "bread",
  "knitting",
  "rainbow",
  "disgusting",
  "worried",
  "salad",
  "scared",
  "dust",
  "confused",
  "fuzzy",
  "beautiful",
  "sandy",
  "DJ",
  "explosion",
  "sparkle",
  "model"
];

let randomWord;
let $answer;

const $giph1 = $("#giph1");
const $giph2 = $("#giph2");
const $giph3 = $("#giph3");
const $input = $("input[type=text]");
let guessCount = 0;
let guessesLeft = 5;
let isWinner = false;
let isGameStarted = false;

$('#gifs').hide()

// const $input = $("input[type=text]");

function generateGame() {
  isWinner = false;
  isGameStarted = true;
  guessCount = 0;
  guessesLeft = 5;
  $("#guess-count").text(`Guesses Left: 5`);
  $("#win-lose").text("");

  //clear input box
  $input.val("");
  //set input box color back to white
  $("#guess-box").css("background-color", "white");
  //get random num
  const randomNum = Math.floor(Math.random() * randomWords.length);

  //use random num to pull search term
  randomWord = randomWords[randomNum];

  //hide the answer
  $answer = $("#answer");
  $answer.hide();
  // assign random word to the answer
  $answer.text(`Answer: ${randomWord}`);

  //create random offset to pass into api call
  const randomOffset = Math.floor(Math.random() * 100);
  //prevent default behavior of a form
  // event.preventDefault();

  // userInput = $input.val();

  $.ajax({
    url: `https://api.giphy.com/v1/gifs/search?api_key=G7tdOAm3RVKG0bSk2wKHNZ3Brpb99YBt&q=${randomWord}&limit=3&offset=${randomOffset}&rating=pg`,
  }).then(
    (data) => {
      render(data);
    },
    (error) => {
      console.log("bad request: ", error);
    }
  );
  $('#instructions').hide();
  $('#gifs').show();
  
}
// handleGetData()

$("#start-btn").on("click", generateGame);


function render(dataFromAJAX) {
  $("img").attr("src", "");
  $giph1.attr("src", dataFromAJAX.data[0].images.fixed_height.url);
  $giph2.attr("src", dataFromAJAX.data[1].images.fixed_height.url);
  $giph3.attr("src", dataFromAJAX.data[2].images.fixed_height.url);
}

function getGuess(event) {
  //prevent default behavior of a form
  event.preventDefault();
  userInput = $input.val().toLowerCase();
  if (isWinner) {
    return;
  }
  if (isGameStarted){

  if (userInput !== "") {
    if (guessesLeft > 0) {
      guessCount++;
      guessesLeft = 5 - guessCount;
      $("#guess-count").text(`Guesses Left: ${guessesLeft}`);
    }

    if (guessesLeft > 0 && userInput !== randomWord) {
      wrongAnswerResponse();
    } else if (guessesLeft >= 0 && userInput === randomWord) {
      winGame();
    } else if (guessesLeft === 0 && userInput !== randomWord) {
      loseGame();
    }
  }
}
}

$("form").on("submit", getGuess);

$("#give-up-btn").click(function () {
  if (!isWinner){
  // $answer.show();
  loseGame();
  guessesLeft = 0;
  $("#guess-count").text(`Guesses Left: ${guessesLeft}`);
}});

function wrongAnswerResponse() {
  $("#guess-box").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  $("form").trigger("reset")
}

function loseGame() {
  $("#win-lose").text("Game Over - You Lose!");
  $answer.show();
}

function winGame() {
  isWinner = true;
  $("#win-lose").text("Winner!");
}
