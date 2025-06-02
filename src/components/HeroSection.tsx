import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Globe } from "./magicui/globe";
import { AuroraText } from "./magicui/aurora-text";

const HeroSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 py-8 ">
      <div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Expand your knowledge with <AuroraText>our courses</AuroraText>{" "}
        </h1>
        <p className="mt-4 text-muted-foreground">
          Discover a world of learning with our expertly crafted. Learn form
          industry professionals and take your skills to the next level.
        </p>
        <Button
          className="mt-6 flex items-center justify-center"
          variant={"outline"}
        >
          Explore Courses
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="relative w-full h-[400px] overflow-hidden">
        <Globe className="max-w-[400px]" />
        <div className="absolute bg-white top-[20%] left-[15%] p-2 rounded shadow-lg animate-float-1">
          Clean Code
        </div>
        <div className="absolute bg-white bottom-[25%] left-[20%] p-2 rounded shadow-lg animate-float-2">
          Mobile First
        </div>
        <div className="absolute bg-white top-[15%] right-[15%] p-2 rounded shadow-lg animate-float-4">
          Cloud Ready
        </div>
        <div className="absolute bg-white bottom-[20%] right-[20%] p-2 rounded shadow-lg animate-float-3">
          UX Design
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
