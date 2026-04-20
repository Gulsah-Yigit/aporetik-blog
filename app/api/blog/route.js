import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const loadDB = async () => {
  await ConnectDB();
};

loadDB();

// API Endpoint to get all blogs
export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json(blog);
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json(
      { success: false, msg: "Bloglar alınamadı" },
      { status: 500 }
    );
  }
}

// API Endpoint For Uploading Blogs
export async function POST(request) {
  try {
    const formData = await request.formData();

    const rawTags = formData.get("tags") || "";
    const tagsArray =
      typeof rawTags === "string"
        ? rawTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

        //new
        const image = formData.get("image");

const bytes = await image.arrayBuffer();
const buffer = Buffer.from(bytes);

const fileName = `${Date.now()}_${image.name.replaceAll(" ", "_")}`;
const filePath = path.join(process.cwd(), "public", fileName);

await writeFile(filePath, buffer);

    const blogData = {
      title: `${formData.get("title")}`,
      description: `${formData.get("description")}`,
      category: `${formData.get("category")}`,
      author: `${formData.get("author")}`,
       image: `${formData.get("image")}`,
      authorImg: `${formData.get("authorImg")}`,
      tags: tagsArray,
    };

    await BlogModel.create(blogData);

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("POST /api/blog error:", error);
    return NextResponse.json(
      { success: false, msg: "Blog eklenemedi" },
      { status: 500 }
    );
  }
}



// Creating API Endpoint to Delete Blog
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, msg: "Blog Deleted" });
  } catch (error) {
    console.error("DELETE /api/blog error:", error);
    return NextResponse.json(
      { success: false, msg: "Blog silinemedi" },
      { status: 500 }
    );
  }
}