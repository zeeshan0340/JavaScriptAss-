(async function (){
  const response = await fetch("./movies.json");
  const movies = await response.json();

  const InputEl1 = document.getElementById("genre");
  const InputEl2 = document.getElementById("rating");
  const InputEl3 = document.getElementById("year");
  const InputEl4 = document.getElementById("language");

  const formEl = document.getElementById("movie-form");
  const movieDetails = document.getElementById("movie-details");

  function getRecommendation(event) {
    event.preventDefault();
    const selectedGenre = InputEl1.value;
    const selectedRating = InputEl2.value;
    const selectedYear = InputEl3.value;
    const selectedLanguage = InputEl4.value;

    const recommendedMovies = movies.filter(function(movie) {
      return (selectedGenre === "All" || movie.genre.includes(selectedGenre))
        && (selectedRating === "All" || movie.rating >= selectedRating)
        && (selectedYear === "All" || movie.year == selectedYear)
        && (selectedLanguage === "All" || movie.language.includes(selectedLanguage));
    });

    if (recommendedMovies.length === 0) {
      movieDetails.innerHTML = 'No movies found';
      return;
    }

    recommendedMovies.sort((a, b) => a.rating < b.rating ? 1 : -1);

    let movieDetailsHTML = `
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Movie</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    recommendedMovies.forEach((movie, index) => {
      movieDetailsHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>
            <div class="movie-info">
              <img src="${movie.image}">
              <div class="movie-title" style="color: cornflowerblue; font-size: 17px; margin-left: 70px; margin-top: -35px;">${movie.title}</div>
            </div>
            <br>
            ${movie.genre},
            ${movie.duration},
          </td>
          <td>${movie.year}</td>
        </tr>
      `;
    });
    

    movieDetailsHTML += `
          </tbody>
        </table>
    `;
    
    movieDetails.innerHTML = movieDetailsHTML;    
  }
  
  formEl.addEventListener("submit", getRecommendation);
})();
