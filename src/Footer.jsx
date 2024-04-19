import React from "react";
import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="bg-[#B22222] text-white px-10 py-3">
      <hr />
      <div className="max-w-[1200px] mx-auto flex justify-between py-5 px-5 flex-wrap gap-3 footer">
        {/* Logo dan Deskripsi */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
          <a
            href="/"
            className="text-lg font-bold"
            style={{
              fontSize: "31px",
              color: "#2C2C2C",
              borderBottom: "2px solid #2C2C2C",
            }}
          >
            <span style={{ fontStyle: "italic" }}>Streamflix</span>
          </a>
          <p className="text-white mt-4 text-sm text-justify">
            Streamflix merupakan platform streaming film yang menyajikan
            berbagai konten film dan serial TV dari seluruh dunia. Temukan
            pengalaman menonton yang tak terbatas dengan koleksi kami yang terus
            diperbarui, dari film-film terbaru hingga klasik favorit. Nikmati
            kemudahan menonton di mana pun dan kapan pun dengan Streamflix.
          </p>
          <small className="block text-sm text-[#2C2C2C] mt-4">
            © {new Date().getFullYear()} Streamflix, All Rights Reserved.
          </small>
        </div>

        {/* Kontak */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <div className="flex items-center mb-2">
            <FaEnvelope className="mr-2" />
            <span>streamflix@co.id</span>
          </div>
          <div className="flex items-center">
            <BsTwitterX className="mr-2" />
            <span>@streamflix</span>
          </div>
        </div>

        {/* Sosial Media */}
        <div className="flex flex-col items-end space-y-4 md:space-y-5">
          <a href="#" className="text-light">
            <FaFacebook style={{ fontSize: "28px" }} />
          </a>
          <a href="#" className="text-light">
            <BsTwitterX style={{ fontSize: "28px" }} />
          </a>
          <a href="#" className="text-light">
            <FaInstagram style={{ fontSize: "28px" }} />
          </a>
        </div>
      </div>
      <hr />
    </div>
  );
}
