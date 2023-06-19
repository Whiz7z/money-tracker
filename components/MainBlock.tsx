import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainBlock = (props: Props) => {
  return (
    <div
      className="h-[1000px] max-w-[33%] min-w-[900px]
     bg-block rounded-tl-[180px] rounded-br-[180px] rounded-tr-[45px] rounded-bl-[45px] shadow-mainBlock
     flex justify-center "
    >
      {props.children}
    </div>
  );
};

export default MainBlock;
