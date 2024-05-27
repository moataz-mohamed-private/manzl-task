import { Genre } from "~/types/tmdbApi";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { filterOption } from "~/types/common";

export function changeUrlParams<T>(
  filterParam: T,
  selected: filterOption<string | number>[],
  router: AppRouterInstance,
) {
  const existingParamsString = window.location.search;
  const params = new URLSearchParams(existingParamsString);

  if (selected.length === 0) {
    params.delete(filterParam as string);
  } else {
    params.set(
      filterParam as string,
      selected.map((option) => option.value).join(","),
    );
  }
  router.push("?" + params.toString());
}

export const getTmdbImg = (imgId: string): string => {
  return process.env.TMBD_IMGS_API_URL + imgId;
};

export const parseGenreToFilterOptions = ({ genres }: { genres: Genre[] }) => {
  return genres?.map((genre: Genre) => ({
    label: genre.name,
    value: genre.id,
  }));
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
