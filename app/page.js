"use client";

import BlogList from "@/Components/BlogList";
import FeaturedGridFetcher from "@/Components/FeaturedGridFetcher";
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
      <FeaturedGridFetcher />
      <BlogList />
      <Footer />
    </>
  );
}
