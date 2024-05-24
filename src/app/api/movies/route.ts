import { NextResponse } from "next/server";
import { getMovies } from "~/services/tmbd";
import { createAuthRequest } from "~/utils/apiUtils/authRequest";

// To handle a GET request to /api
export async function GET(request:any) {
  const {searchParams} = new URL(request.url);
    const page = searchParams.get("page");
  // Do whatever you want
  
  const movies = await getMovies(page)
  return NextResponse.json(movies.data, { status: 200 });

}

// To handle a POST request to /api
export async function POST(request:any) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}