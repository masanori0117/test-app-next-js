import PostDetail from '../_components/PostDetail';
import { Post } from '../../types/post';
import { notFound } from 'next/navigation';

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps): Promise<JSX.Element> {
  const postId = Number(params.id);

  try {
    const response = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${postId}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: {post: Post } = await response.json();
    const post = data.post

    if (!post) {
      notFound();
    }

    return (
      <div className="p-4 mb-6 flex flex-col">
        <PostDetail post={post} />
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