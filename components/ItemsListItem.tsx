import React from "react";
import Times from "@/svgComponents/Times";

type Props = { item: any; type: string };

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function ItemsListItem({ item, type }: Props) {
  const { origin, amount, date } = item;
  const dayAndMonth =
    new Date(date).getDate() + " " + months[new Date(date).getMonth()];
  return (
    <div
      className="grid grid-cols-[1fr_1fr_auto] cursor-pointer
     hover:bg-neutral-950 p-[5px] hover:transition-all items-center content-center"
    >
      <div className="grid grid-cols-2 items-center content-center">
        <div className="justify-self-start">${amount}</div>
        <div className="justify-self-start">{origin.name}</div>
      </div>

      <div className="justify-self-center">{dayAndMonth}</div>
      <button
        type="button"
        className="w-[35px] h-[35px] hover:bg-danger justify-self-end"
      >
        <Times w="35px" h="35px" color="#c7ccdb" />
      </button>
    </div>
  );
}

export default ItemsListItem;
