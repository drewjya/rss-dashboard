export const stringToDate = (params: string): string => {
  const date = new Date(`${params}`.replaceAll("Z", ""));
  date.setUTCHours(date.getUTCHours() + 7);
  let dateTime = useDateFormat(date, "DD/MM/YYYY");
  return dateTime.value;
};
