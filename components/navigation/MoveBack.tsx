"use client";
import React from "react";
import LeftArrow from "@/svgComponents/LeftArrow";
import { useRouter } from "next/navigation";
type Props = {};

const MoveBack = (props: Props) => {
  const router = useRouter();
  return (
    <LeftArrow
      w="30px"
      h="30px"
      color="#e49940"
      onClick={() => router.back()}
    />
  );
};

export default MoveBack;
