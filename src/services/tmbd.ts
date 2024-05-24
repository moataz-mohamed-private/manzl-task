import { createAuthRequest } from "~/utils/apiUtils/authRequest"


export const getMovies =async (page:string | null) =>{
    return createAuthRequest(process.env.TMBD_API_BASE_URL as string,process.env.TMBD_API_TOKEN).get(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`)
}

// export const getContent = async()