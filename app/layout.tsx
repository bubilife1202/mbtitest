import { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'MBTI 관계 도우미 - 상대방의 말, 진짜 의미는?',
  description: 'MBTI별 속마음 해석, 선물 추천, 데이트 코스, 궁합 테스트 등 완벽한 관계 가이드',
  keywords: 'MBTI, 관계, 연애, 속마음, 번역, 궁합, 선물추천, 데이트',
  openGraph: {
    title: '🚨 여자친구가 괜찮아 할 때 진짜 의미는?',
    description: 'ISTJ: 정말 괜찮음 ✅ vs INFP: 엄청 화남 💥 | MBTI별 진짜 속마음 256가지',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* Google AdSense Auto Ads */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8245797797545485"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <div className="min-h-screen py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
          {/* Version */}
          <div className="text-center mt-8 opacity-60">
            <small className="text-white">v2.0.0</small>
          </div>
        </div>
      </body>
    </html>
  );
}
