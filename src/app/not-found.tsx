import Link from "next/link";
import { HelpCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-16 text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
        <HelpCircle className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">Record or Page Not Found</h2>
      <p className="text-sm text-slate-600">
        The requested GCC profile, location indicator, or route could not be found in the current dataset.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
