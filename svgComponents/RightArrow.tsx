import React from "react";

type Props = {
  color: string;
  w: string;
  h: string;
  onClick: () => void;
};

const RightArrow = ({ color, w, h, onClick }: Props) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 1024 1024"
      className="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
        fill={color}
      />
    </svg>
  );
};

export default RightArrow;
