import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="max-w-[400px] sm:max-w-[350px] bg-[#FAFAF9] border-3 border-black  hover:shadow-[-7px_7px_0px_#000000] rounded-3xl">
      <div className="relative border-3 border-black rounded-3xl m-5 overflow-hidden h-[250px]">
        <Link href={`/blogs/${id}`}>
          <Image src={image} alt="" fill className="object-cover" />
        </Link>
      </div>

      <p className="ml-5 mt-5 px-1 inline-block bg-[#EF4A24] text-white text-sm">
        {category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h5>
        <p
          className="mb-3 text-sm tracking-tight text-gray-700"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 150) }}
        ></p>
        {/* read more butonu */}
        <Link
          href={`/blogs/${id}`}
          className="flex items-center justify-center gap-4 my-6"
        >
          <span className="h-[2px] w-16 bg-black"></span>
          <button className="w-20 h-8 bg-yellow-400 rounded-full border-2 border-black flex items-center justify-center ">
            <span className="text-xs">read more</span>
          </button>
          <span className="h-[2px] w-16 bg-black"></span>
        </Link>

        {/* <div className="inline-flex items-center py-2 font-semibold text-center">
          Read more{" "}
          <Image src={assets.arrow} className="ml-2" alt="" width={12} />
        </div> */}
      </div>
    </div>
  );
};

export default BlogItem;
