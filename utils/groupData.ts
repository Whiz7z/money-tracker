export const groupData = (data: any[]) => {
  let groupedData = [];
  for (let i = 0; i < data.length; i++) {
    if (
      groupedData.findIndex((el) => el.origin.name === data[i].origin.name) ===
      -1
    ) {
      groupedData.push({
        origin: data[i].origin,
        amount: data[i].amount,
      });
    } else {
      const index = groupedData.findIndex(
        (el) => el.origin.name === data[i].origin.name
      );

      groupedData[index].amount += data[i].amount;
    }
  }

  return groupedData;
};
