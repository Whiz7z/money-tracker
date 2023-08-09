import React from "react";
import MoveBack from "./navigation/MoveBack";
import MoveForward from "./navigation/MoveForward";

type Props = {
  children: React.ReactNode;
};

const MainBlock = (props: Props) => {
  return (
    <div
      className="my-[20px] relative grid gap-[20px] 
      justify-center "
    >
      {props.children}
    </div>
  );
};

export default MainBlock;
