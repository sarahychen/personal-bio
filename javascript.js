
// load existing reviews (get)
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState==4 && this.status==200) {
    var reviews = JSON.parse(this.responseText); // JSON parse the responseText
    console.log(reviews);
    for (var i = 0; i < reviews.length; i++) { // loop through the reponse array
      console.log(reviews[i].name);
      renderReview(reviews[i]);
    }
  } else if(this.readyState==4) {
    console.log(this.responseText);
  }
};
xhttp.open("GET", "https://cse104.kraigh.com/recommendations?api_key=6f2b927e7516b35f6e978bcfcddba2b5a848a81a89fc43ffb7d8aa1772e1b871", true);
xhttp.send();


// submit a review (post)
document.getElementById("review-form").addEventListener("submit", submitForm);
function submitForm(event) {
  event.preventDefault();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState==4 && this.status == 200) {
      // returns the review that you just posted
      // you would want to print that review
      var review = JSON.parse(this.responseText);
      console.log(review);
      // reviews is an array
      renderReview(review);
    } else if (this.readyState == 4) { // what does this do????
      console.log(this.responseText);
    }
  };
  xhttp.open("POST", "https://cse104.kraigh.com/recommendations", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// document.getElementById("myForm").elements.namedItem("name").value;
  var apiKey = "6f2b927e7516b35f6e978bcfcddba2b5a848a81a89fc43ffb7d8aa1772e1b871";
  var name = document.getElementById("review-form").elements.namedItem("name").value;
  var text = document.getElementById("review-form").elements.namedItem("text").value;
  xhttp.send("api_key=" + apiKey+ "&name=" + name + "&text=" + text);
}


// render the review
function renderReview(review) {
  console.log("Rendering review...");

  // create a new li for this review
  var reviewItem = document.createElement("li");
  // Set two classes on the new li item
  reviewItem.setAttribute("class", "list-group-item row");

  // create div for name
  var nameDiv = document.createElement("div");
  nameDiv.setAttribute("class", "col-md-3 review-name"); // add classes to div
  nameDiv.innerHTML = review.name; // Set innerHTML of div to reviewer's name
  reviewItem.appendChild(nameDiv); // Add nameDiv to a new review li

  // create div for the text
  var textDiv = document.createElement("div");
  textDiv.setAttribute("class", "col-md-9 review-comments"); // add classes to div
  textDiv.innerHTML = review.text; // set innerHTML of div to be the reviewer's text
  reviewItem.appendChild(textDiv); // add commentsDiv to new review li

  //add review li to reviews list ul
  document.getElementById("reviews-list").appendChild(reviewItem);

  // don't show the "test" submissions
  if (review.name == "test"){
    document.getElementById("reviews-list").removeChild(reviewItem);
  }
  if (review.name == ""){
    document.getElementById("reviews-list").removeChild(reviewItem);
  }
}
