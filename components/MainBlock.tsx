import React from "react";
import MoveBack from "./navigation/MoveBack";
import MoveForward from "./navigation/MoveForward";

type Props = {
  children: React.ReactNode;
};

const MainBlock = (props: Props) => {
  return (
    <div className="relative grid justify-center h-screen ">
      {props.children}
    </div>
  );
};

export default MainBlock;
