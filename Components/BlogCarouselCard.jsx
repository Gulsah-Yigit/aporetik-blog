// components/BlogCarouselCard.tsx
import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCarouselCard = ({ title, description, category, image, id }) => {
  return (
    <div className="shrink-0 basis-1/4 max-w-[260px] snap-center border-b-1 border-[#444444]">
      <div className="block text-[#444444] p-3 pb-5 rounded-2xl transition  ">
        <div className="relative h-[150px] overflow-hidden rounded-xl shadow-xl ">
          <Link href={`/blogs/${id}`}>
            <Image src={image} alt={title} fill className="object-cover" />
          </Link>
        </div>
        <div className="mt-2 text-sm font-semibold line-clamp-2">{title}</div>
      </div>
    </div>
  );
};

export default BlogCarouselCard;
