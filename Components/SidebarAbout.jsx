// components/SidebarAbout.jsx
import Image from "next/image";

export default function SidebarAbout({
  pickTitle = "Bu ayın seçilenleri",
  pickImage = "/pick.jpg", // projene bir görsel koy
  pickText = "This is my favorite book / object / movie this month. Write a short note here.",
}) {
  return (
    <aside className="sticky top-24 pl-8 border-l border-black/10">
      {/* My Pick of the Month */}
      <hr className="my-10 border-black/10" />
      <h3 className="tracking-[0.35em] text-sm text-black/70 mb-6">
        {pickTitle}
      </h3>

      <div className="relative w-full aspect-[4/3] bg-neutral-100 rounded-md overflow-hidden mb-6">
        <Image
          src={pickImage}
          alt="Pick of the month"
          fill
          className="object-cover"
        />
      </div>

      <p className="text-[15px] leading-7 text-neutral-700">{pickText}</p>

      <br />

      {/* My Pick of the Month */}
      <hr className="my-10 border-black/10" />

      <div className="relative w-full aspect-[4/3] bg-neutral-100 rounded-md overflow-hidden mb-6">
        <Image
          src={pickImage}
          alt="Pick of the month"
          fill
          className="object-cover"
        />
      </div>

      <p className="text-[15px] leading-7 text-neutral-700">{pickText}</p>
    </aside>
  );
}
