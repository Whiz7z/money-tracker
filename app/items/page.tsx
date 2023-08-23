import React from "react";
import ItemsList from "@/components/ItemsList";
import MoveBack from "../../components/navigation/MoveBack";

type Props = {};

const page = ({ searchParams }) => {
  //console.log(searchParams);
  return (
    <>
      {/* <div className="w-[100%] grid ">
        <div className="text-skin-base w-[70px] h-[70px] bg-muted p-[20px] rounded-[5px] cursor-pointer">
          <MoveBack />
        </div>
      </div> */}
      {/* @ts-expect-error Server Component */}
      <ItemsList searchParams={searchParams} />
    </>
  );
};

export default page;
