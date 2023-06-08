import User from "@/lib/mongo/models/User";
import mongoConnect from "../../../lib/mongo/mongoConnect";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const genToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "60d" });
};

export async function POST(req: Request, res: Response) {
  const { username, password } = await req.json();

  console.log(username, password);

  await mongoConnect();

  const userExists = await User.findOne({ username }).select(
    "-__v -createdAt -updatedAt"
  );

  console.log(userExists);

  if (userExists) {
    return new NextResponse(
      "We already have an account with that email address.",
      {
        status: 400,
      }
    );
  }
  const user = await User.create({
    username,
    password,
  });

  if (user) {
    return new NextResponse(
      JSON.stringify({
        id: user._id,
        username: user.username,
        expenseTypes: user.ExpenseType,
        incomeTypes: user.IncomeType,
        expenses: user.expenses,
        incomes: user.incomes,
        token: genToken(user._id),
      })
    );
  }

  return new NextResponse("Error", {
    status: 500,
  });
}
