import { Genre } from "~/types/tmdbApi";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { filterOption } from "~/types/common";

export async function dynamicBlurDataUrl(url: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : process.env.NEXT_PUBLIC_VERCEL_URL;

  const base64str = await fetch(
    `${baseUrl}/_next/image?url=${url}&w=16&q=75`,
  ).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString("base64"),
  );

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
}

export function changeUrlParams<T>(
  filterParam: T,
  selected: filterOption<string | number>[],
  router: AppRouterInstance,
) {
  const existingParamsString = window.location.search;
  const params = new URLSearchParams(existingParamsString);

  if (selected.length === 0) {
    params.delete(filterParam as string);
  }
  if (selected.length > 0) {
    params.set(
      filterParam as string,
      selected.map((option) => option.value).join(","),
    );
  }
  router.push("?" + params.toString());
}

export const parseSelectedFiltersToFilterOptions = (
  selectedFilters: string,
  filterOptions: filterOption<string | number>[],
): filterOption<string>[] => {
  const filterOptionsObj: Record<string, string> = {};

  filterOptions.forEach((option) => {
    filterOptionsObj[option.value] = option.label;
  });

  if (selectedFilters.includes(",")) {
    return selectedFilters
      .split(",")
      .map((el) => ({ value: el, label: filterOptionsObj[el] as string }));
  } else {
    return [
      {
        value: selectedFilters,
        label: filterOptionsObj[selectedFilters] as string,
      },
    ];
  }
};

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
