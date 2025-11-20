import { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '🔥 MBTI 관계 도우미 - 100만명이 선택한 진짜 속마음',
  description: '괜찮아 = 괜찮지 않음? 1분만에 MBTI별 진짜 속마음, 궁합, 사과법까지! 지금 바로 테스트하고 친구들과 공유하세요 💘',
  keywords: 'MBTI, 관계, 연애, 속마음, 번역, 궁합, 선물추천, 데이트, mbti테스트, mbti유형, 성격유형, 바이럴',
  metadataBase: new URL('https://mbtiexplain.nomadlab.kr'),
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: '🤯 "괜찮아"의 진짜 의미는? MBTI별 충격적인 차이',
    description: 'ISTJ: 정말 괜찮음 ✅ vs INFP: 엄청 화남 💥 | 100만명이 놀란 MBTI 속마음 테스트! 지금 바로 확인하세요 🔥',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://mbtiexplain.nomadlab.kr',
    siteName: 'MBTI 관계 도우미',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'MBTI 관계 도우미 - 100만명이 선택한 진짜 속마음',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🤯 "괜찮아"의 진짜 의미는? MBTI별 충격적인 차이',
    description: 'ISTJ: 정말 괜찮음 ✅ vs INFP: 엄청 화남 💥 | 100만명이 놀란 MBTI 속마음 테스트!',
    images: ['/og-image.svg'],
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
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8245597797545485"
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
            <small className="text-white">v3.0.0 • Viral Edition 🔥</small>
          </div>
        </div>
      </body>
    </html>
  );
}
