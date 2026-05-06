// src/components/common/Loader.jsx
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-slate-800 border-t-indigo-500"></div>
        <div className="absolute h-8 w-8 animate-spin-slow rounded-full border-4 border-slate-800 border-b-rose-500"></div>
      </div>
      <p className="mt-6 text-sm font-bold tracking-widest text-slate-500 uppercase animate-pulse">
        Initializing Feed
      </p>
    </div>
  );
};

export default Loader;
