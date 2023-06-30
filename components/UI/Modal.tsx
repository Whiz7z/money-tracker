import React from "react";
import { createPortal } from "react-dom";

type Props = {};

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {createPortal(
        <div className="fixed grid h-screen w-screen bg-modal">
          <div className="fixed w-[400px] h-[300px] bg-fill justify-self-center self-center">
            {children}
          </div>
        </div>,
        document.getElementById("main")
      )}
    </>
  );
};

export default Modal;
