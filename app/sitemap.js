// app/sitemap.js
function toSlug(str = "") {
  return str
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // aksanları kaldır
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function sitemap() {
  const isProd =
    process.env.VERCEL_URL || process.env.NODE_ENV === "production";
  const baseUrl = isProd ? "https://aporetik.com" : "http://localhost:3000";

  let list = [];

  try {
    const res = await fetch(`${baseUrl}/api/blog`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      list = Array.isArray(data) ? data : data.blogs || [];
    }
  } catch (_) {
    // API tamamen patlarsa list boş kalsın
  }

  const blogs = list
    .map((b) => {
      const idOrSlug =
        b?.id ?? b?._id ?? b?.slug ?? (b?.title ? toSlug(b.title) : null);

      if (!idOrSlug) return null;

      return {
        url: `${baseUrl}/blogs/${idOrSlug}`,
        lastModified: b?.updatedAt ? new Date(b.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      };
    })
    .filter(Boolean);

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...blogs,
  ];
}
