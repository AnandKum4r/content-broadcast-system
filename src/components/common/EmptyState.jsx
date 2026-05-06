// src/components/common/EmptyState.jsx
const EmptyState = ({ title = "No data found" }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-16 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 text-gray-500">There is nothing to display.</p>
    </div>
  );
};

export default EmptyState;