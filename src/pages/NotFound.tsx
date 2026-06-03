import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#1B0F0A] min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="font-serif text-8xl text-[#C9A46B]/20 mb-4">404</h1>
        <p className="font-serif text-3xl text-[#F4EBE1] mb-4">Page Not Found</p>
        <p className="text-base text-[#F4EBE1]/50 mb-8 font-light">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A46B] text-[#1B0F0A] text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#F4EBE1] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
