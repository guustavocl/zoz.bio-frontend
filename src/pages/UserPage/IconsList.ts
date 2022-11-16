type mediaIconProps = {
  icon?: string;
  label?: string;
  url?: (username: string) => string;
};

export const getIcon = (key: string) => {
  return socialIconsList[key];
};

export const getStatusIcon = (key: string) => {
  return statusIconsList[key];
};

export const getAdornmentIcon = (key: string) => {
  return adornmentIconsList[key];
};

export const getBadge = (key: string) => {
  return badgeList[key];
};

const socialIconsList: Record<string, mediaIconProps> = {
  discord: {
    icon: "./icons/social/discord.png",
    label: "Discord",
  },
  twitter: {
    icon: "./icons/social/twitter.png",
    url: (username) => `https://twitter.com/${username}`,
    label: "Twitter",
  },
  facebook: {
    icon: "./icons/social/facebook.png",
    url: (username) => `https://facebook.com/${username}`,
    label: "Facebook",
  },
  instagram: {
    icon: "./icons/social/instagram.png",
    url: (username) => `https://instagram.com/${username}`,
    label: "Instagram",
  },
  github: {
    icon: "./icons/social/github.png",
    url: (username) => `https://github.com/${username}`,
    label: "Github",
  },
  pix: {
    icon: "./icons/social/pix.png",
    label: "Chave Pix",
  },
  telegram: {
    icon: "./icons/social/telegram.png",
    url: (username) => `https://t.me/${username}`,
    label: "Telegram",
  },
  steam: {
    icon: "./icons/social/steam.png",
    url: (username) => `https://steamcommunity.com/id/${username}`,
    label: "Steam",
  },
  amazon: {
    icon: "./icons/social/amazon.png",
    url: (username) => `https://www.amazon.com.br/hz/wishlist/ls/${username}`,
    label: "Amazon Wishlist",
  },
  applemusic: {
    icon: "./icons/social/applemusic.png",
    url: (username) => `https://music.apple.com/profile/${username}`,
    label: "Apple music",
  },
  bandcamp: {
    icon: "./icons/social/bandcamp.png",
    url: (username) => `https://${username}.bandcamp.com/`,
    label: "Bandcamp",
  },
  battlenet: {
    icon: "./icons/social/battlenet.png",
    label: "BattleNet",
  },
  behance: {
    icon: "./icons/social/behance.png",
    url: (username) => `https://behance.net/${username}`,
    label: "Behance",
  },
  bereal: {
    icon: "./icons/social/bereal.png",
    label: "BeReal",
  },
  bsc: {
    icon: "./icons/social/bsc.png",
    label: "Binance Wallet BEP2",
  },
  bitcoin: {
    icon: "./icons/social/bitcoin.png",
    label: "Bitcoin Wallet Address",
  },
  chesscom: {
    icon: "./icons/social/chesscom.png",
    url: (username) => `https://www.chess.com/member/${username}`,
    label: "Chess.com",
  },
  crunchyroll: {
    icon: "./icons/social/crunchyroll.png",
    url: (username) => `https://www.crunchyroll.com/user/${username}`,
    label: "Crunchyroll",
  },
  destiny: {
    icon: "./icons/social/destiny.png",
    label: "Destiny 2",
  },
  deviantart: {
    icon: "./icons/social/deviantart.png",
    url: (username) => `https://www.deviantart.com//${username}`,
    label: "DeviantArt",
  },
  duellinks: {
    icon: "./icons/social/duellinks.png",
    label: "YuGiOh Duel Links",
  },
  ebay: {
    icon: "./icons/social/ebay.png",
    url: (username) => `https://ebay.com/usr/${username}`,
    label: "Ebay",
  },
  email: {
    icon: "./icons/social/email.png",
    label: "Email",
  },
  enjoei: {
    icon: "./icons/social/enjoei.png",
    url: (username) => `https://www.enjoei.com.br/@${username}`,
    label: "Enjoei",
  },
  epic7: {
    icon: "./icons/social/epic7.png",
    label: "Epic Seven",
  },
  epicgames: {
    icon: "./icons/social/epicgames.png",
    label: "Epic Games",
  },
  fatego: {
    icon: "./icons/social/fatego.png",
    label: "Fate GO",
  },
  fortnite: {
    icon: "./icons/social/fortnite.png",
    label: "Fortnite",
  },
  genshin: {
    icon: "./icons/social/genshin.png",
    label: "Genshin Impact",
  },
  gmail: {
    icon: "./icons/social/gmail.png",
    label: "Gmail",
  },
  kickstarter: {
    icon: "./icons/social/kickstarter.png",
    url: (username) => `https://www.kickstarter.com/${username}`,
    label: "Kickstarter",
  },
  lastfm: {
    icon: "./icons/social/lastfm.png",
    url: (username) => `https://last.fm/user/${username}`,
    label: "LastFM",
  },
  line: {
    icon: "./icons/social/line.png",
    url: (username) => ` https://line.me/R/ti/p/${username}`,
    label: "Line",
  },
  linkedin: {
    icon: "./icons/social/linkedin.png",
    url: (username) => `https://linkedin.com/in/${username}`,
    label: "Linkedin",
  },
  metamask: {
    icon: "./icons/social/metamask.png",
    label: "Metamask Wallet address",
  },
  minecraft: {
    icon: "./icons/social/minecraft.png",
    label: "Minecraft",
  },
  myanimelist: {
    icon: "./icons/social/myanimelist.png",
    url: (username) => `https://myanimelist.net/profile/${username}`,
    label: "My Anime List",
  },
  naver: {
    icon: "./icons/social/naver.png",
    label: "Naver",
  },
  nintendo: {
    icon: "./icons/social/nintendo.png",
    label: "Nintendo",
  },
  opensea: {
    icon: "./icons/social/opensea.png",
    url: (username) => `https://opensea.io/${username}`,
    label: "Open Sea",
  },
  patreon: {
    icon: "./icons/social/patreon.png",
    url: (username) => `https://patreon.com/${username}`,
    label: "Patreon",
  },
  paypal: {
    icon: "./icons/social/paypal.png",
    label: "PayPal",
  },
  phantom: {
    icon: "./icons/social/phantom.png",
    label: "Phantom wallet address",
  },
  picpay: {
    icon: "./icons/social/picpay.png",
    label: "Picpay",
  },
  pinterest: {
    icon: "./icons/social/pinterest.png",
    url: (username) => `https://pinterest.com/${username}`,
    label: "Pinterest",
  },
  pokemongo: {
    icon: "./icons/social/pokemongo.png",
    label: "Pokemon GO",
  },
  pokemonunite: {
    icon: "./icons/social/pokemonunite.png",
    label: "Pokemon Unite",
  },
  psn: {
    icon: "./icons/social/psn.png",
    label: "PSN",
  },
  reddit: {
    icon: "./icons/social/reddit.png",
    url: (username) => `https://reddit.com/u/${username}`,
    label: "Reddit",
  },
  riot: {
    icon: "./icons/social/riot.png",
    label: "Riot",
  },
  skrill: {
    icon: "./icons/social/skrill.png",
    label: "Skrill",
  },
  skype: {
    icon: "./icons/social/skype.png",
    label: "Skype",
  },
  snapchat: {
    icon: "./icons/social/snapchat.png",
    url: (username) => `https://snapchat.com/add/${username}`,
    label: "Snapchat",
  },
  soundcloud: {
    icon: "./icons/social/soundcloud.png",
    url: (username) => `https://soundcloud.com/${username}`,
    label: "SoundCloud",
  },
  spotify: {
    icon: "./icons/social/spotify.png",
    url: (username) => `https://open.spotify.com/user/${username}`,
    label: "Spotify",
  },
  tiktok: {
    icon: "./icons/social/tiktok.png",
    url: (username) => `https://tiktok.com/@${username}`,
    label: "TikTok",
  },
  twitch: {
    icon: "./icons/social/twitch.png",
    url: (username) => `https://twitch.tv/${username}`,
    label: "TwitchTV",
  },
  venmo: {
    icon: "./icons/social/venmo.png",
    url: (username) => `https://venmo.com/u/${username}`,
    label: "Venmo",
  },
  vk: {
    icon: "./icons/social/vk.png",
    url: (username) => `https://vk.com/${username}`,
    label: "VK",
  },
  website: {
    icon: "./icons/social/website.png",
    url: (username) => `${username}`,
    label: "My website",
  },
  weheartit: {
    icon: "./icons/social/weheartit.png",
    url: (username) => `https://weheartit.com/${username}`,
    label: "We ♥ It",
  },
  whats: {
    icon: "./icons/social/whats.png",
    url: (username) => `https://wa.me/${username}`,
    label: "Whatsapp",
  },
  whatsb: {
    icon: "./icons/social/whatsb.png",
    url: (username) => `https://wa.me/${username}`,
    label: "Whatsapp Business",
  },
  xbox: {
    icon: "./icons/social/xbox.png",
    label: "Xbox",
  },
  youtube: {
    icon: "./icons/social/youtube.png",
    url: (username) => `https://youtube.com/channel/${username}`,
    label: "Youtube",
  },
  curiouscat: {
    icon: "./icons/social/curiouscat.png",
    url: (username) => `https://curiouscat.live/${username}`,
    label: "Curious Cat",
  },
  duolingo: {
    icon: "./icons/social/duolingo.png",
    label: "Duolingo",
  },
  opgg: {
    icon: "./icons/social/opgg.png",
    url: (username) => `https://www.op.gg/summoners/${username}`,
    label: "OP.GG",
  },
  vimeo: {
    icon: "./icons/social/vimeo.png",
    url: (username) => `https://vimeo.com/${username}`,
    label: "Vimeo",
  },
};

const statusIconsList: Record<string, mediaIconProps> = {
  sleepo: {
    icon: "./icons/extra/sleepo.png",
    label: "Sleeping~",
  },
};

const adornmentIconsList: Record<string, mediaIconProps> = {
  startag: {
    icon: "./icons/extra/startag.png",
    label: "Developer",
  },
};

const badgeList: Record<string, mediaIconProps> = {
  egirl: {
    label: "🦹‍♀️ E-Girl",
  },
  eboy: {
    label: "🦹‍♂️ E-Boy",
  },
  coder: {
    label: "💻 Coder",
  },
  satanist: {
    label: "👿 Satanist",
  },
  musician: {
    label: "🎵 Musician",
  },
  developer: {
    label: "🧼 Developer",
  },
  singer: {
    label: "🎤 Singer",
  },
  sleeper: {
    label: "💤 Sleeper",
  },
  alchemist: {
    label: "✨ Alchemist",
  },
  futurist: {
    label: "🤖 Futurist",
  },
};
