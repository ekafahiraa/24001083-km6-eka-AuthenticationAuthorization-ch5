import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import RegisterUser from "./RegisterUser.jsx";
import LoginUser from "./LoginUser.jsx";
import AuthUser from "./AuthUser.jsx";
import Home from "./Home.jsx";
import SearchMovie from "./SearchMovie.jsx";
import DetailMovie from "./DetailMovie.jsx";
import TopRatedMovie from "./TopRatedMovie.jsx";
import PopularMovie from "./PopularMovie.jsx";
import NowPlayingMovie from "./NowPlayingMovie.jsx";
import UpcomingMovie from "./UpComingMovie.jsx";
import TrendingMovie from "./TrendingMovie.jsx";
import Footer from "./Footer.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/auth-user" element={<AuthUser />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search-movie" element={<SearchMovie />} />
        <Route path="/movie-details" element={<DetailMovie />} />
        <Route path="/top-rated-movie" element={<TopRatedMovie />} />
        <Route path="/popular-movie" element={<PopularMovie />} />
        <Route path="/now-playing-movie" element={<NowPlayingMovie />} />
        <Route path="/upcoming-movie" element={<UpcomingMovie />} />
        <Route path="/trending-movie" element={<TrendingMovie />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </Router>
  );
}
