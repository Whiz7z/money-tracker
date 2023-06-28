
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
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  console.log("dates backend", month, year);

  const headersList = headers();
  let token = headersList.get("authorization").split(" ")[1];
  //console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    await dbConnect();

    const user = await User.findById(decoded.id).select(
      "-__v -createdAt -updatedAt"
    );
    if (user) {
      const groupedData = groupData(
        user.expenses.filter(
          (el) =>
            new Date(el.date).getMonth() === Number(month) &&
            new Date(el.date).getFullYear() === Number(year)
        )
      );
      console.log(
        "grouped expenses",
        new Date(user.expenses[0].date).getMonth()
      );
      return NextResponse.json({
        expenses: user.expenses,
        groupedExpenses: groupedData,
      });
    }
  } catch (err) {
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

  console.log("user", user);
  const dateExists = user.ExpenseBalanse
    ? user.ExpenseBalanse.findIndex(
        (el) =>
          new Date(el.date).getMonth() === new Date(date).getMonth() &&
          new Date(el.date).getFullYear() === new Date(date).getFullYear()
      )
    : false;

  if (dateExists !== -1) {
    user.ExpenseBalanse[dateExists].amount += Number(amount);
  } else if (dateExists === -1) {
    user.ExpenseBalanse.push({
      date: date,
      amount: amount,
    });
  }

  user.expenses.push({
    origin: origin,
    amount: amount,
    date: date,
  });

  user.save();

  return new NextResponse("created");
}
