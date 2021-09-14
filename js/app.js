// randomWords = ['cheeseburger', 'florida', 'potato', 'cat'];
// let randomWord = 'cheeseburger';

const $giph1 = $("#giph1");
const $giph2 = $("#giph2");
const $giph3 = $("#giph3");

// const $input = $("input[type=text]");

function handleGetData() {
    //prevent default behavior of a form
    // event.preventDefault();
  
    // userInput = $input.val();
  
    $.ajax({
      url: `https://api.giphy.com/v1/gifs/search?api_key=G7tdOAm3RVKG0bSk2wKHNZ3Brpb99YBt&q=cheeseburger&limit=3`,
    }).then(
      (data) => {
    //   if (data.Response == "False"){
    //       alert('Movie not Found!');
    //   }
        render(data);
        
        
      },
      (error) => {
        console.log("bad request: ", error);
      }
    );
  }
// handleGetData()


  $("#start-btn").on("click", handleGetData);

  function render(dataFromAJAX) {
    $giph1.attr("src", dataFromAJAX.data[0].images.original.url);
    $giph2.attr("src", dataFromAJAX.data[1].images.original.url);
    $giph3.attr("src", dataFromAJAX.data[2].images.original.url);
        
  }

