"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Yolda",
    author: "Gülşah Yiğit",
    authorImg: "/author_img.png",
    tags: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Lütfen görsel seçin");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      formData.append("image", image);
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
        });

        setImage(false);
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
      <p className="text-xl">Thumbnail</p>

      <label htmlFor="image">
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <div className="mt-4 w-[140px] h-[100px] border flex items-center justify-center cursor-pointer overflow-hidden">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-500">Görsel Seç</span>
          )}
        </div>
      </label>

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