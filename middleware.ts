import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pages } from "./utils/authOption";
import { getServerSession } from "next-auth";
import { withAuth } from "next-auth/middleware";
import getTokenId from "./utils/getTokenId";
import User from "./lib/mongo/models/User";
import jwt from "jsonwebtoken";
interface JwtPayload {
  id: string;
}
export async function middleware(request: NextRequest) {
  //console.log(request.cookies.get("next-auth.session-token").value);

  // const userId = getTokenId(
  //   request.cookies.get("next-auth.session-token").value
  // );

  // if (request.cookies.get("next-auth.session-token").value) {
  //   return NextResponse.redirect(new URL("/profile", request.url));
  // }

  return NextResponse.next();
}

export const config = { matcher: "/" };

// export default withAuth({
//   pages,
//   callbacks: {
//     async authorized({ req, token }) {
//       const session = await getServerSession<unknown, any>();
//       console.log(session);
//       if (token) return true; // If there is a token, the user is authenticated
//     },
//   },
// });
