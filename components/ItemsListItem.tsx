import React from "react";
import DeleteItemBtn from "./DeleteItemBtn";
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

const ItemsListItem: any = ({ item, type }: Props) => {
  const { origin, amount, date } = item;
  const dayAndMonth =
    new Date(date).getDate() + " " + months[new Date(date).getMonth()];
  return (
    <div
      className="grid grid-cols-[1fr_1fr_auto] cursor-pointer 
      p-[10px]  content-center w-[100%] h-[45px] justify-self-center
      border-b-2 border-transparent
       hover:transition-all hover:bg-semitransparent hover:border-b-2 hover:border-ordinary"
    >
      <div className="grid grid-cols-2 items-center content-center">
        <div className="justify-self-start">${amount}</div>
        <div className="justify-self-start">{origin.name}</div>
      </div>

      <div className="justify-self-center">{dayAndMonth}</div>
      <DeleteItemBtn id={item._id} date={date} type={type} />
    </div>
  );
};

export default ItemsListItem;
