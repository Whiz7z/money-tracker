"use server";

export const createNewOrigin = async (name, color) => {
  console.log(name, color, "new origin values");

  await fetch(`${process.env.NEXTAUTH_URL}/api/expenseOrigins`, {
    method: "POST",
    body: JSON.stringify({ name: name, color: color }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate`, {
  //   method: "GET",
  //   next: { tags: ["collection"] },
  // });
};
