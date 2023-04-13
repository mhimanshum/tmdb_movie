import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/ui/MovieCard';
import { BASE_URL, fetchMoviesLists, IMAGE_BASE_URL } from '../utils/api';

function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [upcomingMovie, setUpcomingMovie] = useState({});
  const [currentImage, setCurrentImage] = useState(' ');

  const getMovies = async () => {
    try {
      const { data } = await fetchMoviesLists();
      console.log(data.results);
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const getUpcomingMovies = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`,
      );
      console.log(data);
      setUpcomingMovie(data);
      setCurrentImage(data.results[0].backdrop_path);
      let i = 1;
      setInterval(() => {
        if (i > data.results.length) {
          i = 0;
        }
        setCurrentImage(data.results[i].backdrop_path);
        i++;
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };
 
  const goToDetailsPage = (id) => {
    navigate(`/movies/${id}`);
  };

  useEffect(() => {
    getMovies();
    getUpcomingMovies();
  }, []);

  return (
    <>
      <div className="bg-gray-600">
        <div className="object-contain">
          <img src={`${IMAGE_BASE_URL}${currentImage}`} alt="upcomingMovie" />
        </div>
        <div className="max-w-7xl container mx-auto px-3 py-5">
          {movies.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3 lg:gap-5">
              {movies.map((movie) => {
                return (
                  <MovieCard
                    key={movie.id}
                    image={`${IMAGE_BASE_URL}${movie?.poster_path}`}
                    name={movie?.title}
                    seeDetails={() => goToDetailsPage(movie.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
