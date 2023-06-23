import mongoose from "mongoose";
import mongoConnect from "../mongoConnect";
import bcrypt from "bcryptjs";

const originSchema = new mongoose.Schema({
  name: { type: String },
  color: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    ExpenseBalanse: [{ date: { type: String }, amount: { type: Number } }],
    IncomeBalanse: [{ date: { type: String }, amount: { type: Number } }],
    expenses: [
      {
        origin: { color: String, name: String },
        amount: { type: Number },
        date: { type: String },
      },
    ],

    // default: [
    //   {
    //     origin: {
    //       color: "ea3445",
    //       name: "Food",
    //     },
    //     amount: 140,
    //     date: "2023.06.08",
    //   },
    // ],

    incomes: [
      {
        origin: { color: String, name: String },
        amount: { type: Number },
        date: { type: String },
      },
    ],
    ExpenseType: { type: Array },
    IncomeType: [originSchema],
  },
  { timestamps: true, strict: false }
);

userSchema.methods.matchPasswords = async function (enteredPassword: any) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// const Expense = mongoose.model("Expense", expenseSchema);
const User = mongoose.models?.Userr || mongoose.model("Userr", userSchema);
export default User;
