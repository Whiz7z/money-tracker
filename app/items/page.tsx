import React from "react";
import ItemsList from "@/components/ItemsList";
import MoveBack from "../../components/navigation/MoveBack";

type Props = {};

const page = async ({ searchParams }) => {
  //console.log(searchParams);
  return (
    <>
      <div className="absolute w-[100%] grid grid-cols-2 top-[80px]">
        <div className="absolute text-skin-base left-[100px] cursor-pointer">
          <MoveBack />
        </div>
      </div>

      <ItemsList searchParams={searchParams} />
    </>
  );
};

export default page;
