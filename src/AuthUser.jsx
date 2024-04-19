import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import backgroundImage from "./bguser.png";

export default function AuthUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await axios.get(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setUser(response.data.data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };

    getAuthUser();
  }, []);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Menempatkan konten di sebelah kanan
          padding: "20px",
        }}
      >
        <div className="border-4 border-[#B22222] max-w-[400px] w-full rounded-xl mt-10 mb-10 py-2 px-2 pb-5 pt-3 mr-14">
          <div className="max-w-[450px] mx-auto flex flex-col justify-center items-center">
            <p className="text-3xl text-white font-semibold mt-10 mb-5 text-center">
              Welcome Back.
            </p>
            {user && (
              <>
                <p className="text-2xl text-white font-bold mb-10">
                  Hello, {user.name}!
                </p>

                <div className="text-left text-white mt-7 mb-10">
                  <p className="font-medium">
                    <span className="mr-2">Name:</span>
                    {user.name}
                  </p>
                  <p className="font-medium">
                    <span className="mr-2">Email:</span>
                    {user.email}
                  </p>
                  <p className="font-medium">
                    <span className="mr-2">Joined:</span>
                    {user.createdAt}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
