window.onload = () => {
  let page = 1;
  let query = "";
  const picContainer = document.querySelector(".pictures-div");
  const searchField = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");
  const loader = document.querySelector(".loader");
  const previousPage = document.querySelector(".previousPage");
  previousPage.style.display = "none";
  const nextPage = document.querySelector(".nextPage");
  nextPage.style.display = "none";

  loader.style.display = "none";

  const searchImage = () => {
    loader.style.display = "flex";
    picContainer.innerHTML = " ";

    const apiKey = "563492ad6f91700001000001ca06e45aef8d4018b4e7015052fa73fd";
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=40&orientation=landscape&page=${page}`;
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
      )
      .finally(() => (loader.style.display = "none"));
  };

  const showImages = (pictures) => {
    const wallpapers = pictures.photos;
    wallpapers.forEach((pic) => {
      appendImage(pic.src.large, pic.alt, pic.photographer, pic.url);
    });
    nextPage.style.display = "inline";
    if (page > 1) {
      previousPage.style.display = "inline";
    }
  };

  const appendImage = (url, alt, photographer, href) => {
    if (page === 1) {
      previousPage.style.display = "none";
    }
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank"; //To open image in new tab
    const pic = document.createElement("img");
    pic.setAttribute("class", "wallpapers");
    pic.src = url;
    pic.alt = alt;
    pic.title = photographer; //To see the photographer name when hovering the wallpaper
    link.appendChild(pic);
    picContainer.appendChild(link);
  };

  searchButton.addEventListener("click", () => {
    page = 1;
    query = searchField.value;
    searchImage();
  });
  //   To be able to search using the keyboard key "Enter"
  searchField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchButton.click();
    }
  });
  nextPage.addEventListener("click", () => {
    nextPage.style.display = "none"; //To not make the buttons load and show up before the picture
    previousPage.style.display = "none";
    page++;
    searchImage();
  });
  previousPage.addEventListener("click", () => {
    nextPage.style.display = "none"; //To not make the buttons load and show up before the picture
    previousPage.style.display = "none";
    page--;
    searchImage();
  });
};
