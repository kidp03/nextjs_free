import productApiRequest from "@/apiRequest/product";
import ProductAddForm from "@/app/products/_components/product-add-form";

export default async function ProductEdit({
  params,
}: {
  params: { id: string };
}) {
  let product = undefined;
  try {
    const { payload } = await productApiRequest.getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {}

  return (
    <div>
      {!product && <div> khong tim thay san pham</div>}
      {product && <ProductAddForm product={product} />}
    </div>
  );
}
