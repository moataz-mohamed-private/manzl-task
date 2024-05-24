
import { getMoviesLocalService , addToFav} from "~/services/local";
import Button from "./_components/button";

export default async function HomePage() {

  const movies = await getMoviesLocalService();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div>manzl pro</div>
        {
          movies.data.results.map((res:any) => 
          <div>
            {res.original_title}
           <div style={{backgroundColor:'white'}}>
            <Button fun={res}></Button>
           </div>
          </div>)
        }
    </main>
  );
}
