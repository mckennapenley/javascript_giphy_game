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
  "paris",
];

let randomWord;

const $giph1 = $("#giph1");
const $giph2 = $("#giph2");
const $giph3 = $("#giph3");
const $input = $("input[type=text]");

// const $input = $("input[type=text]");

function generateGame() {
  //get random num
  const randomNum = Math.floor(Math.random() * randomWords.length);

  //use random num to pull search term
  randomWord = randomWords[randomNum];

  //create random offset to pass into api call
  const randomOffset = Math.floor(Math.random() * 1000);
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

  userInput = $input.val();

  if (userInput !== randomWord) {
    $("#guess-box")
      .fadeOut(100)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
  } else if (userInput === randomWord) {
    $("#guess-box").css("background-color", "green");
    setTimeout(function () {
      alert("You Win!");
    }, 100);
  }
}

$("form").on("submit", getGuess);
