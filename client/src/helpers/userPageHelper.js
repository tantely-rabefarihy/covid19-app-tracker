export const daysCount = function () {
  const today = new Date();
  const start = new Date("03/01/2020");
  return Math.floor(
    (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
      Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) /
      (1000 * 60 * 60 * 24)
  );
};
// console.log(daysCount());
