"use client";
import BlogCarousel from "@/Components/BlogCarousel";
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import TopNavbar from "@/Components/TopNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <ToastContainer theme="dark" />
      <Header />
      <TopNavbar />
      {/* <BlogCarousel /> */}
      <BlogList />
      <Footer />
    </>
  );
}
