import Expense from "../../../lib/mongo/models/Expense";
import mongoConnect from "../../../lib/mongo/mongoConnect";
import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/lib/mongo/models/User";

interface JwtPayload {
  id: string;
}

export async function GET(req: Request) {
  const headersList = headers();
  console.log(headersList);
  let token = headersList.get("authorization").split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    console.log("decoded ID", decoded.id);
    await mongoConnect();

    const user = await User.findById(decoded.id).select(
      "-__v -createdAt -updatedAt"
    );
    if (user) {
      console.log(user);
      return NextResponse.json(user.expenses);
    }
  } catch (err) {
    //console.log("error", err)lj
    return new NextResponse("user expenses error");
  }
}

export async function POST(req: Request) {
  mongoConnect();
  const expense = await Expense.create({ amount: 50, type: "expense" });
  expense.save();

  return new NextResponse("created");
}
