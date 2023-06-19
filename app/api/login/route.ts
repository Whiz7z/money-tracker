import User from "@/lib/mongo/models/User";
import dbConnect from "../../../lib/mongo/mongoConnect";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const genToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "60d" });
};

export async function POST(req: Request) {
  const { username, password } = await req.json();

  console.log(username, password);

  await dbConnect();

  const user = await User.findOne({ username }).select(
    "-__v -createdAt -updatedAt"
  );

  console.log("login user", user);

  if (user && (await user.matchPasswords(password))) {
    return new NextResponse(
      JSON.stringify({
        id: user._id,
        name: user.username,
        token: genToken(user._id),
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `user-token=${genToken(user._id)}; expires=${new Date(
            2024,
            0,
            1
          )}`,
        },
      }
    );
  }

  return new NextResponse(
    "User with this username does not exist or password is not correct",
    { status: 400 }
  );
}
