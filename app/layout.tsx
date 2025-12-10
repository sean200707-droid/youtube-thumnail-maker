import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // 기본 메타데이터
  title: "유튜브 썸네일 메이커 - 무료 썸네일 만들기",
  description: "제목만 입력하면 클릭을 부르는 썸네일이 자동으로 만들어집니다. 유튜버를 위한 무료 썸네일 제작 도구입니다. 로그인 없이 바로 사용하세요.",
  keywords: ["유튜브 썸네일", "썸네일 만들기", "썸네일 제작", "유튜브 썸네일 메이커", "무료 썸네일", "썸네일 생성기", "유튜버 도구"],
  authors: [{ name: "유튜브 썸네일 메이커" }],
  creator: "유튜브 썸네일 메이커",
  publisher: "유튜브 썸네일 메이커",

  // 로봇 설정
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (페이스북, 카카오톡, 네이버 블로그 등)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://youtube-thumnail-maker.vercel.app",
    siteName: "유튜브 썸네일 메이커",
    title: "유튜브 썸네일 메이커 - 무료 썸네일 만들기",
    description: "제목만 입력하면 클릭을 부르는 썸네일이 자동으로 만들어집니다. 유튜버를 위한 무료 썸네일 제작 도구입니다.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "유튜브 썸네일 메이커 - 제목만 쓰면 썸네일 완성",
      },
    ],
  },

  // 트위터 카드
  twitter: {
    card: "summary_large_image",
    title: "유튜브 썸네일 메이커 - 무료 썸네일 만들기",
    description: "제목만 입력하면 클릭을 부르는 썸네일이 자동으로 만들어집니다.",
    images: ["/og-image.png"],
  },

  // 파비콘 및 아이콘
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // 기타 메타데이터
  alternates: {
    canonical: "https://youtube-thumnail-maker.vercel.app",
  },

  // 네이버 웹마스터 도구용 (필요시 추가)
  verification: {
    // google: "구글 사이트 인증 코드",
    // other: { "naver-site-verification": "네이버 인증 코드" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 프리텐다드 폰트 - 깔끔한 한글 폰트 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        {/* Gmarket Sans - 굵은 제목용 폰트 */}
        <style>{`
          @font-face {
            font-family: 'Gmarket Sans';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
        {/* 추가 SEO 메타 태그 */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#0F0F0F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen bg-[#0F0F0F] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
