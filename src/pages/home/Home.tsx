import RecentPosts from "../../components/RecentPosts/RecentPosts";
import RecentComments from "../../components/RecentComments/RecentComments";

const Home = () => {
  return (
    <div className="w-full flex justify-center items-start gap-8 p-4">
      <RecentPosts count={5} />
      <RecentComments count={5} />
    </div>
  );
};

export default Home;
