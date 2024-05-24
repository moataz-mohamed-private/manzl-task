import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { content , movies } from "~/server/db/schema";


export async function POST(request:any) {
    // Do whatever you want
    const body = await request.json()

    const dbObject =
    {
        adult: body.adult,
        backdropPath: body.backdrop_path,
        genreIds: body.genre_ids,
        originalLanguage: body.original_language,
        overview: body.overview,
        popularity:body.popularity ,
        posterPath:body.poster_path ,
        voteAverage:body.vote_average,
        voteCount:body.vote_count,
        tmdbId: body.id,
    }

    const contentId = await db.insert(content).values({...dbObject,name:'a7aa',mediaType:'movie'}).returning({contentId:content.id})
    console.log(contentId,'aaaaa')
    await db.insert(movies).values({contentId : contentId[0]?.contentId as number , video : body.video , releaseDate : new Date(body.release_date)});
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
  }