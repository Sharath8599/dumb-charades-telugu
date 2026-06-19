let movies = [];
let usedMovies = new Set();

const movieElement = document.getElementById("movie");
const generateButton = document.getElementById("generateBtn");
const totalMoviesElement = document.getElementById("totalMovies");

// Load movie data
fetch("./data/movies-clean.json")
  .then(response => response.json())
  .then(data => {
    movies = data;

    if (totalMoviesElement) {
      totalMoviesElement.textContent = `${movies.length} Movies Loaded`;
    }
  })
  .catch(error => {
    console.error("Failed to load movies:", error);

    movieElement.textContent =
      "Failed to load movie database.";
  });

// Generate random movie
function generateMovie() {

  if (movies.length === 0) {
    movieElement.textContent =
      "Loading movies...";
    return;
  }

  // Reset when all movies have been used
  if (usedMovies.size === movies.length) {
    usedMovies.clear();
  }

  let randomMovie;

  do {
    const randomIndex =
      Math.floor(Math.random() * movies.length);

    randomMovie = movies[randomIndex];

  } while (usedMovies.has(randomMovie));

  usedMovies.add(randomMovie);

  movieElement.textContent = randomMovie;
}

// Button click
generateButton.addEventListener(
  "click",
  generateMovie
);