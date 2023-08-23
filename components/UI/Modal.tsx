import React from "react";
import { createPortal } from "react-dom";

type Props = {};

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {createPortal(
        <div className="fixed grid h-screen w-screen bg-modal ">
          <div
            className="fixed grid w-[300px] laptop:w-[560px] h-[400px] bg-[#000] 
            justify-self-center self-center
          "
          >
            <div className="shadow-modal"></div>
            <div className="relative w-[300px] grid justify-self-center laptop:w-[560px] h-[400px] bg-[#000] ">
              {children}
            </div>
          </div>
        </div>,
        document.getElementById("main")
      )}
    </>
  );
};

export default Modal;
