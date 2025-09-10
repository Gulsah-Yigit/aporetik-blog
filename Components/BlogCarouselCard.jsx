// components/BlogCarouselCard.tsx
import Image from "next/image";
import Link from "next/link";


export default function BlogCarouselCard({ id, title, image }) {
  return (
    <div className="shrink-0 basis-1/4 max-w-[260px] snap-center">
      <Link
        href={`/blogs/${id}`}
        className="block  bg-[#FAFAF9] text-black p-3 pb-5 border-3 border-black  hover:shadow-[-7px_7px_0px_#000000] rounded-3xl transition"
      >
        <div className="relative h-[150px] overflow-hidden rounded-xl border-2 border-black">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div className="mt-2 text-sm font-semibold line-clamp-2">{title}</div>
      </Link>
    </div>
  );
}
