import React from "react";
import User from "@/lib/mongo/models/User";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import jwt from "jsonwebtoken";
import TypeItems from "../TypeItems";

type Props = {
  type: string;
};
interface JwtPayload {
  id: string;
}

const Types = async (props: Props) => {
  const session = await getServerSession(authOption);
  //console.log(session);
  const decoded = jwt.verify(
    session.user.token,
    process.env.JWT_SECRET
  ) as JwtPayload;

  const user = await User.findById(decoded.id);
  let data = [];
  if (props.type === "expenses") {
    data = user.ExpenseType;
  } else if (props.type === "incomes") {
    data = user.IncomeType;
  }
  // if (props.searchParams?.type === "expenses") {
  //   data = user.expenses;
  // } else if (props.searchParams?.type === "incomes") {
  //   data = user.incomes;
  // } else {
  //   data = user.expenses;
  // }
  return (
    <div className="flex w-[100%] justify-center flex-wrap gap-y-[20px] gap-x-[35px] text-[2.6rem] place-content-start">
      {data &&
        data.length !== 0 &&
        data.map((el) => (
          <TypeItems type={el.type} color={el.color}></TypeItems>
        ))}
    </div>
  );
};

export default Types;
