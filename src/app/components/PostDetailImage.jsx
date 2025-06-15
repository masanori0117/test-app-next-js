import Image from 'next/image';

export default function PostDetailImage({ imageUrl, alt="投稿画像" }) {
  if (!imageUrl) return null;
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={800}
      height={400}
      className="w-full h-auto mb-4"
    />
  );
}

