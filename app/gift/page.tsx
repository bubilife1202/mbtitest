'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MBTIType } from '@/types';
import { MBTIButton, Button, AnimatedTitle, CriticalWarning } from '@/components/ui';

export default function GiftPage() {
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);

  const mbtiTypes: MBTIType[] = [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
    'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP',
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
  ];

  const worstGifts = [
    '💸 너무 비싸거나 너무 싼 선물',
    '🎁 의미 없는 실용성 제로 선물',
    '🙅 본인이 좋아하는 걸 강요하는 선물'
  ];

  const bestGifts: Record<MBTIType, { gifts: string[]; tags: string[] }> = {
    'ISTJ': { gifts: ['실용적인 사무용품', '품질 좋은 가죽 지갑', '계획 다이어리'], tags: ['#실용성', '#품질중시', '#계획적'] },
    'ISFJ': { gifts: ['손편지', '손뜨개 선물', '추억의 앨범'], tags: ['#감성', '#배려', '#추억'] },
    'INFJ': { gifts: ['의미 있는 책', '명상 관련 용품', '조용한 카페 쿠폰'], tags: ['#깊이있는', '#사색적', '#의미중시'] },
    'INTJ': { gifts: ['전문 서적', '효율적인 가전', '온라인 강의 쿠폰'], tags: ['#지적', '#효율성', '#전문성'] },
    'ISTP': { gifts: ['DIY 키트', '멀티툴', '스포츠 용품'], tags: ['#실용성', '#손재주', '#활동적'] },
    'ISFP': { gifts: ['예술 용품', '감성 소품', '향수/캔들'], tags: ['#감성', '#예술', '#자유로움'] },
    'INFP': { gifts: ['감성 소설', '다이어리', '무드등'], tags: ['#감성', '#창의적', '#이상주의'] },
    'INTP': { gifts: ['퍼즐/보드게임', '과학 잡지', '독특한 가젯'], tags: ['#논리적', '#호기심', '#독창적'] },
    'ESTP': { gifts: ['스포츠 티켓', '액티비티 쿠폰', '최신 가젯'], tags: ['#활동적', '#모험', '#현실적'] },
    'ESFP': { gifts: ['파티용품', '트렌디한 아이템', '공연 티켓'], tags: ['#사교적', '#트렌디', '#즐거움'] },
    'ENFP': { gifts: ['여행 상품권', '독특한 경험', '감성 아이템'], tags: ['#자유로움', '#창의적', '#열정'] },
    'ENTP': { gifts: ['논리 게임', '독특한 가젯', '재치있는 선물'], tags: ['#독창적', '#논리적', '#재치'] },
    'ESTJ': { gifts: ['명품 시계', '고급 펜', '효율적인 도구'], tags: ['#실용성', '#고품질', '#체계적'] },
    'ESFJ': { gifts: ['예쁜 소품', '브랜드 화장품', '맛집 쿠폰'], tags: ['#사교적', '#트렌디', '#배려'] },
    'ENFJ': { gifts: ['의미있는 경험', '봉사 기부 선물', '함께하는 시간'], tags: ['#공감', '#리더십', '#관계중시'] },
    'ENTJ': { gifts: ['자기계발서', '고급 비즈니스 용품', '효율적인 가전'], tags: ['#목표지향', '#효율성', '#리더십'] },
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <motion.div
            className="inline-flex items-center gap-2 mb-8 text-white/80 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
          >
            <span className="text-2xl">←</span>
            <span className="font-bold">홈으로</span>
          </motion.div>
        </Link>

        <AnimatedTitle className="mb-2">
          💝 MBTI별 선물 추천
        </AnimatedTitle>

        <motion.p
          className="text-center text-xl text-white/80 mb-8 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          칼 같은 추천! 🎁
        </motion.p>

        {!selectedMBTI ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-black text-center mb-8 text-white">
                선물 받을 사람의 MBTI는?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mbtiTypes.map((mbti) => (
                  <MBTIButton
                    key={mbti}
                    mbti={mbti}
                    onClick={() => setSelectedMBTI(mbti)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* WORST 3 */}
            <CriticalWarning
              title="💀 절대 사주면 안 되는 선물 WORST 3"
              warnings={worstGifts}
            />

            {/* BEST 선물 */}
            <div className="bg-green-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-green-500/50">
              <h3 className="text-2xl font-black mb-4 text-white">
                ✅ {selectedMBTI}에게 딱인 선물!
              </h3>
              <div className="space-y-4">
                {bestGifts[selectedMBTI].gifts.map((gift, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-black/30 rounded-xl p-4 text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="text-xl">🎁 {gift}</span>
                  </motion.div>
                ))}
              </div>

              {/* 태그 */}
              <div className="flex flex-wrap gap-2 mt-6">
                {bestGifts[selectedMBTI].tags.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    className="px-4 py-2 bg-green-600 rounded-full text-white font-bold text-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setSelectedMBTI(null)} variant="neon" className="flex-1">
                🔄 다시 선택
              </Button>
              <Link href="/" className="flex-1">
                <Button variant="secondary" className="w-full">
                  🏠 홈으로
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
