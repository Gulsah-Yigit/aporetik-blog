import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { Bowlby_One_SC, Lora } from "next/font/google";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react"; // eğer yoksa ekle
import { Playfair_Display } from "next/font/google";
import { Inter } from "next/font/google"; // üst slogan için

export const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["700", "800", "900"], // kalın varyantlar
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  weight: "400", // Bu font tek ağırlıkta geliyor
});

const loraItalic = Lora({
  subsets: ["latin-ext"],
  weight: "400",
  style: "italic",
});

const Header = () => {
  const [email, setEmail] = useState("");

  //yeni
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("/api/blog");
        setBlogs(data?.blogs || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  //yeni
  const handleRandomBlog = () => {
    if (!blogs.length) return;
    const random = blogs[Math.floor(Math.random() * blogs.length)];
    if (random?._id) {
      router.push(`/blogs/${random._id}`);
    }
  };

  return (
    <div className="pt-0 pb-3 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={120}
          alt=""
          className="w-[130px] sm:w-auto"
        />
        <button
          onClick={handleRandomBlog}
          disabled={!blogs.length}
          className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-[#444444] shadow-[-7px_7px_0px_#444444] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          <p className="text-[#444444]">rastgele yazı </p>
          <Image src={assets.arrow} alt="ok" />
        </button>
      </div>

      {/* ↓ APORETİK başlığını yukarı taşıyan kısım */}
      <div className="text-center -mt-4 sm:-mt-6 md:-mt-10 lg:-mt-12">
        <h1
          className={`${playfair.className}
          font-black inline-flex items-baseline gap-2 whitespace-nowrap
          text-[clamp(3.5rem,9vw,10rem)] leading-[0.95] tracking-[0.04em] text-[#444444]`}
        >
          APORETİK
          <span
            className={`${inter.className}
            align-baseline text-[10px] sm:text-xs md:text-sm
            font-normal tracking-[0.2em] text-black/60`}
          >
            bi' blog
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Header;
