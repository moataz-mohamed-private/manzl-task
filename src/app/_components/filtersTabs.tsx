"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { ReactNode } from "react";

function Filters({ children }: { children: ReactNode }) {
  return (
    <Card className="bg-dark w-full border-0">
      <CardHeader>
        <CardTitle>WHAT ARE YOU INTO</CardTitle>
        <CardDescription>specify your prefrances</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default Filters;
