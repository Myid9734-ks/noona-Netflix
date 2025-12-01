const API_KEY = 'e1af4aeec005b2b430903a79bf054eec';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const NOW_PLAYING_URL = `${BASE_URL}/movie/now_playing`;

const movieContainer = document.getElementById('movie-container');

async function fetchNowPlayingMovies() {
    try {
        const response = await fetch(`${NOW_PLAYING_URL}?api_key=${API_KEY}&language=ko-KR&page=1`);

        if (!response.ok) {
            throw new Error('영화 데이터를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error:', error);
        movieContainer.innerHTML = '<div class="error">영화를 불러오는데 실패했습니다. 나중에 다시 시도해주세요.</div>';
    }
}

function displayMovies(movies) {
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        const posterPath = movie.poster_path
            ? `${IMG_BASE_URL}${movie.poster_path}`
            : 'https://via.placeholder.com/200x300?text=No+Image';

        movieCard.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-rating">★ ${movie.vote_average.toFixed(1)}</p>
            </div>
        `;

        movieContainer.appendChild(movieCard);
    });
}

fetchNowPlayingMovies();
