import React from "react";

type Props = {};

const layout = ({ children }) => {
  return (
    <div
      className="grid justify-self-center text-skin-base w-[655px]  h-[860px] mt-[50px] 
        "
    >
      {children}
    </div>
  );
};

export default layout;
