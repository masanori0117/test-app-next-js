// import { posts } from '../data/posts';
import { useParams } from 'react-router-dom';
import PostDetailImage from './PostDetailImage';
import { useState, useEffect } from 'react';

export default function PostDetail() {
  const { id } = useParams();
  const postId = Number(id);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async() => {
      try {
        const response = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${postId}`)
        const data = await response.json();
        setPost(data.post);
      } catch(error) {
        console.error("データ取得失敗:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postId]);

  if (loading) {
    return <div className="p-4">読み込み中...</div>;
  }

  if (!post) {
    return <div className="p-4">投稿が見つかりませんでした。</div>;
  }

  return (
    <div className="p-4 mb-6 flex flex-col">
      <PostDetailImage imageUrl={post.thumbnailUrl} />
      <div className="flex justify-between">
        <p className="text-sm text-gray-500 mb-2">
          {new Date(post.createdAt).toLocaleDateString("ja-JP")}
        </p>
        <div className="flex gap-2">
          {post.categories.map((category, index) => (
            <span
              key={index}
              className="text-blue-700 border border-blue-700 text-xs px-2 py-1 rounded font-medium"
            >
              {category}
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