import { headers } from "next/headers";
import dbConnect from "../../../lib/mongo/mongoConnect";
import jwt from "jsonwebtoken";
import User from "@/lib/mongo/models/User";
import { groupData } from "@/utils/groupData";
import { NextResponse, NextRequest } from "next/server";
import sortByDate from "@/utils/sortByDate";

interface JwtPayload {
  id: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const originName = searchParams.get("originName");
  const type = searchParams.get("type");

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
