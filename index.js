const searchImage = (query) => {
  const apiKey = "563492ad6f91700001000001ca06e45aef8d4018b4e7015052fa73fd";
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=80&orientation=landscape&page=1`;
  fetch(url, {
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => showImages(data))
    .catch((error) =>
      alert(
        "Oops, something went wrong: " +
          "Make sure the search bar is not empty, otherwise check internet connection and refresh the page. " +
          error
      )
    );
};

const showImages = (pictures) => {
  const wallpapers = pictures.photos;
  console.log(pictures);
  wallpapers.forEach((pic) => {
    appendImage(pic.src.large, pic.alt, pic.photographer, pic.url);
  });
};

const appendImage = (url, alt, photographer, href) => {
  const picContainer = document.querySelector(".pictures-div");
  const picDiv = document.createElement("div");
  const pic = document.createElement("img");
  const link = document.createElement("a");
  pic.src = url;
  pic.alt = alt;
  pic.title = photographer; //To see the photographer name when hovering the wallpaper
  link.href = href;
  link.target = "_blank"; //To open image in new tab
  link.appendChild(pic);
  pic.setAttribute("class", "wallpapers");
  picDiv.appendChild(link);
  picContainer.appendChild(picDiv);
};

window.onload = () => {
  document.querySelector(".loader").style.display = "none";
  const searchField = document.querySelector("#search");
  const searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", () => {
    document.querySelector(".pictures-div").innerHTML = "";
    searchImage(searchField.value);
  });
  //   To be able to search using the keyboard key "Enter"
  searchField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchButton.click();
    }
  });
};
