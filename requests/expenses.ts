export const getExpenses = async (token: any) => {
  const response = await fetch("/api/expenses", {
    next: { revalidate: 10 },

    headers: { Authentication: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("unable to fetch expenses");

  const data = await response.json();
  return data;
};
