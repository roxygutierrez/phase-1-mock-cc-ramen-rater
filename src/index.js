/*
See all ramen images in the div with the id of ramen-menu. When the page loads, request the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.

Psuedocode
-document.querySelect dib ramen-menu and assign it a variable
-create renderRamen function 
  -document.createElement("img") and assign it a variable
  -img.src = image
  -append image to div ramen-menu
-fetch URL
-.then resp => resp.json
-forEach ramen => renderRamen

Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div and where it says insert comment here and insert rating here.

Psuedocode
-add an event listner click to ramenImg inside renderRamen func
-document.querySelector(HTML ID) and give it textContent
  -make that equal the ramen object attributes

Create a new ramen after submitting the new-ramen form. The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.

Psuedocode
-fetch POST URL 
-document.querySelector(ramenform) and give it a variable
-add event listner submit on form
create newRamenOb ={
  name:
  restaurant:
  image:
  rating:
  comment:
}
-e.preventDefault() to prevent refresh
-e.target.reset() to reset form after submission


*/
const URL = "http://localhost:3000/ramens";

const renderRamen = (ramen) => {
  const ramenMenu = document.querySelector("#ramen-menu");
  const ramenImg = document.createElement("img");
  ramenImg.src = ramen.image;
  ramenImg.addEventListener("click", (e) => {
    document.querySelector("#ramen-image").src = ramen.image;
    document.querySelector("#name").textContent = ramen.name;
    document.querySelector("#restaurant").textContent = ramen.restaurant;
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
  newRamenObj = {
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
