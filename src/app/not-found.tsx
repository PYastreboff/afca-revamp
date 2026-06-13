import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-afca-blue mb-3">404</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-afca-navy mb-3">Page not found</h1>
      <p className="text-afca-gray mb-8 max-w-md">
        The page you&apos;re looking for may have moved or doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-afca-navy px-6 py-3 text-white font-semibold hover:bg-afca-blue transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to homepage
      </Link>
    </div>
  );
}
