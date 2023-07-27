import React from "react";
import { createPortal } from "react-dom";

type Props = {};

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {createPortal(
        <div className="fixed grid h-screen w-screen bg-modal ">
          <div
            className="fixed grid w-[560px] h-[400px] bg-muted justify-self-center self-center
          rounded-[5px]"
          >
            {children}
          </div>
        </div>,
        document.getElementById("main")
      )}
    </>
  );
};

export default Modal;
