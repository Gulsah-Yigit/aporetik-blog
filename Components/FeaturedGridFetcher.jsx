// components/FeaturedGridFetcher.jsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FeaturedGrid from "./FeaturedGrid";

/**
 * API'den yazıları çekip FeaturedGrid'e verir.
 * Sağda 3 öğe görebilmek için toplam en az 4 post gerekir.
 */
export default function FeaturedGridFetcher({ query = "" }) {
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const url = query ? `/api/blog?${query}` : "/api/blog";
        const res = await axios.get(url);
        const arr = Array.isArray(res?.data?.blogs) ? res.data.blogs : [];
        if (alive) setPosts(arr.slice(0, 4)); // 1 büyük + sağda 3 küçük
      } catch (e) {
        console.error("featured fetch:", e);
      } finally {
        if (alive) setReady(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, [query]);

  if (!ready || posts.length === 0) return null;
  return <FeaturedGrid posts={posts} />;
}
