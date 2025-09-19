import ProductDetailPage from "../../../component/ProductDetailPage";

export default async function AffilliatePage({ params }) {
  const { productId } = await params;
  return <ProductDetailPage productId={productId} />;
}