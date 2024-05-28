"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import useDebounceEffect from "~/customeHooks/useDebounceEffect";
import { filterOption } from "~/types/common";
import { ETMDBMoviesFilterParams } from "~/types/tmdbApi";
import {
  changeUrlParams,
  parseSelectedFiltersToFilterOptions,
} from "~/utils/helpers";

export function DropdownSelection({
  filterParam,
  filterOptions,
  selectionPlaceHolder,
  selectedFilters,
}: {
  filterParam: ETMDBMoviesFilterParams;
  filterOptions: filterOption<string>[];
  selectionPlaceHolder: string;
  selectedFilters: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<filterOption<string>[]>([]);

  useEffect(() => {
    if (selectedFilters)
      setSelected(
        parseSelectedFiltersToFilterOptions(selectedFilters, filterOptions),
      );
  }, []);

  useDebounceEffect(() => {
    changeUrlParams(filterParam, selected, router);
  }, [selected]);

  return (
    <div className="text-md p-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {" "}
            {selected[0]?.label || selectionPlaceHolder}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Available Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {filterOptions.map((option) => (
              <DropdownMenuItem
                onSelect={() => setSelected([option])}
                key={option.value}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
