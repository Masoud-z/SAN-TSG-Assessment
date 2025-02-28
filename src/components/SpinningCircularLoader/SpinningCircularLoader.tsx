interface SpinningCircularLoaderProps {
  className?: string;
}

const SpinningCircularLoader = ({ className }: SpinningCircularLoaderProps) => {
  return (
    <div
      className={`border-4 border-gray-600 dark:border-white  border-solid !border-t-transparent rounded-full animate-spin ${className}`}
    />
  );
};

export default SpinningCircularLoader;
