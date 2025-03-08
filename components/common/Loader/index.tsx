const Loader = () => {
  return (
    <div className="flex h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-[9999] items-center justify-center bg-primary bg-opacity-25 ">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
