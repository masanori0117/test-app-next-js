import PostDetail from '../_components/PostDetail';
import { Post } from '../../types/post';
import { notFound } from 'next/navigation';

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const postId = params.id;

  try {
    const response = await fetch(`https://sampleeeeeee.microcms.io/api/v1/posts/${postId}`, {
      headers: {
        'X-MICROCMS-API-KEY': process.env
          .NEXT_PUBLIC_MICROCMS_API_KEY as string,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`HTTP error: ${response.status}`);
    }

    const post: Post = await response.json();

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