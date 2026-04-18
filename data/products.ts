// data/products.ts

export type ProductItem = {
    id: string;
    title: string;
    title_zh?: string;
    slug: string;
    description: string;
    description_zh?: string;
    category:
      | "Publications"
      | "Artist Editions"
      | "Objects"
      | "Limited Collaborations"
      | "Archive";
    price: string;
    status: string;
    image?: string;
    details?: string[];
    details_zh?: string[];
    source_url?: string;
    published_at?: string;
  };
  
  export const products: ProductItem[] = [];