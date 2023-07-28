import React from "react";
import MoveBack from "./navigation/MoveBack";
import MoveForward from "./navigation/MoveForward";

type Props = {
  children: React.ReactNode;
};

const MainBlock = (props: Props) => {
  return (
    <div
      className="relative grid h-[1020px] 
      justify-center "
    >
      {props.children}
    </div>
  );
};

export default MainBlock;
