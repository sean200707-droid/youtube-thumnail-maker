import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "유튜브 썸네일 메이커 | AI Thumbnail Generator",
  description: "제목만 쓰면 AI가 썸네일을 만들어드립니다. 유튜브 크리에이터를 위한 무료 썸네일 생성기.",
  keywords: ["유튜브", "썸네일", "AI", "생성기", "크리에이터", "YouTube", "thumbnail"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Gmarket Sans - Bold Korean heading font */}
        <link
          href="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff"
          rel="preload"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        {/* Pretendard - Modern Korean body font */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        {/* Custom font-face for Gmarket Sans */}
        <style>{`
          @font-face {
            font-family: 'Gmarket Sans';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </head>
      <body className="min-h-screen bg-[#0F0F0F] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
