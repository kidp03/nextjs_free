import productApiRequest from "@/apiRequest/product";

export default async function ProductEdit({
  params,
}: {
  params: { id: string };
}) {
  let product = null;
  try {
    const { payload } = await productApiRequest.getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {}

  return (
    <div>
      {!product && <div> khong tim thay san pham</div>}
      {product && <div>{product.name}</div>}
    </div>
  );
}
