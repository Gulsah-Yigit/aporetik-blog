"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Yolda",
    author: "Gülşah Yiğit",
    authorImg: "/author_img.png",
    tags: "",
    image: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!data.image.trim()) {
      toast.error("Lütfen görsel URL girin");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      formData.append("image", data.image);
      formData.append("tags", data.tags);

      const response = await axios.post("/api/blog", formData);

      if (response.data.success) {
        toast.success(response.data.msg);
        setData({
          title: "",
          description: "",
          category: "Yolda",
          author: "Gülşah Yiğit",
          authorImg: "/author_img.png",
          tags: "",
          image: "",
        });
      } else {
        toast.error(response.data.msg || "Error");
      }
    } catch (error) {
      console.error("Blog ekleme hatası:", error);
      toast.error(error?.response?.data?.msg || "Sunucu hatası oluştu");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
      <p className="text-xl">Thumbnail URL</p>
      <input
        name="image"
        onChange={onChangeHandler}
        value={data.image}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        type="text"
        placeholder="https://..."
        required
      />

      {data.image && (
        <img
          src={data.image}
          alt="Preview"
          className="mt-4 w-[140px] h-auto border"
        />
      )}

      <p className="text-xl mt-4">Blog title</p>
      <input
        name="title"
        onChange={onChangeHandler}
        value={data.title}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        type="text"
        placeholder="Type here"
        required
      />

      <p className="text-xl mt-4">Blog Description</p>
      <textarea
        name="description"
        onChange={onChangeHandler}
        value={data.description}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        placeholder="write content here"
        rows={10}
        required
      />

      <p className="text-xl mt-4">Blog category</p>
      <select
        name="category"
        onChange={onChangeHandler}
        value={data.category}
        className="w-40 mt-4 px-4 py-3 border text-gray-500"
      >
        <option value="Yolda">Yolda</option>
        <option value="Uzun Okuma">Uzun Okuma</option>
      </select>

      <p className="text-xl mt-4">Tags (virgülle ayır)</p>
      <input
        name="tags"
        onChange={onChangeHandler}
        value={data.tags}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        type="text"
        placeholder="örn: kedi, rüya, psikoloji"
      />

      <br />
      <button
        className="mt-5 ml-4 w-[90px] h-10 bg-black text-white"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default Page;