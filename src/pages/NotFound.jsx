import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-indigo-600 text-white text-lg rounded-md hover:bg-indigo-500 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
