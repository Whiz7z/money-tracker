import React from "react";

type Props = {
  color: string;
  w: string;
  h: string;
  className: string;
  style: any;
  onClick: () => void;
};

function Times({ color, w, h, className, style, ...props }: Props) {
  return (
    <div className={className} style={style} {...props}>
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 8L8 16M8 8L16 16"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default Times;
