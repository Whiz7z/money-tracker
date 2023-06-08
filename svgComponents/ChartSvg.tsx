import React from "react";

type Props = {
  w: string;
  h: string;
};

const ChartSvg = (props: Props) => {
  return (
    <svg
      height={props.h}
      width={props.w}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 58 58"
      xmlSpace="preserve"
    >
      <g>
        <path
          fill="#F0785A"
          d="M31,26.962h26.924C56.94,12.541,45.421,1.022,31,0.038V26.962z"
        />
        <path
          fill="#F0C419"
          d="M50.386,48.615c4.343-4.71,7.151-10.858,7.614-17.653H32.733L50.386,48.615z"
        />
        <path
          fill="#556080"
          d="M27,28.134V0.038C11.918,1.067,0,13.619,0,28.962C0,36.25,2.695,42.905,7.134,48L27,28.134z"
        />
        <path
          fill="#71C285"
          d="M28.414,32.376L9.962,50.828c5.095,4.439,11.75,7.134,19.038,7.134
		c6.99,0,13.396-2.479,18.401-6.599L28.414,32.376z"
        />
      </g>
    </svg>
  );
};

export default ChartSvg;
