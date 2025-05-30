import CourseCard from "@/components/CourseCard";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="container relative">
      <HeroSection />
      <section className="mt-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Khóa học nổi bật</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <CourseCard />
          </div>
        </div>
      </section>
    </div>
  );
}
