import { Clock, Users } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";

interface CourseCardProps {
  image: string;
  title: string;
  price: string;
  studentsCount: number;
  duration: string;
}

export const CourseCard = ({
  image,
  title,
  price,
  studentsCount,
  duration,
}: CourseCardProps) => {
  return (
    <Link href={"#"}>
      <Card className="border-none w-full h-full overflow-hidden gap-0 p-0 hover:shadow-lg transition-all duration-300">
        <CardHeader className="p-0">
          <Image
            src={image}
            alt={title}
            width={400}
            height={350}
            className="w-full h-full object-cover transition-transform"
          />
        </CardHeader>

        <CardContent className="flex-grow flex flex-col justify-between">
          <h3 className="text-md lg:text-lg font-semibold line-clamp-2">
            {title}
          </h3>
          <p className="text-primary font-bold text-xl mt-2 line-clamp-2">
            {price}
          </p>
        </CardContent>

        <CardFooter className="flex justify-between text-sm text-muted-foreground pb-3 mt-2">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{studentsCount} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
