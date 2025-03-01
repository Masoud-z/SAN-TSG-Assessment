import Card from "../Card/Card";

interface RecentSkeletonProps {
  count: number;
  title: string;
}

const RecentSkeleton = ({ count, title }: RecentSkeletonProps) => {
  return (
    <Card className="w-96 flex flex-col justify-baseline items-baseline gap-4 py-4 px-3">
      <h3>{title}</h3>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 rounded animate-pulse w-2xs h-6"
        ></div>
      ))}
    </Card>
  );
};

export default RecentSkeleton;
