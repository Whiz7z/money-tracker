"use client";
import React from "react";
import { useRouter } from "next/navigation";
type Props = {
  w: string;
  h: string;
  fill: string;
};

const ListSvg = (props: Props) => {
  const router = useRouter();
  const changeDisplayHandler = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("display", "list");

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname);
  };
  return (
    <div onClick={() => changeDisplayHandler()} className="cursor-pointer">
      <svg
        fill={props.fill}
        width={window.innerWidth <= 460 ? "30px" : props.w}
        height={window.innerWidth <= 460 ? "30px" : props.h}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
      </svg>
    </div>
  );
};

export default ListSvg;
