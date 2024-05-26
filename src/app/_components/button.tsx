"use client";

import { useRouter } from "next/navigation";

export const DropDown = () => {
  const router = useRouter();
  return (
    <select
      className="bg-white"
      onChange={(e) => {
        router.push(`/?page=${e.target.value}`);
      }}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  );
};