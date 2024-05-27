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
import { changeUrlParams } from "~/utils/helpers";

export function DropdownSelection({
  filterParam,
  filterOptions,
  selectionPlaceHolder,
}: {
  filterParam: ETMDBMoviesFilterParams;
  filterOptions: filterOption<string>[];
  selectionPlaceHolder: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<filterOption<string>[]>([]);

  useDebounceEffect(() => {
    changeUrlParams(filterParam, selected, router);
  }, [selected]);

  return (
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
            <DropdownMenuItem onSelect={() => setSelected([option])}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
