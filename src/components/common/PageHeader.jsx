// src/components/common/PageHeader.jsx

const PageHeader = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      {description && <p className="mt-1 text-gray-500">{description}</p>}
    </div>
  );
};

export default PageHeader;