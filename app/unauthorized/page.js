export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          403 - Unauthorized
        </h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        <a href="/" className="text-blue-600 hover:text-blue-800">
          Return to Home
        </a>
      </div>
    </div>
  );
}
