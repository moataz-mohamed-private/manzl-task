import { NextResponse } from "next/server";
import { getMovies } from "~/services/tmdb";

// To handle a GET request to /api
export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  let page = searchParams.get("page");

  page = !!page ? page : "1";

  const movies = await getMovies({ page: page });
  return NextResponse.json(movies.data, { status: 200 });
}