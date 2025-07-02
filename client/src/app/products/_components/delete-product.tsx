"use client";

import { Button } from "@/components/ui/button";
import { ProductResType } from "@/schemaValidations/product.schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import productApiRequest from "@/apiRequest/product";
import { handleErrorApi } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteProduct({
  product,
}: {
  product: ProductResType["data"];
}) {
  const router = useRouter()
  const deleteProduct = async () => {
    try {
      const result = await productApiRequest.delete(product.id);
      toast.success("", {
        description: result.payload.message,
      });
      router.refresh()
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return (
    <>
      {" "}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"}>Xóa</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có muốn xóa không?</AlertDialogTitle>
            <AlertDialogDescription>
              Sản phẩm &rdquo;{product.name}&rdquo; sẽ bị xóa vĩnh viễn
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProduct}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
