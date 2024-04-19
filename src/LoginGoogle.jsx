import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function LoginGoogle({ buttonText }) {
  const navigate = useNavigate();
  const registerLoginWithGoogleAction = async (accessToken) => {
    console.log("token ", accessToken);
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://shy-cloud-3319.fly.dev/api/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;
      console.log("response.data ", response.data);
      localStorage.setItem("token", token);
      navigate("/home", { state: { token: token } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return;
      }
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      localStorage.setItem("login", "google function");
      registerLoginWithGoogleAction(responseGoogle.access_token);
    },
  });

  return (
    <button
      variant="primary"
      onClick={() => loginWithGoogle()}
      className="bg-[#323643] text-white py-3 rounded-full focus:outline-none focus:ring transition-colors duration-300 hover:bg-gray-700 active:bg-gray-700 flex items-center justify-center gap-2 w-[350px] ease-in-out transform hover:scale-105"
    >
      <FcGoogle className="w-6 h-6 mr-4" />
      {buttonText}
    </button>
  );
}
