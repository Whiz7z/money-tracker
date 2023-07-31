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
  const { session, type } = await req.json();

  if (!session || type.trim().length < 1) {
    return new NextResponse("Invadid session or type data");
  }
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

  const { name, color } = await req.json();
  if (name.trim().length < 1 || color.trim().length < 1) {
    return new NextResponse("Invadid name or color data");
  }

  const decoded = jwt.verify(
    session!.user!.token,
    process.env.JWT_SECRET
  ) as JwtPayload;

  await dbConnect();

  const user = await User.findById(decoded.id);
  const isTypeExists = user.IncomeType.find(
    (el) => el.name.toLowerCase() === name.toLowerCase()
  );

  if (isTypeExists === undefined) {
    await User.findOneAndUpdate(
      { _id: decoded.id },
      {
        $push: {
          IncomeType: { name: name, color: color },
        },
      }
    );
  } else {
    return new NextResponse("Type already exists");
  }

  const tag = req.nextUrl.searchParams.get("tag");
  revalidateTag(tag);
  return NextResponse.json({ revalidated: true });
}
