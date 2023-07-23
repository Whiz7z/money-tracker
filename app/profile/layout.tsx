import React from "react";
import LogOutBtn from "@/components/LogOutBtn";

type Props = {};

const layout = ({ children }) => {
  return (
    <>
      <LogOutBtn />
      {children}
    </>
  );
};

export default layout;
