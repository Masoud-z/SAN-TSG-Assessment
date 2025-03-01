interface PostsSkeltonProps {
  count: number;
}

const PostsSkelton = ({ count }: PostsSkeltonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-300  animate-pulse p-4 ring-2 ring-blue-500 w-full rounded-2xl h-16"
        ></div>
      ))}
    </>
  );
};

export default PostsSkelton;
