"use client";
import React from "react";
import LeftArrow from "@/svgComponents/LeftArrow";
import { useRouter } from "next/navigation";
type Props = {};

const MoveBack = (props: Props) => {
  const router = useRouter();
  return <div onClick={() => router.back()}>Back</div>;
};

export default MoveBack;
