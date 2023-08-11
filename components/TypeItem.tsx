"use client";
import React, { useState } from "react";
import Times from "@/svgComponents/Times";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentOrigin } from "@/Redux/expensesOrigin";
type Props = {
  type: string;
  color: string;
  recordType: string;
};
const TypeItem = ({ type, color, recordType }: Props) => {
  const [showCross, setShowCross] = useState(false);
  const { data: session, status } = useSession();
  const { currentOrigin } = useSelector((state: any) => state.expensesOrigin);
  const dispatch = useDispatch();
  const router = useRouter();

  const deleteOriginHandler = (session, typeName) => {
    console.log(
      JSON.stringify({
        session: session,
        type: typeName,
      })
    );
    fetch(
      `/api/${recordType === "expenses" ? "expenseOrigins" : "incomeOrigins"}`,
      {
        method: "PUT",
        body: JSON.stringify({
          session: session,
          type: typeName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => router.refresh());
  };

  const setCurrentOriginHandler = () => {
    dispatch(setCurrentOrigin({ name: type, color: color }));
  };

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setShowCross(true)}
        onMouseLeave={() => setShowCross(false)}
        onClick={() => setCurrentOriginHandler()}
        style={{
          backgroundColor:
            currentOrigin.name === type ? "#e49940" : "transparent",

          color: currentOrigin.name === type && "#1e1e1e",
          fontWeight: currentOrigin.name === type && "bold",
        }}
      >
        <p
          className={`border-b-4 self-start cursor-pointer `}
          style={{ borderColor: `${color}` }}
        >
          {type}
        </p>
        <Times
          color="#fff"
          w={"25px"}
          h={"25px"}
          className="absolute cursor-pointer bg-red-600 w-[25px] h-[25px] top-[0px] left-[100%] "
          style={{ display: showCross ? "block" : "none" }}
          onClick={() => deleteOriginHandler(session, type)}
        />
      </div>
    </>
  );
};

export default TypeItem;
