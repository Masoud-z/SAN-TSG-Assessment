import SpinningCircularLoader from "../SpinningCircularLoader/SpinningCircularLoader";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-10 backdrop-blur-md z-50">
      <SpinningCircularLoader className="w-20 h-20" />
    </div>
  );
};

export default LoadingPage;
