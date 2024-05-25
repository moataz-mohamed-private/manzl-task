import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "~/components/ui/card"

interface ContentCard {
    src: string;
    title:string;
    description?:string;
    date:string  
}
const ContentCard = ({src, title , description , date}: ContentCard)=>{
    return(
        <Card>
            <Image src={src} height={400} width={400} alt="content"/>
            <CardFooter>
               <div>
                {title}
               </div>
               <div>
                {
                    date
                }
               </div>
            </CardFooter>
        </Card>
    )
}
export default ContentCard