import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BsSearch } from "react-icons/bs";

const API_KEY = "d0ae83de32a46c56ef37b5365b3cb76e";

export default function TrendingMovie() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies: ", error);
      }
    };

    fetchTrendingMovie();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error searching movies: ", error);
    }
  };

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div
      className="font-poppins"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen bg-[#2C2C2C] text-white pt-20">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-white font-bold text-3xl mt-10 mb-5">
              TRENDING MOVIES
            </p>

            <div className="relative mb-5">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search for a trending movie here..."
                  value={query}
                  onChange={handleChangeQuery}
                  className="rounded-md h-10 pl-4 pr-12 bg-[#545454] text-white w-96"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <button type="submit">
                    <BsSearch className="text-white w-5 h-5 mr-1" />
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              {movies.map((movie) => (
                <div
                  className="w-56 cursor-pointer hover:shadow-lg hover:rounded-xl hover:shadow-primary/50"
                  key={movie.id}
                  onClick={() => {
                    navigate("/movie-details", { state: { id: movie.id } });
                  }}
                >
                  <img
                    className="rounded-xl h-400 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />
                  <div className="mx-2 mt-3 text-white">
                    <div className="font-bold truncate">{movie.title}</div>
                    <div className="flex justify-between">
                      <div className="font-light">
                        {movie.release_date
                          ? `(${movie.release_date})`
                          : "(Release Date Not Available)"}
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <div className="w-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path
                              fill="#FFD43B"
                              d="M316.9 18C311.6 7 300.4 0 288.1  0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                            />
                          </svg>
                        </div>
                        <div>{movie?.vote_average?.toFixed(1)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
