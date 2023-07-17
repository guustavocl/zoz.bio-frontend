"use client";

import Dock from "@/components/MyDock/Dock";
import { DockCard } from "@/components/MyDock/DockCard";

const Socials = () => {
  const ICONS = [
    "/icons/social/discord.png",
    "/icons/social/facebook.png",
    "/icons/social/instagram.png",
    "/icons/social/twitter.png",
    "/icons/social/tiktok.png",
    "/icons/social/spotify.png",
    "/icons/social/youtube.png",
    "/icons/social/github.png",
    "/icons/social/steam.png",
  ];

  return (
    <div className="w-full col-span-12 p-2 rounded-lg flex flex-col items-center">
      <Dock>
        {ICONS.map((src, idx) => (
          <DockCard key={idx}>
            <img className="icon-shadow h-8" src={src} alt={`icon`} loading="lazy" />
          </DockCard>
        ))}
      </Dock>
    </div>
  );
};
export default Socials;
