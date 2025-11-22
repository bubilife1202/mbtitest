'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MBTIType } from '@/types';
import { MBTIButton, Button, AnimatedTitle, CriticalWarning } from '@/components/ui';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

export default function DatePage() {
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);

  const mbtiTypes: MBTIType[] = [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
    'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP',
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
  ];

  const worstDates = [
    '🚫 시끄럽고 사람 많은 클럽/페스티벌',
    '💔 계획 없이 그냥 돌아다니기',
    '😰 너무 비싸서 부담되는 고급 레스토랑'
  ];

  const bestDates: Record<MBTIType, { dates: string[]; tags: string[] }> = {
    'ISTJ': { dates: ['미술관/박물관', '조용한 카페', '계획된 드라이브'], tags: ['#계획적', '#조용한', '#안정적'] },
    'ISFJ': { dates: ['홈파티', '동물카페', '추억의 장소'], tags: ['#편안한', '#따뜻한', '#추억'] },
    'INFJ': { dates: ['북카페', '조용한 산책로', '의미있는 전시회'], tags: ['#깊이있는', '#조용한', '#사색적'] },
    'INTJ': { dates: ['과학관', '조용한 레스토랑', '영화관'], tags: ['#지적', '#효율적', '#조용한'] },
    'ISTP': { dates: ['클라이밍', '카트', '공방 체험'], tags: ['#활동적', '#실용적', '#체험'] },
    'ISFP': { dates: ['전시회', '플리마켓', '감성 카페'], tags: ['#예술적', '#감성', '#자유로움'] },
    'INFP': { dates: ['서점 데이트', '조용한 공원', '별 보기'], tags: ['#감성', '#낭만적', '#조용한'] },
    'INTP': { dates: ['보드게임 카페', '과학관', '독특한 체험'], tags: ['#지적', '#독특한', '#논리적'] },
    'ESTP': { dates: ['놀이공원', '스포츠 경기', '액티비티'], tags: ['#활동적', '#짜릿한', '#모험'] },
    'ESFP': { dates: ['핫플 맛집 투어', '공연/페스티벌', '포토부스'], tags: ['#트렌디', '#사교적', '#즐거움'] },
    'ENFP': { dates: ['색다른 체험', '테마파크', '즉흥 여행'], tags: ['#자유로움', '#창의적', '#즐거움'] },
    'ENTP': { dates: ['방탈출 카페', '토론 바', '독특한 체험'], tags: ['#도전적', '#지적', '#독특한'] },
    'ESTJ': { dates: ['계획된 일정 투어', '고급 레스토랑', '골프'], tags: ['#체계적', '#고급스러운', '#실용적'] },
    'ESFJ': { dates: ['맛집 투어', '쇼핑', '인기 카페'], tags: ['#사교적', '#트렌디', '#즐거움'] },
    'ENFJ': { dates: ['함께 하는 활동', '봉사 활동', '의미있는 경험'], tags: ['#공감', '#함께', '#의미있는'] },
    'ENTJ': { dates: ['효율적인 일정', '고급 문화생활', '목표가 있는 활동'], tags: ['#효율적', '#고급스러운', '#목표지향'] },
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
          💑 MBTI별 데이트 코스
        </AnimatedTitle>

        <motion.p
          className="text-center text-xl text-white/80 mb-8 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          100% 성공 데이트 플랜! 💯
        </motion.p>

        {!selectedMBTI ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-black text-center mb-8 text-white">
                데이트 상대의 MBTI는?
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
              title="💀 가면 싸우는 데이트 코스 WORST 3"
              warnings={worstDates}
            />

            {/* BEST 데이트 */}
            <div className="bg-pink-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-pink-500/50">
              <h3 className="text-2xl font-black mb-4 text-white">
                ✅ {selectedMBTI}와 가면 좋은 곳!
              </h3>
              <div className="space-y-4">
                {bestDates[selectedMBTI].dates.map((date, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-black/30 rounded-xl p-4 text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="text-xl">💕 {date}</span>
                  </motion.div>
                ))}
              </div>

              {/* 태그 */}
              <div className="flex flex-wrap gap-2 mt-6">
                {bestDates[selectedMBTI].tags.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    className="px-4 py-2 bg-pink-600 rounded-full text-white font-bold text-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* 꿀팁 */}
            <div className="bg-yellow-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-yellow-500/50">
              <h3 className="text-2xl font-black mb-3 text-white">
                💡 데이트 꿀팁
              </h3>
              <p className="text-white leading-relaxed">
                {selectedMBTI[0] === 'E' ? '활기찬 분위기를 좋아해요!' : '조용하고 편안한 곳을 선호해요!'}
                {' '}
                {selectedMBTI[3] === 'J' ? '계획을 세우고 가면 더 좋아해요!' : '즉흥적으로 즐기는 걸 좋아해요!'}
              </p>
            </div>

            {/* 광고 */}
            <AdBanner />

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

        <Footer />
      </div>
    </div>
  );
}
