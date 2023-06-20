import React from "react";
import RightArrow from "@/svgComponents/RightArrow";
import { useRouter } from "next/navigation";

type Props = {};

const MoveForward = (props: Props) => {
  const router = useRouter();
  return (
    <RightArrow
      w="30px"
      h="30px"
      color="#fff"
      onClick={() => router.forward()}
    />
  );
};

export default MoveForward;
