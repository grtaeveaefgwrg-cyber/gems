import type { Game } from '../types';

const GAME_TITLES = [
  "Hay Day",
  "Bingo Blitz™ - Bingo Games",
  "Fishing Clash",
  "Space shooter - Galaxy attac",
];

const CATEOGRIES = ["Racing", "Strategy", "RPG", "Action", "Simulation", "Puzzle", "Fighting", "Adventure"];
const PLATFORMS = ["Android", "iOS"];
const TAGS = ["Multiplayer", "Realistic", "Fantasy", "Sci-Fi", "Open World", "Indie", "Retro", "Anime"];

const generateRandomGame = (title: string, index: number): Game => {
  const rating = parseFloat((Math.random() * 4 + 5.5).toFixed(1)); // 5.5 to 9.5
  const slug = title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/[^\w-]+/g, '');
  const id = index + 1;

  let coverUrl = `https://picsum.photos/seed/${slug}/400/533`;
  if (title === "GTA 5 Mobile") {
    coverUrl = "https://i.postimg.cc/vB3P70z8/say-what-you-want-about-the-game-but-i-think-gta-v-has-the-v0-dutadp6xzuta1.jpg";
  }
  if (title === "Bingo Blitz™ - Bingo Games") {
    coverUrl = "https://i.postimg.cc/K894NQk9/images-2.jpg";
  }
  if (title === "Fishing Clash") {
    coverUrl = "https://i.postimg.cc/HkvPmqcR/images.jpg";
  }
  if (title === "Space shooter - Galaxy attac") {
    coverUrl = "https://i.postimg.cc/SR5JkN44/images-1.jpg";
  }
  if (title === "Galaxy Piano: Scrolling Rush") {
    coverUrl = "https://i.postimg.cc/m2j7vY1d/unnamed.png";
  }
  if (title === "The Last of Us 2 Mobile") {
    coverUrl = "https://i.postimg.cc/52k37Hd4/images-1.jpg";
  }
  if (title === "Rematch mobile") {
    coverUrl = "https://i.postimg.cc/JzbrKXBK/images-2.jpg";
  }
  if (title === "Assassin’s Creed Mirage Mobile") {
    coverUrl = "https://i.postimg.cc/50FbYF1X/images-3.jpg";
  }
  if (title === "Ghost of Tsushima Mobile") {
    coverUrl = "https://i.postimg.cc/dtNHXNGM/images-4.jpg";
  }
  if (title === "Red Dead Redemption 2 Mobile") {
    coverUrl = "https://i.postimg.cc/fbC02p0g/download-2.jpg";
  }
  if (title === "Attack on Titan 2 Mobile") {
    coverUrl = "https://i.postimg.cc/Hnqz2nJH/images-1.jpg";
  }
  if (title === "Inside Mobile") {
    coverUrl = "https://i.postimg.cc/QtNgDP9c/download.jpg";
  }
  if (title === "Watch Dogs 2 Mobile") {
    coverUrl = "https://i.postimg.cc/0j0Gpnq6/images.jpg";
  }
  if (title === "God of War Mobile") {
    coverUrl = "https://i.postimg.cc/ydwpfv59/images.jpg";
  }
  if (title === "Dragon Ball FighterZ Mobile") {
    coverUrl = "https://i.postimg.cc/htTtr14x/images-2.jpg";
  }
  if (title === "Naruto Ultimate Ninja Storm 4") {
    coverUrl = "https://i.postimg.cc/nLMZWKpK/download-1.jpg";
  }
  if (title === "Minecraft") {
    coverUrl = "https://i.postimg.cc/5t55Zzgg/images-3.jpg";
  }
  if (title === "Cuphead Mobile") {
    coverUrl = "https://i.postimg.cc/RhtwLnWf/download.png";
  }
  if (title === "Spider-Man 2 Mobile") {
    coverUrl = "https://i.postimg.cc/DZ2NDnrz/download-2.jpg";
  }
  if (title === "Counter-Strike 2 Mobile") {
    coverUrl = "https://i.postimg.cc/ZKcx7pfw/download-3.jpg";
  }
  if (title === "Elite auto brasil Mod") {
    coverUrl = "https://i.postimg.cc/pLKRMVFQ/images-4.jpg";
  }
  if (title === "Jump Force") {
    coverUrl = "https://i.postimg.cc/W1cCcGjd/images.jpg";
  }
  if (title === "Rocket league mobile") {
    coverUrl = "https://i.postimg.cc/mZX1njYX/images-1.jpg";
  }
  if (title === "Hollow knghith silksong") {
    coverUrl = "https://i.postimg.cc/L6k5pVfr/download.jpg";
  }
  if (title === "One piece fighting path") {
    coverUrl = "https://i.postimg.cc/MpyygRKG/co53r9.jpg";
  }
  if (title === "One piece mugen") {
    coverUrl = "https://i.postimg.cc/hvBQB44q/images-2.jpg";
  }
  if (title === "Mini soccer star Mod") {
    coverUrl = "https://i.postimg.cc/vZfR1QbK/images-3.jpg";
  }
  if (title === "Getway 2") {
    coverUrl = "https://i.postimg.cc/qMYhJGvh/images-4.jpg";
  }
  if (title === "Forza Horizon 5 Mobile") {
    coverUrl = "https://i.postimg.cc/pLRTX1tC/download-1.jpg";
  }
  if (title === "Kimetsu noy aiba thc 2") {
    coverUrl = "https://i.postimg.cc/m26XTKMG/images-5.jpg";
  }
  if (title === "That New Teacher") {
    coverUrl = "https://i.postimg.cc/bJ9GTc8S/images-6.jpg";
  }
  if (title === "Assetto Corsa Mobile") {
    coverUrl = "https://i.postimg.cc/y8CHVJ0B/images-7.jpg";
  }
  if (title === "Dusttale") {
    coverUrl = "https://i.postimg.cc/43rM1qP2/images-8.jpg";
  }
  if (title === "Euro Truck Simulator 2 Mobile") {
    coverUrl = "https://i.postimg.cc/d308ZtCj/download-2.jpg";
  }
  if (title === "Homicipher Mobile") {
    coverUrl = "https://i.postimg.cc/cHCHQKDv/images-9.jpg";
  }
  if (title === "Dota 2") {
    coverUrl = "https://i.postimg.cc/XvygHYYG/download-1.jpg";
  }
  if (title === "Carx street") {
    coverUrl = "https://i.postimg.cc/cHPCDd6d/download.jpg";
  }
  if (title === "Bowmaster") {
    coverUrl = "https://i.postimg.cc/FznZCd3C/download-2.jpg";
  }
  if (title === "Hill climb racing 2") {
    coverUrl = "https://i.postimg.cc/dtYrv9tR/download-3.jpg";
  }
  if (title === "SILENT HILL f Mobile") {
    coverUrl = "https://i.postimg.cc/RVSRjbxr/download-4.jpg";
  }
  if (title === "Dying Light: The Beast Mobile") {
    coverUrl = "https://i.postimg.cc/02C8Nj4L/download-5.jpg";
  }
  if (title === "Borderlands 4 Mobile") {
    coverUrl = "https://i.postimg.cc/NFHWZs9t/download-7.jpg";
  }
  if (title === "NBA 2K26 Mobile") {
    coverUrl = "https://i.postimg.cc/7Z6NLB9v/download-8.jpg";
  }
  if (title === "Automobilista 2") {
    coverUrl = "https://i.postimg.cc/BZrpMcJc/images.jpg";
  }
  if (title === "Hay Day") {
    coverUrl = "https://i.postimg.cc/ryYy0z41/images-1.jpg";
  }
  if (title === "Masha and the Bear: My Friends mod") {
    coverUrl = "https://i.postimg.cc/9Q9NPgnj/images-3.jpg";
  }

  let shortDesc = "High-fidelity mobile gaming with realistic physics and stunning graphics.";
  if (title === "Fishing Clash") {
    shortDesc = "Fishing Clash: Catching Fish Game (MOD, Big Combo) - a realistic fishing simulator in which you will have the opportunity to try your luck in various";
  }
  if (title === "Space shooter - Galaxy attac") {
    shortDesc = "Space Shooter - Galaxy Attack (MOD, Unlimited Money) - is an impressive and exciting space scrolling shooter where you take on the role of defending Earth";
  }

  return {
    id: `uuid-${id}`,
    slug: slug,
    title: title.toLowerCase().includes('mod') ? title : `${title} Mod`,
    publisher: `Publisher ${String.fromCharCode(65 + (id % 10))}`,
    short_desc: shortDesc,
    size_mb: Math.floor(Math.random() * 2500) + 100,
    rating: rating,
    ratingCount: Math.floor(Math.random() * 4950) + 50,
    categories: [CATEOGRIES[id % CATEOGRIES.length]],
    platforms: [PLATFORMS[id % PLATFORMS.length], PLATFORMS[(id + 1) % PLATFORMS.length]].filter((v,i,a) => a.indexOf(v)===i),
    tags: [TAGS[id % TAGS.length], TAGS[(id + 2) % TAGS.length]].filter((v,i,a) => a.indexOf(v)===i),
    cover_url: coverUrl,
    download_strategy: id % 3 === 0 ? 'direct' : 'external',
    download_links: [
      {
        label: "Official Store",
        url: `https://example.com/store/${slug}`,
        rel: "nofollow noopener",
        type: "official",
      },
      {
        label: "Direct Mirror 1",
        url: `https://example.com/mirror1/${slug}`,
        rel: "nofollow noopener",
        type: "mirror",
        checksum_sha256: "a1b2c3d4e5f6...",
      },
    ],
  };
};

export const GAMES: Game[] = GAME_TITLES.map((title, index) => generateRandomGame(title, index));