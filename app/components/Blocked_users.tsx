export default function Blocked_users() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-red-600">
          Access Restricted
        </h1>

        <p className="mt-4 text-gray-600">
          Your account has been restricted from accessing this application.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          If you believe this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
}
