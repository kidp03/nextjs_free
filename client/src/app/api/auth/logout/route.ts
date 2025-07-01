import authApiRequest from "@/apiRequest/auth";
import { EntityError } from "@/lib/http";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force as boolean | undefined;
  if (force) {
    return Response.json(
      {
        message: "Buộc đăng xuất thành công",
      },
      {
        status: 200,
        headers: {
          //xoa cookie session token
          "Set-Cookie": `sessionToken=;Path=/; HttpOnly; Max-Age=0`,
        },
      }
    );
  }
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  if (!sessionToken) {
    return Response.json(
      {
        message: "khong nhan duoc session token",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const result = await authApiRequest.logoutFromNextServerToServer(
      sessionToken.value
    );
    return Response.json(result.payload, {
      status: 200,
      headers: {
        //xoa cookie session token
        "Set-Cookie": `sessionToken=;Path=/; HttpOnly; Max-Age=0`,
      },
    });
  } catch (error) {
    if (error instanceof EntityError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Loi ko xac dinh",
        },
        {
          status: 500,
        }
      );
    }
  }
}
