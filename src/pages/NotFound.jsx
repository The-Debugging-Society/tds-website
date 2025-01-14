import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-9xl font-extrabold text-red-500 tracking-wider">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-lg mt-2 text-gray-400 text-center max-w-md">
        It seems the page you're looking for doesn't exist. It might have been moved, deleted, or the URL could be incorrect.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="Lost in 404"
        className="mt-10 max-w-full w-96"
      />
    </div>
  );
};

export default NotFound;

