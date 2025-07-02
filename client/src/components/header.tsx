import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { cookies } from "next/headers";
import accountApiRequest from "@/apiRequest/account";
import { AccountResType } from "@/schemaValidations/account.schema";

export default async function Header({
  user,
}: {
  user: AccountResType["data"] | null;
}) {
  return (
    <div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Trang chủ</Link>
        </li>
        <li>
          <Link href="/products">Sản phẩm</Link>
        </li>
        {user ? (
          <>
            <li>
              <div>
                Xin chào{" "}
                <strong>
                  <Link href="/me">{user.name}</Link>
                </strong>
              </div>
            </li>
            <li>
              <ButtonLogout />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Đăng nhập</Link>
            </li>
            <li>
              <Link href="/register">Đăng ký</Link>
            </li>
          </>
        )}
      </ul>
      <ModeToggle />
    </div>
  );
}
