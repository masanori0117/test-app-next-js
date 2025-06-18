import { Post } from './types/post';
import PostList from './posts/_components/PostList';

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
    return (
      <div className="min-h-screen">
        <PostList posts={posts}/>
      </div>
    );
  } catch (error) {
    console.error('データ取得失敗:', error);
    return (
      <div className="min-h-screen p-4">
        <p className="text-red-600">投稿の取得に失敗しました。</p>
      </div>
    )
  }
}
