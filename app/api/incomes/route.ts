import Expense from "../../../lib/mongo/models/Expense";
import dbConnect from "../../../lib/mongo/mongoConnect";
import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/lib/mongo/models/User";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { groupData } from "@/utils/groupData";

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
    await dbConnect();

    const user = await User.findById(decoded.id).select(
      "-__v -createdAt -updatedAt"
    );
    if (user) {
      console.log(user);

      const groupedData = groupData(user.incomes);
      return NextResponse.json({
        incomes: user.incomes,
        groupedIncomes: groupedData,
      });
    }
  } catch (err) {
    //console.log("error", err)lj
    return new NextResponse("user expenses error");
  }
}

export async function POST(req: Request) {
  const session = await getServerSession<unknown, any>(authOption);
  console.log(session);
  const { origin, amount, date } = await req.json();

  //console.log("headers", headersList);

  const decoded = jwt.verify(
    session!.user!.token,
    process.env.JWT_SECRET
  ) as JwtPayload;

  await dbConnect();
  const user = await User.findById(decoded.id).select(
    "-__v -createdAt -updatedAt"
  );

  const dateExists = user.IncomeBalanse
    ? user.IncomeBalanse.findIndex(
        (el) =>
          new Date(el.date).getMonth() === new Date(date).getMonth() &&
          new Date(el.date).getFullYear() === new Date(date).getFullYear()
      )
    : false;

  if (dateExists !== -1) {
    user.IncomeBalanse[dateExists].amount += Number(amount);
  } else if (dateExists === -1) {
    user.IncomeBalanse.push({
      date: date,
      amount: amount,
    });
  }
  user.incomes.push({ origin: origin, amount: amount, date: date });

  user.save();

  return new NextResponse("created");
}
