import PostList from './_components/PostList';
import { Post } from '../types/post';

export default async function HomePage(): Promise<JSX.Element> {
  try {
    const response = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts', {
      cache : 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HRRP error: ${response.status}`);
    }

    const data: { posts: Post[] } = await response.json();
    const posts: Post[] = Array.isArray(data.posts) ? data.posts : [];
    return <PostList posts={posts}/>;
  } catch (error) {
    console.error('データ取得失敗', error);
    return (
      <div className="p-4 text-red-600">
        投稿の取得に失敗しました
      </div>
    )
  }
}