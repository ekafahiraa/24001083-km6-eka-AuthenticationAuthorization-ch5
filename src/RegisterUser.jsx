import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MdEmail } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { BiSolidLock, BiShow, BiHide } from "react-icons/bi";
import backgroundImage from "./bglogin.png";

export default function RegisterUser() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Meng-handle perubahan nilai pada input Email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Meng-handle perubahan nilai pada input username
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Meng-handle perubahan nilai pada input password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Mengubah tipe input password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Mendefinisikan tipe input berdasarkan keadaan password
  const passwordInputType = showPassword ? "text" : "password";

  // Meng-handle submit form register
  const handleRegister = async (event) => {
    event.preventDefault();

    // Validasi input email, username, dan password
    if (!email || !name || !password) {
      alert("Please fill in all data first.");
      return;
    }

    // Validasi email
    if (!email.includes("@")) {
      alert("Email must contain '@' character.");
      return;
    }

    // Validasi kekuatan password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least 8 characters, including uppercase letters and numbers."
      );
      return;
    }

    // Jika semua validasi terpenuhi, kirim permintaan register
    const responseRegister = await fetch(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const jsonRegister = await responseRegister.json();
    if (responseRegister?.status === 201) {
      // Jika registrasi berhasil, simpan token ke local storage dan arahkan ke halaman login
      localStorage.setItem("token", jsonRegister?.token);
      alert("Registration successful, please login to continue.");
      navigate("/login-user");
    } else {
      // Jika registrasi gagal, tampilkan pesan error
      alert(jsonRegister.message);
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
            <h1 className="text-white text-3xl font-bold mt-10 mb-2 text-center">
              Create New Account
            </h1>
            <h2 className="text-white text-l mb-14 text-center">
              Please enter your details
            </h2>

            <form
              onSubmit={handleRegister}
              className="max-w-md mx-auto w-[350px]"
            >
              <div className="flex flex-col items-center space-y-5">
                <div className="flex items-center w-full bg-gray-200 p-3 rounded-full border-1">
                  <MdEmail className="w-[25px] h-[25px] mr-3" />
                  <input
                    className="flex-grow bg-transparent border-none focus:outline-none"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="flex items-center w-full bg-gray-200 p-3 rounded-full border-1">
                  <BsPersonFill className="w-[25px] h-[25px] mr-3" />
                  <input
                    className="flex-grow bg-transparent border-none focus:outline-none"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="flex items-center w-full bg-gray-200 p-3 rounded-full border-1">
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

                <button className="bg-[#B22222] text-white py-3 rounded-full focus:outline-none focus:ring w-full transition-colors duration-300 hover:bg-red-900 active:bg-red-900 ease-in-out transform hover:scale-105">
                  Sign Up
                </button>
              </div>
            </form>

            <p className="text-white mt-7 mb-5">
              Already Registered?{" "}
              <a
                href="/login-user"
                className="text-blue-400 font-semibold border-blue-400"
              >
                Login Here
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
