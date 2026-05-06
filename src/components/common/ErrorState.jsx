// src/components/common/ErrorState.jsx

const ErrorState = ({
  title = "Something went wrong",
  message = "Please try again later",
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 py-16 text-center">
      <h2 className="text-2xl font-bold text-red-700">{title}</h2>

      <p className="mt-2 text-red-500">{message}</p>
    </div>
  );
};

export default ErrorState;