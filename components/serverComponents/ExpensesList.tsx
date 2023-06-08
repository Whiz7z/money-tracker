import React from "react";
import ListItem from "../ListItem";

type Props = {};

const ExpensesList = (props: Props) => {
  return (
    <div className="grid gap-[15px] mt-[33px] max-h-[210px] overflow-y-scroll">
      <ListItem color="c7dc7d" type="Food" amount={235.45} />
      <ListItem color="40e482" type="Car" amount={175.0} />
      <ListItem color="84a6b0" type="Sigarets" amount={85.5} />
      <ListItem color="6f1a07" type="Entertaiment" amount={120.0} />
      <ListItem color="84a6b0" type="Alcohol" amount={55.5} />
      <ListItem color="6f1a07" type="City transport" amount={85.35} />
    </div>
  );
};

export default ExpensesList;
