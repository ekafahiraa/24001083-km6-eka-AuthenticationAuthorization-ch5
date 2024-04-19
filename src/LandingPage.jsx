import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./App.css";

const API_KEY = "d0ae83de32a46c56ef37b5365b3cb76e";

export default function LandingPage() {
  const [currentMovie, setCurrentMovie] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []); // Hapus [movies] sebagai dependensi, karena kita hanya ingin menjalankan ini sekali

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prevMovie) => (prevMovie + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movies]); // Tambahkan [movies] sebagai dependensi untuk memastikan interval diperbarui ketika movies berubah

  return (
    <div
      style={{
        fontFamily: "Sans-Serif",
      }}
    >
      <div>
        <Navbar />
      </div>
      <>
        <div className="carousel">
          {movies.map((movie, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentMovie ? "show" : ""
              }`}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="overlay flex flex-col items-start justify-end h-full px-6 pb-10 text-white">
                <h1 className="text-6xl l:text-4xl lg:text-4xl text-white font-semibold mb-3 max-w-md">
                  "{movie.title}"
                </h1>
                <p className="text-white text-sm md:text-base max-w-md">
                  <span style={{ fontStyle: "italic" }}>
                    {movie.overview.slice(0, 100)}...
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
      <div>
        <Footer />
      </div>
    </div>
  );
}
