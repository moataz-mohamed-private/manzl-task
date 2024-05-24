import axios from 'axios';

export const getMoviesLocalService = async () =>{

    return axios.get(process.env.NEXTAUTH_URL+'/api/movies?page=1')
}

export const addToFav = async (res:any) =>{
 
    return axios.post('/api/favorites',res)
}