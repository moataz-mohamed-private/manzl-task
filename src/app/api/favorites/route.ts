import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { favorites } from "~/server/db/schema";
import { AddOrRetrieveContent } from "~/services/content";

export async function POST(request: NextRequest, res: NextResponse) {
  const body = await request.json();

  const { tmdbId, type } = body;

  try {
    const contentId = await AddOrRetrieveContent(tmdbId, type);
    await db.insert(favorites).values({ contentId: contentId });
    return NextResponse.json(
      { message: `Favorited ${contentId}` },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: `Something went wrong` },
      { status: 500 },
    );
  }
}