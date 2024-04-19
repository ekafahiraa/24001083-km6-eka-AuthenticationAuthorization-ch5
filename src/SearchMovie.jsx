import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BsSearch } from "react-icons/bs";

const API_KEY = "d0ae83de32a46c56ef37b5365b3cb76e";

export default function SearchMovie() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notFound, setNotFound] = useState(false); // State untuk menunjukkan apakah film tidak ditemukan

  const movieSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&language=en-US&page=${currentPage}`,
        { headers: { accept: "application/json" } }
      );

      if (response.data.results.length === 0) {
        // Jika tidak ada hasil yang ditemukan, set notFound menjadi true
        setNotFound(true);
        setMovies([]); // Mengosongkan daftar film
      } else {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setNotFound(false); // Set notFound kembali ke false jika ada hasil
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
    setNotFound(false); // Set notFound menjadi false ketika pengguna mulai mengetik
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    movieSearch();
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    movieSearch();
  }, [currentPage]);

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
              SEARCH MOVIE
            </p>
            {/* inputan */}
            <div className="relative mb-5">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search for a movie here..."
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

            {notFound &&
              query.trim() !== "" && ( // Tampilkan pesan jika film tidak ditemukan dan query tidak kosong
                <div className="text-white text-xl font-semibold mt-20">
                  Oops! It looks like there are no movies matching your search.
                </div>
              )}

            {!notFound && ( // Tampilkan daftar film jika tidak ada film yang belum ditemukan
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
            )}

            <div className="flex flex-col items-center mt-5 mb-10 p-10">
              {totalPages > 1 && (
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`${
                      currentPage === 1
                        ? "bg-[#B22222] rounded-full px-5 py-2 text-white font-semibold"
                        : "bg-primary hover:bg-primary/50 rounded-full px-5 py-2 text-white font-semibold"
                    }`}
                  >
                    Previous
                  </button>
                  <div className="flex flex-wrap justify-center md:justify-start">
                    {[...Array(totalPages)].map((_, index) => (
                      <span
                        key={index}
                        className={`${
                          currentPage === index + 1
                            ? "font-bold border-b-2 text-[#B22222]"
                            : ""
                        } cursor-pointer mr-2 mb-2`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`${
                      currentPage === totalPages
                        ? "bg-[#B22222] rounded-full px-5 py-2 text-white font-semibold"
                        : "bg-primary hover:bg-primary/50 rounded-full px-5 py-2 text-white font-semibold"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
