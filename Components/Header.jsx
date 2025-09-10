import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { Bowlby_One_SC } from "next/font/google";
import axios from "axios";
import { toast } from "react-toastify";

const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  weight: "400", // Bu font tek ağırlıkta geliyor
});

const Header = () => {
  const [email, setEmail] = useState("");

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

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={120}
          alt=""
          className="w-[130px] sm:w-auto"
        />
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
          Get started <Image src={assets.arrow} alt="ok" />
        </button>
      </div>
      <div className="text-center my-8">
        <h1
          className={`${bowlby.className} 
    text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]
    font-bold tracking-wide leading-none text-[#EF4A24]`}
        >
          APORETİK
        </h1>

        <p className="mt-2 max-w-[740px] m-auto text-s sm:text-base text-[#EF4A24]">
          Bazen çıkmaz, bazen yol.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="enter your email"
            className="pl-4  outline-none"
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
