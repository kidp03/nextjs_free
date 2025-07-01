import accountApiRequest from "@/apiRequest/account";
import Profile from "@/app/me/profile";
import ProfileForm from "@/app/me/profile-form";
import envConfig from "@/config";
import { cookies } from "next/headers";
export default async function Meprofile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await accountApiRequest.me(sessionToken?.value ?? "")

  return (
    <div>
      <h1>Thong tin ca nhan</h1>
      <div>Xin chao {result.payload.data.name}</div>
      <ProfileForm profile={result.payload.data}  />
    </div>
  );
}
