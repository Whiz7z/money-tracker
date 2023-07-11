import React from "react";
import { createPortal } from "react-dom";

type Props = {};

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {createPortal(
        <div className="fixed grid h-screen w-screen bg-modal ">
          <div className="fixed grid w-[560px] h-[400px] bg-semitransparent justify-self-center self-center rounded-tl-[120px] rounded-br-[120px] rounded-tr-[80px] rounded-bl-[80px] ">
            {children}
          </div>
        </div>,
        document.getElementById("main")
      )}
    </>
  );
};

export default Modal;
