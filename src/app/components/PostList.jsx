// import { posts } from '../data/posts';
import PostCard from './PostCard';
import { useState, useEffect } from 'react';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchPost = async() => {
        try {
          const response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
          const data = await response.json();
          const postArray = Array.isArray(data.posts) ? data.posts : [];
          setPosts(postArray);
        } catch(error) {
          setError('記事の取得に失敗しました');
          console.error("データ取得失敗:", error);
        } finally {
            setLoading(false);
        }
      }
      fetchPost();
    }, []);

  if (loading) {
    return <div className="p-4">読み込み中...</div>;
  }

  return (
    <>
      {error && <div className="text-red-600 p-4">{error}</div>}
      {!error && posts.length === 0 && (
        <div className="p-4 text-gray-600">記事が見つかりませんでした。</div>
      )}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}