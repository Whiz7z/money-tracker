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
    <div className="grid grid-cols-3">
      <div className="grid grid-cols-2">
        <div className="justify-self-start ">${amount}</div>
        <div>{origin.name}</div>
      </div>
      <button
        type="button"
        className="w-[30px] h-[30px] hover:bg-danger justify-self-end"
      >
        <Times w="30px" h="30px" color="#c7ccdb" />
      </button>
      <div className="justify-self-end">{dayAndMonth}</div>
    </div>
  );
}

export default ItemsListItem;
