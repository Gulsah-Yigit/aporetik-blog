import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-around flex-col h-[100px] gap-2 sm:gap-0 sm:flex-row border-1 border-[#2a2a2a] shadow-2xl py-5 items-center">
      <Image src={assets.logo} alt="" width={120} />
      <p className="text-sm text-[#2a2a2a]">
        All right reserved. Copyright @aporetik
      </p>
      <div className="flex">
        <Image src={assets.email_icon} alt="" width={30} />
        aporetik.blog@gmail.com
      </div>
    </div>
  );
};

export default Footer;
