import { headers } from "next/headers";
import dbConnect from "../../../lib/mongo/mongoConnect";
import jwt from "jsonwebtoken";
import User from "@/lib/mongo/models/User";
import { groupData } from "@/utils/groupData";
import { NextResponse, NextRequest } from "next/server";
import sortByDate from "@/utils/sortByDate";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";

interface JwtPayload {
  id: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const originName = searchParams.get("originName");
  const type = searchParams.get("type");

  if (
    month.trim().length < 1 ||
    year.trim().length < 1 ||
    originName.trim().length < 1 ||
    type.trim().length < 1
  ) {
    return new NextResponse("Invadid data");
  }

  //console.log("dates backend", month, year);

  const headersList = headers();
  let token = headersList.get("authorization").split(" ")[1];
  //console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    await dbConnect();

    const user = await User.findById(decoded.id).select(
      "-__v -createdAt -updatedAt"
    );
    if (user && type === "expenses") {
      const expensesFiltered = user.expenses.filter(
        (el) =>
          el.origin.name === originName &&
          new Date(el.date).getMonth() === Number(month) &&
          new Date(el.date).getFullYear() === Number(year)
      );

      const expensesSorted = expensesFiltered.sort(sortByDate);

      return NextResponse.json({
        items: expensesSorted,
      });
    } else if (user && type === "incomes") {
      const incomesFiltered = user.incomes.filter(
        (el) =>
          el.origin.name === originName &&
          new Date(el.date).getMonth() === Number(month) &&
          new Date(el.date).getFullYear() === Number(year)
      );

      const incomesSorted = incomesFiltered.sort(sortByDate);

      return NextResponse.json({
        items: incomesFiltered,
      });
    } else {
      return new NextResponse("cannot get items ");
    }
  } catch (err) {
    return new NextResponse("cannot get items ");
  }
}

export async function POST(req: Request) {
  const session = await getServerSession<unknown, any>(authOption);
  console.log(session);
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const date = searchParams.get("date");

  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();
  console.log("date date", date);

  if (type.trim().length < 1 || id.trim().length < 1) {
    return new NextResponse("Invadid month or year data");
  }

  if (!session) {
    return new NextResponse("Invadid session  data");
  }

  //console.log("headers", headersList);

  const decoded = jwt.verify(
    session!.user!.token,
    process.env.JWT_SECRET
  ) as JwtPayload;

  await dbConnect();
  const user = await User.findById(decoded.id).select(
    "-__v -createdAt -updatedAt"
  );

  if (type === "expenses") {
    //console.log(user.expenses.filter((el) => el.id !== id)); ПЕРЕСТАВИТИ МІСЦЯМИ
    console.log(user.expenses.findIndex((el) => el.id === id));
    user.expenses = user.expenses.filter((el) => el.id !== id);
    const index = user.ExpenseBalanse.findIndex(
      (el) =>
        new Date(el.date).getFullYear() === Number(year) &&
        new Date(el.date).getMonth() === Number(month)
    );

    user.ExpenseBalanse[index].amount =
      user.ExpenseBalanse[index].amount -
      user.expenses.find((el) => el.id === id).amount;
    user.save();
    return new NextResponse("deleted");
  }

  if (type === "incomes") {
    // console.log(user.incomes.filter((el) => el.id !== id));
    user.incomes = user.incomes.filter((el) => el.id !== id);
    user.save();
    return new NextResponse("deleted");
  }

  return new NextResponse("Invalid request, could not delete an item");
}
