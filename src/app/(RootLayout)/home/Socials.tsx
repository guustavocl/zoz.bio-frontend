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
    <div className="w-full col-span-12 p-2 rounded-lg flex flex-row items-center justify-center gap-4">
      {ICONS.map((src, idx) => (
        <div key={idx}>
          <img className="icon-shadow h-8" src={src} alt={`icon`} loading="lazy" />
        </div>
      ))}
    </div>
  );
};
export default Socials;
