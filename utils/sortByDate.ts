export default (a, b) => {
  if (new Date(a.date) > new Date(b.date)) {
    return -1;
  }

  if (new Date(a.date) < new Date(b.date)) {
    return 1;
  }

  return 0;
};
