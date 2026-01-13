// Category Type
export const CATEGORY_LIST = [
  '종합/경제',
  '방송/통신',
  'IT',
  '영자지',
  '스포츠/연예',
  '매거진/전문지',
  '지역',
] as const;

export const ThemeState = {
  LIGHT: 'light',
  DARK: 'dark',
};

export type Category = (typeof CATEGORY_LIST)[number];
export type ThemeState = (typeof ThemeState)[keyof typeof ThemeState];

// Related Article Type
export interface RelatedArticle {
  title: string;
  link: string;
}

// Press Data Type
export interface PressData {
  category: Category;
  currentPage: string;
  totalPage: string;
  logo: string;
  darkLogo: string;
  press: string;
  time: string;
  mainTitle: string;
  mainLink: string;
  mainImg: string;
  relatedArticles: RelatedArticle[];
}

// Rolling News Item
export interface RollingNewsItem {
  provider: string;
  headline: string;
}

// Rolling News Data
export interface RollingNewsData {
  left: RollingNewsItem[];
  right: RollingNewsItem[];
}
