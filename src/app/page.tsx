import { Post } from './types/post';
import PostList from './posts/_components/PostList';

export default async function HomePage(): Promise<JSX.Element> {

  try {
    const response = await fetch('https://sampleeeeeee.microcms.io/api/v1/posts', {
      headers: {
        'X-MICROCMS-API-KEY': process.env
          .NEXT_PUBLIC_MICROCMS_API_KEY as string,
      },
    });

    if (!response.ok) {
      throw new Error(`HRRP error: ${response.status}`);
    }

    const data: { contents: Post[] } = await response.json();
    const posts: Post[] = Array.isArray(data.contents) ? data.contents : [];
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
    );
  }
}
