import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BiSolidLock, BiShow, BiHide } from "react-icons/bi";
import LoginGoogle from "./LoginGoogle";
import backgroundImage from "./bglogin.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Meng-handle perubahan nilai pada input Email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Meng-handle perubahan nilai pada input password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Mengubah tipe input password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Mendefinisikan tipe input berdasarkan keadaan showPassword
  const passwordInputType = showPassword ? "text" : "password";

  // Meng-handle submit form login
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validasi untuk memastikan email dan password tidak kosong
    if (!email || !password) {
      alert("Please enter your email and password!");
      return;
    }

    try {
      const responseLogin = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (responseLogin.status === 200) {
        setUser(responseLogin.data);
        setError(null);
        localStorage.setItem("token", responseLogin.data.data.token);
        console.log("Data: ", responseLogin.data);
        navigate("/home");
        alert(`Login successful, enjoy watching!`);
      }
      console.log("Response Login: ", responseLogin);
    } catch (error) {
      console.log(error);
      alert("Invalid username or password! Please try again.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Sans-Serif",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`, // Menambahkan background image
          backgroundSize: "cover", // Menutupi seluruh elemen
          backgroundPosition: "center", // Posisi gambar di tengah
          minHeight: "100vh", // Tinggi minimum 100% dari viewport
          display: "flex", // Menjadikan konten sebagai flexbox
          alignItems: "center", // Mengatur konten ke sebelah kiri
          justifyContent: "flex-start", // Mengatur konten ke sebelah kiri
          padding: "20px", // Padding untuk isi dari div
        }}
      >
        <div className="max-w-[500px] w-full rounded-xl ml-10 mt-10 mb-10 py-2 px-2 pb-5 pt-7">
          <div className="max-w-[650px] mx-auto flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl font-bold my-10 text-left">
              Welcome Back!
            </h1>

            <form onSubmit={handleSubmit} className="max-w-md w-[350px]">
              <div className="flex flex-col space-y-5">
                <div className="flex items-center bg-gray-200 p-3 rounded-full border-1">
                  <MdEmail className="w-[25px] h-[25px] mr-3" />
                  <input
                    className="flex-grow bg-transparent border-none focus:outline-none"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="flex items-center bg-gray-200 p-3 rounded-full border-1">
                  <BiSolidLock className="w-[25px] h-[25px] mr-3" />
                  <input
                    className="flex-grow bg-transparent border-none focus:outline-none"
                    type={passwordInputType}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {/* Ikon mata yang bisa di-klik untuk menampilkan atau menyembunyikan password */}
                  {showPassword ? (
                    <BiShow
                      className="w-[25px] h-[25px] cursor-pointer ease-in-out transform hover:scale-125"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <BiHide
                      className="w-[25px] h-[25px] cursor-pointer ease-in-out transform hover:scale-125"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                <button
                  type="Submit"
                  className="bg-[#B22222] text-white py-3 rounded-full focus:outline-none focus:ring w-full transition-colors duration-300 hover:bg-red-900 active:bg-red-900 ease-in-out transform hover:scale-105"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="relative w-[350px] mt-10 mb-10">
              <hr className="absolute left-0 right-0 border-t-2 border-gray-100" />
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-2 text-white">
                or
              </p>
            </div>

            <LoginGoogle buttonText={"Continue with Google"} />

            <p className="text-white mt-7 mb-5">
              Don't have an account yet?{" "}
              <a
                href="/register-user"
                className="text-blue-400 font-semibold border-blue-400"
              >
                Sign Up
              </a>
            </p>

            {error ? (
              <div>
                {alert("Invalid username or password! Please try again.")}
              </div>
            ) : user ? (
              <div>{alert(`Login Successful, Welcome!`)}</div>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
