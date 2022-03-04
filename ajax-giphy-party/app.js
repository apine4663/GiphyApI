console.log("Let's get this party started!");
const $gifArea = $("#gifArea");
const $searchInput = $("#search");

// use ajax result to add a gif

function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>");
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

//handle form submission: clear search box & make ajax call

$("form").on("submit", async function (evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val("");

  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "c1JGkEvxiaTy0vc7wRqV8rR79LnYKc6R",
    },
  });
  addGif(response.data);
});

//remove gif

$("#clear").on("click", function () {
  $gifArea.empty();
});
