import Image from 'next/image';

interface PostDetailImageProps {
  imageUrl?: string;
  alt?: string;
}

export default function PostDetailImage({
  imageUrl,
  alt="投稿画像",
 }: PostDetailImageProps): JSX.Element | null {
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

