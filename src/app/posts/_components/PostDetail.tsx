'use client';
import PostDetailImage from './PostDetailImage';
import { Post } from '../../types/post';

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps): JSX.Element {
  return (
    <div className="p-4 mb-6 flex flex-col">
      <PostDetailImage imageUrl={post.thumbnail.url} />
      <div className="flex justify-between">
        <p className="text-sm text-gray-500 mb-2">
          {new Date(post.createdAt).toLocaleDateString("ja-JP")}
        </p>
        <div className="flex gap-2">
          {post.categories.map((category) => (
            <span
              key={category.id}
              className="text-blue-700 border border-blue-700 text-xs px-2 py-1 rounded font-medium"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
      <h1 className="text-2xl mb-4 mt-2 font-semibold text-left">{post.title}</h1>
      <div
        className="text-left mb-3 font-medium"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}