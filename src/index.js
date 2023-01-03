/*
See all ramen images in the div with the id of ramen-menu. When the page loads, request the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.

Psuedocode
-create a variable for URL
-create renderRamen function
  -query select ramen menu and assign to a variable
  -create new image element and assign it to a variable
  -give image element a src
  -append image to menu
-create a fetch request
  -then resp => resp.json
  -then forEach ramen, renderRamen


Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div and where it says insert comment here and insert rating here.

Psuedocode
-add click event to ramen image
-select html element and give it text then make it = to ramen attributes
-give id's to each ramen detail (if doesnt have any) in the HTML document

Create a new ramen after submitting the new-ramen form. The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.

Psuedocode
-query select ramen form and assign it to a variable
-add event submit to ramen form
-e.preventDefault()
-create new ramen obj to hold ramen attributes  
  -name = name att
  -restaurant = rest att
  -image = img att
  -rating = rating att
  -comment = comment att
-create fetch POST request
  -.then resp=> resp.json
  -render Ramen
-e.target.reset()
  */

const URL = "http://localhost:3000/ramens";

const renderRamen = (ramen) => {
  const ramenMenu = document.querySelector("#ramen-menu");
  const ramenImg = document.createElement("img");
  ramenImg.src = ramen.image;
  ramenImg.addEventListener("click", (e) => {
    document.querySelector("#ramen-image").src = ramen.image;
    document.querySelector("#ramen-name").textContent = ramen.name;
    document.querySelector("#ramen-restaurant").textContent = ramen.restaurant;
    document.querySelector("#rating-display").textContent = ramen.rating;
    document.querySelector("#comment-display").textContent = ramen.comment;
  });
  ramenMenu.append(ramenImg);
};

fetch(URL)
  .then((resp) => resp.json())
  .then((ramenArr) => {
    ramenArr.forEach(renderRamen);
  });

const ramenForm = document.querySelector("#new-ramen");
ramenForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newRamenObj = {
    name: e.target.name.value,
    restaurant: e.target.restaurant.value,
    image: e.target.image.value,
    rating: e.target.rating.value,
    comment: e.target["new-comment"].value,
  };
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRamenObj),
  })
    .then((resp) => resp.json())
    .then(renderRamen);
  e.target.reset();
});
