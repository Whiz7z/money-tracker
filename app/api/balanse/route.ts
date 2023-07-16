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
const getTokenId = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  return decoded.id;
};
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  //console.log("params", month);

  if (month.trim().length < 1 || year.trim().length < 1) {
    return new NextResponse("Invadid month or year data");
  }
  const headersList = headers();
  let token = headersList.get("authorization").split(" ")[1];
  //console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    console.log("decoded ID", decoded);
    await dbConnect();
    console.log("month", new Date("June 20, 2023 00:20:18").getMonth());
    const user = await User.findById(decoded.id).select(
      "-__v -createdAt -updatedAt"
    );
    if (user) {
      //console.log(user);
      const expenseBalanseOfTheMonth = user.ExpenseBalanse.filter(
        (el) =>
          new Date(el.date).getMonth() === Number(month) &&
          new Date(el.date).getFullYear() === Number(year)
      );

      const incomeBalanseOfTheMonth = user.IncomeBalanse.filter(
        (el) =>
          new Date(el.date).getMonth() === Number(month) &&
          new Date(el.date).getFullYear() === Number(year)
      );

      console.log({
        expenseBalanse: expenseBalanseOfTheMonth[0],
        incomeBalanse: incomeBalanseOfTheMonth[0],
      });
      return NextResponse.json({
        expenseBalanse: expenseBalanseOfTheMonth[0],
        incomeBalanse: incomeBalanseOfTheMonth[0],
      });
    }
  } catch (err) {
    //console.log("error", err)lj
    return new NextResponse("user expenses error");
  }
}
