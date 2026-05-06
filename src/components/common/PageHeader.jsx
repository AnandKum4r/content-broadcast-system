// src/components/common/PageHeader.jsx
const PageHeader = ({ title, description }) => {
  return (
    <div className="relative mb-8 pb-2">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-lg text-slate-500 max-w-2xl">{description}</p>
      )}
      <div className="absolute bottom-0 left-0 h-1 w-20 bg-indigo-600 rounded-full" />
    </div>
  );
};

export default PageHeader;
