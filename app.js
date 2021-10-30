/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs");
let name = "Arthur";

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("pages/index", {list: ["Inception", "Spiderman", "The Dark Knight", "Tenet"], username: name}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here 
  var textarea = req.body.textarea;
  res.render("pages/index", {list: textarea.split(','), username: name});
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  res.render("pages/index", {list: [req.query.movie1, req.query.movie2], username: name});
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  var movieTitle = req.params.movieName;
  fs.readFile("movieDescriptions.txt", "utf-8", (err, data) => {
    if (err) {
      return console.log(err);
    } 
    var movieList = data.split('\n');
    for (let i = 0; i < movieList.length; i++) {
      if (movieList[i].toLowerCase().includes(movieTitle)) {
        var movieDesc = movieList[i].split(':')[1];
      } 
    }
    res.render("pages/searchResult", {movieSearch: movieTitle, movieSearchDesc: movieDesc});
  });
  // res.render("pages/searchResult", {movieSearch: movieTitle, movieSearchDesc: movieDesc});
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});