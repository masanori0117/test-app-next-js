'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-[#333] text-white px-6 py-6 flex justify-between items-center fixed top-0 left-0 z-10">
      <Link href="/" className="text-white font-extrabold">Blog</Link>
      <Link href="/inquiry" className="text-white font-extrabold">お問い合わせ</Link>
    </header>
  );
} 