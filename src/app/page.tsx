
import { getMoviesLocalService } from "~/services/local";

export default async function HomePage() {

  const movies = await getMoviesLocalService();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div>manzl pro</div>
        {
          movies.data.results.map((res:any) => 
          <div>
            {res.original_title}
          <button style={{backgroundColor:"white",color:'black'}} >add to fav</button>
          </div>)
        }
    </main>
  );
}
