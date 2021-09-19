const randomWords = [
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
  "dj",
  "explosion",
  "sparkle",
  "model",
];

let randomWord;
let $answer;

const $giph1 = $("#giph1");
const $giph2 = $("#giph2");
const $giph3 = $("#giph3");
const $input = $("input[type=text]");
let guessCount = 0;
let guessesLeft = 5;
let isGameOver = false;
let isGameStarted = false;

$("#gifs").hide();
$("#play-again").hide();


function generateGame() {
  isGameOver = false;
  isGameStarted = true;
  $("#play-again").hide();

  guessesLeft = 5;
  $("#guess-count").text(`Guesses Left: 5`);
  $("#win-lose").text("");

  $input.val("");
  const randomNum = Math.floor(Math.random() * randomWords.length);

  randomWord = randomWords[randomNum];

  $answer = $("#answer");
  $answer.hide();

  $answer.text(`Answer: ${randomWord}`);

  const randomOffset = Math.floor(Math.random() * 100);

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
}

function render(dataFromAJAX) {
  
  $("img").attr("src", "");

  
  $giph1.attr("src", dataFromAJAX.data[0].images.fixed_height.url);
  $giph2.attr("src", dataFromAJAX.data[1].images.fixed_height.url);
  $giph3.attr("src", dataFromAJAX.data[2].images.fixed_height.url);

  $("#instructions").hide();
  $("#gifs").show();
}

function getGuess(event) {
  //prevent default behavior of a form
  event.preventDefault();

  if (isGameOver) {
    return;
  }

  if (isGameStarted) {
    userInput = $input.val().toLowerCase();

    if (userInput) {
      guessesLeft--;

      $("#guess-count").text(`Guesses Left: ${guessesLeft}`);

      interpretUserInput();
    }
  }
}

function giveUpResponse() {
  if (!isGameStarted) {
    return;
  } else if (!isGameOver) {
    loseGame();
    guessesLeft = 0;
    $("#guess-count").text(`Guesses Left: ${guessesLeft}`);
  }
};

function interpretUserInput() {
  if (userInput === randomWord) {
    winGame();
  }
  if (guessesLeft > 0 && userInput !== randomWord) {
    wrongAnswerResponse();
  }
  if (guessesLeft === 0 && userInput !== randomWord) {
    loseGame();
  }
}

function wrongAnswerResponse() {
  $("#guess-box").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $("form").trigger("reset");
}

function loseGame() {
  $("#win-lose").text("Game Over - You Lose!");
  $answer.show();
  isGameOver = true;
  $("#play-again").show();
}

function winGame() {
  $("#win-lose").text("Winner!");
  isGameOver = true;
  $("#play-again").show();
}

$("#play-again").on("click", generateGame);
$("form").on("submit", getGuess);
$("#start-btn").on("click", generateGame);
$("#give-up-btn").on("click", giveUpResponse);