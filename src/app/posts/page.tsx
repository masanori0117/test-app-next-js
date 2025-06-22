import PostList from './_components/PostList';
import { Post } from '../types/post';

export default async function HomePage(): Promise<JSX.Element> {
  try {
    const response = await fetch('https://sampleeeeeee.microcms.io/api/v1/posts', {
      headers: {
        'X-MICROCMS-API-KEY': process.env
          .NEXT_PUBLIC_MICROCMS_API_KEY as string,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
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
    );
  }
}