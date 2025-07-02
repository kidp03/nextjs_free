import http from "@/lib/http";
import {
  CreateProductBodyType,
  ProductResType,
} from "@/schemaValidations/product.schema";

export const productApiRequest = {
  getList: () => http.get<ProductResType>("/products"),
  create: (body: CreateProductBodyType) =>
    http.post<ProductResType>("products", body),
  uploadImage: (body: FormData) =>
    http.post<{
      message: string;
      data: string;
    }>("/media/upload", body),
};
export default productApiRequest;
