import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getFormatedDate } from "~/utils/helpers";
import  addIcon  from '~/assets/icons/ribbon-svgrepo-com.svg'

interface ContentCard {
  src: string;
  title: string;
  description?: string;
  date: string;
}
const ContentCard = ({ src, title, description, date }: ContentCard) => {

    
  return (
    <div className="h-96 relative rounded-xl overflow-hidden">
        <div className="absolute left-1 top-1  z-10">
        <img src={addIcon.src} width={60} style={{color:'white'}}/>
        </div>
       
      <div className="h-5/6 w-full relative">
        <Image src={src} layout="fill" objectFit="fill" alt="content" style={{aspectRatio:"13/24"}}/>
      </div>
      <div className="h-1/6 w-full bg-card text-white p-1">
        <div>{title}</div>
        <div>{getFormatedDate(date)}</div>
      </div>     
    </div>
  );
};
export default ContentCard;
