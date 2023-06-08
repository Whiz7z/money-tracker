import Expense from "../models/Expense";
import mongoConnect from "../mongoConnect";
import { NextResponse, NextRequest } from "next/server";

export async function getAllExpenses() {
  await mongoConnect();
  const expenses = await Expense.find({});
  if (expenses) {
    console.log(expenses);
    return expenses;
  } else {
    return "expenses";
  }
}
