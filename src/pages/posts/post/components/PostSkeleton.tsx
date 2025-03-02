const PostSkeleton = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3.5">
      <div className="bg-gray-300 rounded animate-pulse w-5/6 h-9"></div>
      <div className="bg-gray-300 rounded animate-pulse w-3/5 h-6"></div>
    </div>
  );
};

export default PostSkeleton;
