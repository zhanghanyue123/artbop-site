import ShopContent from "../../components/ShopContent";
import { getPublicProducts, ProductRecord } from "../../lib/supabase-rest";

export const metadata = {
  title: "商店",
  description: "ArtBOP 精选出版物、艺术家版次、创意物件与合作项目。",
};

export const revalidate = 60;

export default async function ShopPage() {
  let products: ProductRecord[] = [];
  try {
    products = await getPublicProducts();
  } catch (error) {
    console.error("Unable to load products", error);
  }
  return <ShopContent products={products} />;
}
