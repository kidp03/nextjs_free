import productApiRequest from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function ProductListPage() {
  const { payload } = await productApiRequest.getList();
  const productList = payload.data;
  return (
    <div>
      <h1>ProductListPage</h1>
      <div>
        {productList.map((product) => (
          <div key={product.id} className="flex space-x-4">
            <Image
              alt={product.name}
              src={product.image}
              width={180}
              height={180}
              className="w-32 h-32 object-cover"
            />
            <h3>{product.name}</h3>
            <div>{product.price}</div>
            <div className="fkex space-x-2">
              <Button variant={"outline"}>Sửa</Button>
              <Button variant={"destructive"}>Xóa</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
