export type ImageAsset = {
  src: string;
  alt: string;
  caption?: string;
  isConcept?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  index: string;
  tagline: string;
  overview: string;
  benefits: string[];
  applications: string[];
  zh: {
    name: string;
    category: string;
    tagline: string;
    overview: string;
    benefits: string[];
    applications: string[];
    specifications: Array<{ label: string; value: string }>;
  };
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  specifications: Array<{ label: string; value: string }>;
  brochureUrl?: string;
  seoTitle: string;
  seoDescription: string;
  isPlaceholder: boolean;
};

export type Solution = {
  id: string;
  slug: string;
  name: string;
  index: string;
  eyebrow: string;
  overview: string;
  challenges: string[];
  benefits: string[];
  zh: {
    name: string;
    eyebrow: string;
    overview: string;
    challenges: string[];
    benefits: string[];
  };
  productSlugs: string[];
  image: ImageAsset;
  seoTitle: string;
  seoDescription: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  country: string;
  city: string;
  buildingType: string;
  elevatorTypes: string[];
  completionYear?: string;
  summary: string;
  description: string;
  zh: {
    title: string;
    country: string;
    city: string;
    buildingType: string;
    elevatorTypes: string[];
    summary: string;
    description: string;
  };
  images: ImageAsset[];
  seoTitle: string;
  seoDescription: string;
  isPlaceholder: boolean;
};
