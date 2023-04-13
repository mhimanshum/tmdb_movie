import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, IMAGE_BASE_URL } from '../utils/api';
import Popup from './Popup';

function MovieDetails() {
  const params = useParams();
  const [isModelOpen, SetIsModelOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [movieVideoDetails, setMovieVideoDetails] = useState({});
  const [allCasts, setAllCasts] = useState([]);
  const [topFiveCasts, setTopFiveCasts] = useState([]);
  const [trailers, setTrailers] = useState([]);

  const getMovieDetails = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`,
      );
      // console.log(data);
      setMovieDetails(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieVideoDetails = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/movie/${params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`,
      );
      setMovieVideoDetails(data);
      const vid = [];
      const v = data.results;
      v.map((el) => {
        if (el.type === 'Trailer') {
          vid.push(el);
        }
      });
      setTrailers(vid);
    } catch (err) {
      console.log(err);
    }
  };

  const getCastsList = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/movie/${params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`,
      );
      // console.log(data.cast);
      const c = data.cast;
      const tcast = [];
      c.forEach((cast) => {
        if (cast.profile_path != null) {
          tcast.push(cast);
        }
      });
      setAllCasts(tcast);
      const casts = [];
      for (let i = 0; i < 5; i++) {
        casts.push(tcast[i]);
      }
      setTopFiveCasts(casts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieDetails();
    getCastsList();
    getMovieVideoDetails();
  }, [params.id]);

  return (
    <div className="bg-gradient-to-b from-black/90 to-black min-h-screen">
      <div className="relative">
        <img
          src={`${IMAGE_BASE_URL}${movieDetails.backdrop_path}`}
          className="min-h-screen md:h-screen w-full object-cover"
          alt="photos"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-black">
          <div className="max-w-7xl container mx-auto px-3 py-20">
            <p className="text-white text-3xl font-semibold">
              {movieDetails?.title}
            </p>
            <div className="py-2">
              {movieDetails?.genres && movieDetails?.genres?.length > 0 && (
                <>
                  <div className="flex flex-wrap gap-2">
                    {movieDetails?.genres.map((gen) => {
                      return (
                        <button
                          key={gen?.id}
                          className="bg-gray-200 text-black px-4 py-1 rounded-sm text-sm"
                        >
                          {gen?.name}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            <p className="text-white w-full md:w-1/2">
              {movieDetails?.overview}
            </p>
            <button
              className="bg-white text-black font-semibold px-5 py-2 text-sm mt-5 rounded"
              onClick={() => SetIsModelOpen(true)}
            >
              Watch Trailor
            </button>
            <div>
              {isModelOpen && (
                <Popup
                  trailers={trailers}
                  closePopup={() => SetIsModelOpen(false)}
                />
              )}
            </div>
            <div className="py-5">
              <div className="flex justify-between items-center w-[60%]">
                <p className="text-white pb-2 text-xl font-semibold">Casts</p>
                <a
                  href="#casts"
                  className="mb-2 px-4 py-1.5 border border-white text-white rounded-sm"
                >
                  view all
                </a>
              </div>
              {topFiveCasts.length > 0 && (
                <div className="grid grid-cols-8 gap-5">
                  {topFiveCasts.map((cast) => {
                    return (
                      <div className="text-white">
                        <img
                          key={cast?.id}
                          src={
                            cast.profile_path == null
                              ? require('../images/actor.jpg')
                              : `${IMAGE_BASE_URL}${cast.profile_path}`
                          }
                          alt="cast_pic"
                          className="rounded-md shadow-sm shadow-gray-500"
                        />

                        <div className="py-2">
                          <p className="text-xs font-semibold">
                            {cast?.known_for_department}
                          </p>
                          <h3 className="font-semibold">{cast?.name}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container mx-auto py-10 px-5">
          {allCasts.length > 0 && (
            <div
              id="casts"
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
            >
              {allCasts.map((cast) => {
                return (
                  <div>
                    <img
                      src={
                        cast.profile_path == null
                          ? require('../images/actor.jpg')
                          : `${IMAGE_BASE_URL}${cast.profile_path}`
                      }
                      alt="cast_pic"
                    />

                    <div className="py-2">
                      <p className="text-sm font-semibold">
                        {cast?.known_for_department}
                      </p>
                      <h3 className="font-semibold text-lg">{cast?.name}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
