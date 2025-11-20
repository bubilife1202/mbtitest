'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ===== 1. FeatureCard: 게임 로비 스타일 카드 =====
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  gradient?: string;
  delay?: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  href,
  gradient = 'from-purple-500 via-pink-500 to-red-500',
  delay = 0
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        bounce: 0.4
      }}
      whileHover={{
        scale: 1.05,
        rotate: [-1, 1, -1, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={href}>
        <div className={`
          relative overflow-hidden
          bg-gradient-to-br ${gradient}
          rounded-3xl p-1
          cursor-pointer
          shadow-2xl hover:shadow-neon-pink/50
          transition-all duration-300
          group
        `}>
          {/* 반짝이는 효과 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                          -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* 내부 카드 */}
          <div className="relative bg-gray-900 rounded-3xl p-6 h-full flex flex-col items-center justify-center gap-4">
            {/* 아이콘 */}
            <motion.div
              className="text-7xl filter drop-shadow-lg"
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                scale: 1.2
              }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>

            {/* 타이틀 */}
            <h3 className="text-xl font-black text-white text-center tracking-tight
                         bg-gradient-to-r from-white to-gray-300 bg-clip-text">
              {title}
            </h3>

            {/* 설명 */}
            <p className="text-sm text-gray-300 text-center font-semibold">
              {description}
            </p>

            {/* "시작하기" 버튼 */}
            <motion.div
              className="mt-2 px-6 py-2 bg-white/10 rounded-full text-white text-sm font-bold
                       border-2 border-white/20 group-hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              시작하기 →
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ===== 2. MBTIButton: 펀치감 있는 MBTI 버튼 =====
interface MBTIButtonProps {
  mbti: string;
  onClick: () => void;
  imageUrl?: string;
  selected?: boolean;
}

export function MBTIButton({ mbti, onClick, imageUrl, selected = false }: MBTIButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative overflow-hidden
        ${selected ? 'bg-gradient-to-br from-neon-pink to-neon-purple' : 'bg-white'}
        border-4 ${selected ? 'border-neon-blue' : 'border-gray-200'}
        rounded-2xl p-4
        flex flex-col items-center gap-2
        min-h-[100px] min-w-[70px]
        transition-all duration-300
        shadow-lg hover:shadow-2xl
      `}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, 0],
      }}
      whileTap={{
        scale: 0.9,
        rotate: 0
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
    >
      {/* 클릭 시 폭발 효과 배경 */}
      {selected && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-pink-300"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}

      {imageUrl && (
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
          <div className="w-full h-full flex items-center justify-center text-2xl font-black text-white">
            {mbti.substring(0, 2)}
          </div>
        </div>
      )}

      <span className={`font-black text-lg ${selected ? 'text-white' : 'text-gray-800'}`}>
        {mbti}
      </span>
    </motion.button>
  );
}

// ===== 3. Button: 네온 효과 버튼 =====
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'neon';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false
}: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    danger: 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600',
    neon: 'bg-black text-neon-pink border-4 border-neon-pink hover:bg-neon-pink hover:text-black shadow-[0_0_20px_rgba(255,16,240,0.5)]',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-4 rounded-full font-black text-lg
        transition-all duration-300
        min-h-[56px]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {children}
    </motion.button>
  );
}

// ===== 4. Card: 기본 카드 =====
interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

export function Card({ children, className = '', gradient = false }: CardProps) {
  return (
    <motion.div
      className={`
        ${gradient
          ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30'
          : 'bg-white'
        }
        rounded-3xl p-8 shadow-2xl
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// ===== 5. RelationshipCard: 관계 선택 카드 =====
interface RelationshipCardProps {
  icon: string;
  text: string;
  onClick: () => void;
}

export function RelationshipCard({ icon, text, onClick }: RelationshipCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative overflow-hidden
                 bg-gradient-to-br from-white to-gray-50
                 border-4 border-gray-200
                 rounded-3xl p-8
                 text-center min-h-[140px]
                 flex flex-col items-center justify-center
                 hover:border-purple-500
                 transition-all duration-300
                 shadow-lg hover:shadow-2xl
                 group"
      whileHover={{
        scale: 1.05,
        rotate: [-2, 2, -2, 0],
        borderColor: '#B026FF'
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 호버 시 그라데이션 배경 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      <div className="relative z-10">
        <motion.div
          className="text-6xl mb-3"
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
        >
          {icon}
        </motion.div>
        <div className="font-black text-xl text-gray-800 group-hover:text-white transition-colors">
          {text}
        </div>
      </div>
    </motion.button>
  );
}

// ===== 6. AnimatedTitle: 타이틀 애니메이션 =====
interface AnimatedTitleProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedTitle({ children, className = '' }: AnimatedTitleProps) {
  return (
    <motion.h1
      className={`text-6xl md:text-7xl font-black text-center mb-6 ${className}`}
      initial={{ opacity: 0, y: -50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        type: 'spring',
        bounce: 0.5
      }}
    >
      <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent
                     drop-shadow-[0_0_30px_rgba(255,16,240,0.5)]">
        {children}
      </span>
    </motion.h1>
  );
}

// ===== 7. ProgressBar: 진행률 표시 =====
interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-gray-600">
          {current} / {total}
        </span>
        <span className="text-sm font-bold text-purple-600">
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                     shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* 반짝이는 효과 */}
        <motion.div
          className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: [-80, `calc(${percentage}% + 80px)`] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

// ===== 8. ShareButton: 공유 버튼 =====
interface ShareButtonProps {
  onClick: () => void;
  icon: string;
  label: string;
  gradient?: string;
}

export function ShareButton({ onClick, icon, label, gradient = 'from-purple-500 to-pink-500' }: ShareButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        flex items-center gap-3 px-6 py-4 rounded-2xl
        bg-gradient-to-r ${gradient}
        text-white font-bold text-lg
        shadow-lg hover:shadow-2xl
        transition-all duration-300
      `}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-2xl">{icon}</span>
      <span>{label}</span>
    </motion.button>
  );
}
