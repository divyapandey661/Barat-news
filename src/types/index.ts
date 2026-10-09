export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  englishTitle?: string;
  summary: string;
  content: string[];
  category: string;
  categorySlug: string;
  imageUrl: string;
  imageCaption?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  isBreaking?: boolean;
  isTopStory?: boolean;
  isTrending?: boolean;
  views?: number;
  tags: string[];
  videoUrl?: string;
  videoDuration?: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  englishName: string;
  slug: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  imageUrl: string;
  caption: string;
  category: string;
  photographer: string;
}

export interface LiveBulletin {
  id: string;
  time: string;
  text: string;
}
