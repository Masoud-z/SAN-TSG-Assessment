import { Suspense } from "react";
import RecentPosts from "../../components/RecentPosts/RecentPosts";
import RecentSkeleton from "../../components/RecentSkeleton/RecentSkeleton";
import RecentComments from "../../components/RecentComments/RecentComments";

const Home = () => {
  return (
    <div className="w-full flex justify-center items-start gap-8 p-4">
      <Suspense fallback={<RecentSkeleton count={5} title="Recent Posts:" />}>
        <RecentPosts count={5} />
      </Suspense>
      <Suspense
        fallback={<RecentSkeleton count={5} title="Recent Comments:" />}
      >
        <RecentComments count={5} />
      </Suspense>
    </div>
  );
};

export default Home;
