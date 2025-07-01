import { EntityError } from "@/lib/http";
import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import jwt from 'jsonwebtoken'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  } else {
    toast("Lỗi", {
      description: error?.payload?.message ?? "Loi khong xac dinh",
      duration: duration ?? 5000,
    });
  }
};
/** xoa di ky tu / dau tien */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}
export const decodeJWT = <Payload = any>(token:string) => {
  return jwt.decode(token) as Payload
}