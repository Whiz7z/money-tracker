import React from "react";

type Props = {
  color: string;
  w: string;
  h: string;
  onClick: () => void;
};

const LeftArrow = ({ color, w, h, onClick }: Props) => {
  return (
    <svg
      height={h}
      width={w}
      viewBox="0 0 1024 1024"
      className="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
        fill={color}
      />
    </svg>
  );
};

export default LeftArrow;
