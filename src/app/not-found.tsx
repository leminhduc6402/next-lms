import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <AlertTriangleIcon className="mx-auto h-12 w-12 text-red-500 mb-4" />
      <p className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-6">
        Not Found
      </p>
      <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved. Please
        check the URL or return to the homepage.
      </p>
      <Link prefetch={true} href="/" passHref>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
