export const getTmdbImg = (imgId: string): string => {
  return process.env.TMBD_IMGS_API_URL + imgId;
};

export const getFormatedDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    date.getDay() + "," + months[date.getMonth()] + " " + date.getFullYear()
  );
};
