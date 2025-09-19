import ProductDetailPage from "../../../component/ProductDetailPage";

export default async function AffilliateProductPage({ params }: { params: Promise<{ productId: string }> }) {
	const { productId } = await params;
	return <ProductDetailPage productId={productId} />;
}