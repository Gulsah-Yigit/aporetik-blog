// components/SidebarAbout.jsx
import Image from "next/image";

export default function SidebarAbout({
  title = "ABOUT ME",
  avatar = "/about.jpg",
  text = `I'm a paragraph. Click here to add your own text and edit me. It’s easy.
Just click “Edit Text” or double click me to add your own content and make changes to the font.
I’m a great place for you to tell a story and let your users know a little more about you.`,
  readMoreHref = "#",
  pickTitle = "MY PICK OF THE MONTH",
  pickImage = "/pick.jpg", // projene bir görsel koy
  pickText = "This is my favorite book / object / movie this month. Write a short note here.",
}) {
  return (
    <aside className="sticky top-24 pl-8 border-l border-black/10">
      {/* About */}
      <h3 className="tracking-[0.35em] text-sm text-black/70 mb-6">{title}</h3>

      <div className="relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border border-black/10 shadow-sm">
        <Image src={avatar} alt="About" fill className="object-cover" />
      </div>

      <p className="text-[15px] leading-7 text-neutral-700 whitespace-pre-line">
        {text}
      </p>

      <a
        href={readMoreHref}
        className="inline-block mt-6 font-medium underline underline-offset-4 hover:no-underline"
      >
        Read More &gt;
      </a>

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
    </aside>
  );
}
