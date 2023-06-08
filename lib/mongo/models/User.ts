import mongoose from "mongoose";
import mongoConnect from "../mongoConnect";
import bcrypt from "bcryptjs";
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
    expenses: {
      type: [
        {
          origin: { type: String, required: true },
          amount: Number,
          date: Date,
        },
      ],
      default: [],
    },
    incomes: {
      type: [
        {
          origin: { type: String, required: true },
          amount: Number,
          date: Date,
        },
      ],
      default: [],
    },
    ExpenseType: {
      type: Array,
      default: [],
    },
    IncomeType: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
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
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
