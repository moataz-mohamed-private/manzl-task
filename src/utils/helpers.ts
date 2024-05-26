import { Genre } from "~/types/tmdbApi";

export const getTmdbImg = (imgId: string): string => {
  return process.env.TMBD_IMGS_API_URL + imgId;
};

export const parseGenreToFilterOptions = ({genres}:{genres:Genre[]}) =>{
  return genres?.map((genre:Genre) => ({
    label: genre.name,
    value: genre.id.toString(),
  }))
}

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
