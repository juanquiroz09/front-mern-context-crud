import { usePosts } from "../context/postContext";
import { PostCard } from "../components/PostCard";
import { VscEmptyWindow } from "react-icons/vsc";

export function HomePage() {
  const { posts } = usePosts();

  const renderPost = () => {
    if (!Array.isArray(posts) || posts.length === 0)
      return (
        <div className="flex flex-col justify-center items-center">
          <VscEmptyWindow className="w-48 h-48 text-white" />
          <h1 className="text-white text-2xl">There are no posts</h1>
        </div>
      );

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderPost()}
    </div>
  );
}