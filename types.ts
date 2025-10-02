
export interface DownloadLink {
  label: string;
  url: string;
  rel: string;
  type: 'official' | 'mirror';
  checksum_sha256?: string;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  publisher: string;
  short_desc: string;
  size_mb: number;
  rating: number; // 0 to 10
  categories: string[];
  platforms: string[];
  tags: string[];
  cover_url: string;
  download_strategy: 'external' | 'direct' | 'mirror';
  download_links: DownloadLink[];
}
