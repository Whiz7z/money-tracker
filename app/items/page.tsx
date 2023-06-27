import React from "react";

type Props = {};

const page = async ({ searchParams }) => {
  const response = await fetch(
    `http://localhost:3000/api/getItems?type=${searchParams.type}&month=${searchParams.month}&year=${searchParams.year}`,
    { method: "GET" }
  );
  console.log(searchParams);
  return <div>{searchParams.type}</div>;
};

export default page;
