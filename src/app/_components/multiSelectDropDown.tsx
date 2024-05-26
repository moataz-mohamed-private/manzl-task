"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import router, { useRouter } from "next/navigation";
import { ETMDBMoviesFilterParams } from "~/types/tmdbApi";
import { filterOption } from "~/types/common";

export function MultiSelect({
  filterOptions,
  filterParam,
  selectionPlaceHolder
}: {
  filterOptions: filterOption[];
  filterParam: ETMDBMoviesFilterParams;
  selectionPlaceHolder:string
}) {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<filterOption[]>([]);
  const [selectables,setSelectables] = useState<filterOption[]>([])
  const [inputValue, setInputValue] = React.useState("");

  useEffect(()=>{
    if(filterOptions?.length > 0) setSelectables(filterOptions)
  },[filterOptions])

  useEffect(() => {
    const existingParamsString = window.location.search;
    const params = new URLSearchParams(existingParamsString);

    if (selected.length === 0) {
      params.delete(filterParam);
    } else {
      params.set(
        filterParam,
        selected.map((option) => option.value).join(","),
      );
    }

    router.push("?" + params.toString());
  }, [selected]);

  const handleUnselect = React.useCallback((option: filterOption) => {
    setSelected((prev) => prev.filter((s) => s.value !== option.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [],
  );

  // const selectables = filterOptions?.filter(
  //   (option) => !selected.includes(option),
  // );

  console.log(selectables, selected, inputValue);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => {
            return (
              <Badge key={option.value} variant="secondary">
                {option.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={selectionPlaceHolder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        if(!(selected.filter(selectedOption => selectedOption.value === option.value).length > 0)) setSelected((prev) => [...prev, option]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
