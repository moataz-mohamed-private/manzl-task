import axios from 'axios';
import { PaginatedResponse } from '~/types/common.types';
import { Movie } from '~/types/localApi.types';

export const getMoviesLocalService = async (page:number) : Promise<PaginatedResponse<Movie>> =>{

    return axios.get(`${process.env.NEXTAUTH_URL}+api/movies?page=${page}`)
}

export const addToFav = async (res:any) =>{
 
    return axios.post('/api/favorites',res)
}