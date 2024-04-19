import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSolidUserDetail } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";

export default function Navbar() {
  // Mengecek jika pengguna sudah Login
  const isLoggedIn = localStorage.getItem("token");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Mengaktifkan visibilitas dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Meng-handle logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/"); // Navigasi kembali ke halaman landing page setelah logout
      alert("Logout Successful!");
    }
  };

  // Meng-handle alert untuk pengguna yang belum login
  const handleUnauthorizedClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault();
      alert("You need to Sign In first!");
    }
  };

  // Navigasi ke halaman home jika pengguna sudah masuk
  const homeLink = isLoggedIn ? "/home" : "/";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const userData = response.data;
        console.log("User profile: ", userData);
        setUserData(userData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Token expired");
        } else {
          alert("An error occurred while fetching user data");
          console.error("Error: ", error);
        }
      }
    }
    if (isLoggedIn) {
      fetchData();
    }
  }, []);

  return (
    <nav className="py-4 px-6 top-0 w-full bg-[#B22222] fixed z-10">
      <div className="container flex justify-between items-center">
        <Link
          to={homeLink}
          className="flex items-center text-4xl font-semibold text-white"
        >
          <BiCameraMovie className="w-35 h-35 mr-2 text-white" />
          <span className="italic">Streamflix</span>
        </Link>
        <div className="hidden md:flex items-center gap-2 relative">
          <div className="flex gap-4">
            {isLoggedIn ? (
              <div className="relative flex items-center">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center px-2 py-1 text-white cursor-pointer hover:text-primary hover:font-semibold mr-3"
                >
                  <IoPersonCircleOutline className="w-8 h-8 ease-in-out transform hover:scale-125" />
                  <span className="ml-2">Account</span>
                </button>

                {showDropdown && (
                  <div className="absolute top-10 right-0">
                    <div className="bg-white rounded-xl shadow-xl flex-col">
                      <Link
                        to="/auth-user"
                        className="py-2 px-4 text-black flex items-center space-x-2 transition duration-300 hover:bg-gray-400"
                      >
                        <BiSolidUserDetail className="w-6 h-6 mr-2" />
                        <span>Details</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="py-2 px-4 text-black flex items-center space-x-2 transition duration-300 hover:bg-gray-400"
                      >
                        <TbLogout2 className="w-6 h-6 mr-2" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login-user"
                className="px-2 py-2 text-white cursor-pointer hover:text-primary hover:font-semibold mr-3"
              >
                Sign In
              </Link>
            )}
            <Link
              to={homeLink}
              className="px-2 py-2 text-white cursor-pointer hover:text-primary hover:font-semibold mr-3"
            >
              Home
            </Link>
            <Link
              to="/upcoming-movie"
              className="px-2 py-2 text-white cursor-pointer hover:text-primary hover:font-semibold mr-3"
              onClick={handleUnauthorizedClick}
            >
              UpComing
            </Link>
            <Link
              to="/top-rated-movie"
              className="px-2 py-2 text-white cursor-pointer hover:text-primary hover:font-semibold mr-3"
              onClick={handleUnauthorizedClick}
            >
              Top Rated
            </Link>
            <Link
              to="/search-movie"
              className="border-2 border-white rounded-xl px-4 py-1 text-white cursor-pointer hover:text-primary hover:font-semibold mr-3 flex items-center"
              onClick={handleUnauthorizedClick}
            >
              <FaSearch className="mr-3" />
              Search
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
