"use client";
import React, { useState } from "react";
import Times from "@/svgComponents/Times";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentOrigin } from "@/Redux/expensesOrigin";
type Props = {
  type: string;
  color: string;
};
const TypeItem = ({ type, color }: Props) => {
  const [showCross, setShowCross] = useState(false);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  const deleteOriginHandler = (session, typeName) => {
    console.log(
      JSON.stringify({
        session: session,
        type: typeName,
      })
    );
    fetch("http://localhost:3000/api/expenseOrigins", {
      method: "PUT",
      body: JSON.stringify({
        session: session,
        type: typeName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => router.refresh());
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
      >
        <p
          className={`border-b-4 self-start cursor-pointer `}
          style={{ borderColor: `${color}` }}
        >
          {type}
        </p>
        <Times
          color="#fff"
          w={"15px"}
          h={"15px"}
          className="absolute cursor-pointer bg-red-600 w-[15px] h-[15px] top-[0px] left-[99%] "
          style={{ display: showCross ? "block" : "none" }}
          onClick={() => deleteOriginHandler(session, type)}
        />
      </div>
    </>
  );
};

export default TypeItem;
