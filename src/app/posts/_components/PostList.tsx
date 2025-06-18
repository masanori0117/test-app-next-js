'use client';
import PostCard from "./PostCard";
import { Post } from "../../types/post";

interface PostListProps {
  posts: Post[];
  loading?: boolean;
}

export default function PostList({ posts, loading = false }: PostListProps): JSX.Element {
  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!posts || !posts.length) {
    return <div className="p-4 text-gray-600">記事が見つかりませんでした</div>;
  }

  return (
    <div className="grid gap-4 p-4">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}