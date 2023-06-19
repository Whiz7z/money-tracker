import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// const Expense = mongoose.model("Expense", expenseSchema);
const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
export default Expense;
