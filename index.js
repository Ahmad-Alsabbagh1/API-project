const searchImage = (query) => {
  const apiKey = "563492ad6f91700001000001ca06e45aef8d4018b4e7015052fa73fd";
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=80`;
  fetch(url, {
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};
searchImage("puppy");
