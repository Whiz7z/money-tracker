import dbConnect from "../../../lib/mongo/mongoConnect";
import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/lib/mongo/models/User";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";

interface JwtPayload {
  id: string;
}

export async function GET(req: NextRequest) {
  // const session = await getServerSession<unknown, any>(authOption);
  // console.log("session", session);
  const headerList = headers();
  const authHeader = headerList.get("Authorization");

  const token = authHeader.split(" ")[1];

  console.log("Token", token);
  //const { session } = await req.json();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    await dbConnect();
    const user = await User.findById(decoded.id);
    if (user) {
      // console.log("origins", user.ExpenseType);

      return new NextResponse(
        JSON.stringify({
          origins: user.IncomeType,
        }),
        { status: 200 }
      );
    }
  } catch (err) {
    //console.log("error", err)lj
    return new NextResponse("user ExpenseOrigins error");
  }
}

export async function PUT(req: NextRequest) {
  // const session = await getServerSession<unknown, any>(authOption);
  // console.log("session", session);
  const { session, type } = await req.json();
  console.log("session type", session, type);
  try {
    const decoded = jwt.verify(
      session!.user!.token,
      process.env.JWT_SECRET
    ) as JwtPayload;

    await dbConnect();
    const user = await User.findById(decoded.id);
    if (user) {
      user.IncomeType = user.IncomeType.filter((el) => el.name !== type);
      await user.save();
      return new NextResponse(
        JSON.stringify({
          incomeOrigins: "deleted",
        }),
        { status: 200 }
      );
    }
  } catch (err) {
    //console.log("error", err)lj
    return new NextResponse("user ExpenseOrigins error");
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession<unknown, any>(authOption);
  console.log(session);
  const { name, color } = await req.json();
  console.log("name", name, "color", color);
  //console.log("headers", headersList);

  const decoded = jwt.verify(
    session!.user!.token,
    process.env.JWT_SECRET
  ) as JwtPayload;

  await dbConnect();
  const expenseOrigin = await User.findById(decoded.id);

  await User.findOneAndUpdate(
    { _id: decoded.id },
    {
      $push: {
        IncomeType: { name: name, color: color },
      },
    }
  );

  // if (expenseOrigin) {
  //   console.log("array", expenseOrigin);
  //   expenseOrigin.ExpenseType.push(
  //     JSON.stringify({ name: name, color: color })
  //   );
  //   await expenseOrigin.save();
  // }
  const tag = req.nextUrl.searchParams.get("tag");
  revalidateTag(tag);
  return NextResponse.json({ revalidated: true });
}
