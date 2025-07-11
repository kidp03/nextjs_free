import productApiRequest from "@/apiRequest/product";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
const getDetail = cache(productApiRequest.getDetail);
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { payload } = await getDetail(Number(params.id));
  const product = payload.data;
  return {
    title: product.name,
    description: product.description,
  };
}
export default async function ProductDetail({ params, searchParams }: Props) {
  let product = undefined;
  try {
    const { payload } = await getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {}

  return (
    <div>
      {!product && <div> khong tim thay san pham</div>}
      {product && (
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={180}
            height={180}
            className="w-32 h-32 object-cover"
          />

          <h3>{product.name}</h3>
          <div>{product.price}</div>
        </div>
      )}
    </div>
  );
}
