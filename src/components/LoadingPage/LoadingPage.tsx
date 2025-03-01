import SpinningCircularLoader from "../SpinningCircularLoader/SpinningCircularLoader";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50">
      <SpinningCircularLoader className="w-20 h-20" />
    </div>
  );
};

export default LoadingPage;
