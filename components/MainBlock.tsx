import React from "react";
import MoveBack from "./navigation/MoveBack";
import MoveForward from "./navigation/MoveForward";

type Props = {
  children: React.ReactNode;
};

const MainBlock = (props: Props) => {
  return (
    <div
      className="relative grid h-[1000px] max-w-[33%] min-w-[900px]
     bg-block rounded-tl-[200px] rounded-br-[200px] rounded-tr-[120px] rounded-bl-[120px] shadow-mainBlock
      justify-center "
    >
      {/* <div className="absolute w-[100%] grid grid-cols-2 top-[80px]">
        <div className="absolute text-skin-base left-[100px] cursor-pointer">
          <MoveBack />
        </div>
        <div className="absolute text-skin-base right-[100px] cursor-pointer">
          <MoveForward />
        </div>
      </div> */}
      {props.children}
    </div>
  );
};

export default MainBlock;
