import PostDetailImage from '../../components/PostDetailImage';

export default async function PostDetailPage({ params }) {
  const postId = Number(params.id);

  let post = null;

  try {
    const response = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${postId}`, {
      // キャッシュを避けるオプション（オプション）
      cache: 'no-store',
    });
    const data = await response.json();
    post = data.post;
  } catch (error) {
    console.error('データ取得失敗:', error);
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
          {post.categories.map((category) => (
            <span
              key={category}
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