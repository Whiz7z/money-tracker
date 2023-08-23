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
      className={`grid grid-cols-[100px_1fr_80px] cursor-pointer 
      content-center w-[100%] h-[45px] justify-self-center
      border-transparent bg-item  border-b-[1px] border-b-border
       hover:transition-all hover:bg-input hover:border-b-2 hover:border-ordinary
      text-[1.6rem] ${
        type === "expenses" ? "text-skin-danger" : "text-skin-good"
      } `}
    >
      <div className="grid grid-cols-2 items-center content-center ml-[21px]">
        <div className="justify-self-start self-center">${amount}</div>
      </div>

      <div className="justify-self-start self-center ml-[66px]">
        {dayAndMonth}
      </div>
      <DeleteItemBtn id={item._id} date={date} type={type} />
    </div>
  );
};

export default ItemsListItem;
