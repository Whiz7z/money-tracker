"use server";

export const createNewOrigin = async (name, color) => {
  console.log(name, color, "new origin values");

  await fetch(`/api/expenseOrigins`, {
    method: "POST",
    body: JSON.stringify({ name: name, color: color }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // await fetch(`/api/revalidate`, {
  //   method: "GET",
  //   next: { tags: ["collection"] },
  // });
};
