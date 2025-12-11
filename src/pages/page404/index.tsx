import { Link } from "react-router-dom";
// import { Home, AlertCircle } from "lucide-react";
import { useTitle } from "../../hooks/useTitle";

const NotFound = () => {
  useTitle("404 Not Found | Renimail");

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
            {/* <AlertCircle className="w-12 h-12 text-red-600" /> */}
          </div>
          <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Oops! The page you're looking for seems to have wandered off into
            the digital wilderness. It might have been moved, deleted, or
            perhaps never existed in the first place.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
            <div className="flex">
              <div className="shrink-0">
                {/* <AlertCircle className="h-5 w-5 text-yellow-400" /> */}
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Tip:</strong> Check the URL for typos, or use the
                  navigation menu to find your way back.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {/* <Home className="w-5 h-5 mr-2" /> */}
            Back to Dashboard
          </Link>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Need help?{" "}
              <Link
                to="/dashboard"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
