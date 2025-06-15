import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Test-App-NextJs",
  description: "Test-App-NextJs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${inter.className} min-h-screen bg-white text-black`}>
        <Header />
        <main className="container max-w-[800px] mx-auto px-4 py-8 pt-40">
          {children}
        </main>
      </body>
    </html>
  );
}
