'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
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

// ===== 9. SurvivalMeter: 생존 확률 게이지 (위기 상황용) =====
interface SurvivalMeterProps {
  percentage: number;
  className?: string;
}

export function SurvivalMeter({ percentage, className = '' }: SurvivalMeterProps) {
  const getColor = () => {
    if (percentage < 20) return 'from-red-600 to-red-500';
    if (percentage < 50) return 'from-orange-600 to-orange-500';
    if (percentage < 80) return 'from-yellow-600 to-yellow-500';
    return 'from-green-600 to-green-500';
  };

  const getMessage = () => {
    if (percentage < 20) return '🚨 초비상! 즉시 조치 필요!';
    if (percentage < 50) return '⚠️ 위험! 신중하게 행동하세요';
    if (percentage < 80) return '💛 주의! 조심스럽게 접근';
    return '✅ 안전! 좋은 상태입니다';
  };

  return (
    <motion.div
      className={`bg-black/40 backdrop-blur-md rounded-3xl p-6 border-4 ${
        percentage < 20 ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)]' :
        percentage < 50 ? 'border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.6)]' :
        percentage < 80 ? 'border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.6)]' :
        'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.6)]'
      } ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: percentage < 20 ? [0, -5, 0] : 0
      }}
      transition={{
        duration: 0.5,
        y: { repeat: percentage < 20 ? Infinity : 0, duration: 0.8 }
      }}
    >
      <div className="text-center mb-4">
        <motion.h3
          className="text-2xl font-black text-white mb-2"
          animate={percentage < 20 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          {getMessage()}
        </motion.h3>
        <motion.div
          className="text-6xl font-black"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          <span className={`bg-gradient-to-r ${getColor()} bg-clip-text text-transparent`}>
            {percentage}%
          </span>
        </motion.div>
        <p className="text-sm text-white/70 mt-2">생존 확률</p>
      </div>

      {/* 게이지 바 */}
      <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden border-2 border-white/20">
        <motion.div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />

        {/* 깜빡이는 효과 (낮은 확률일 때) */}
        {percentage < 20 && (
          <motion.div
            className="absolute inset-0 bg-red-500/30"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        )}

        {/* 반짝이는 효과 */}
        <motion.div
          className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          animate={{ x: [-80, `calc(${percentage}% + 80px)`] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
      </div>
    </motion.div>
  );
}

// ===== 10. CriticalWarning: 금지어 경고 박스 =====
interface CriticalWarningProps {
  title?: string;
  warnings: string[];
  className?: string;
}

export function CriticalWarning({
  title = "⚠️ 절대 금지! (이거 하면 관계 끝)",
  warnings,
  className = ''
}: CriticalWarningProps) {
  return (
    <motion.div
      className={`bg-gradient-to-br from-red-600/30 to-orange-600/30 backdrop-blur-md rounded-3xl p-6 border-4 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.5)] ${className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: [1, 1.02, 1]
      }}
      transition={{
        duration: 0.5,
        scale: { repeat: Infinity, duration: 2, repeatDelay: 1 }
      }}
    >
      {/* 해골 아이콘 + 타이틀 */}
      <div className="flex items-center gap-3 mb-4">
        <motion.span
          className="text-5xl"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          💀
        </motion.span>
        <h3 className="text-2xl font-black text-red-200 flex-1">
          {title}
        </h3>
        <motion.span
          className="text-5xl"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          💀
        </motion.span>
      </div>

      {/* 경고 메시지들 */}
      <div className="space-y-3">
        {warnings.map((warning, idx) => (
          <motion.div
            key={idx}
            className="bg-black/40 rounded-2xl p-4 border-2 border-red-400/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">⛔</span>
              <p className="text-white text-lg leading-relaxed flex-1">
                {warning}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 하단 경고문 */}
      <motion.div
        className="mt-4 text-center text-red-200 font-bold text-sm"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        🚨 위 행동 시 생존 확률 0% 🚨
      </motion.div>
    </motion.div>
  );
}

// ===== 11. CopyButton: 복사 버튼 (복붙용 대본) =====
interface CopyButtonProps {
  text: string;
  label?: string;
  onCopy?: () => void;
  className?: string;
}

export function CopyButton({
  text,
  label = "📋 카톡에 바로 복붙하기",
  onCopy,
  className = ''
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className={`relative overflow-hidden w-full px-8 py-6 rounded-2xl font-black text-xl
        ${copied
          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
          : 'bg-gradient-to-r from-blue-600 to-purple-600'
        }
        text-white shadow-2xl border-4 border-white/30
        ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={copied}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="copied"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <span className="text-3xl">✅</span>
            <span>복사 완료! 이제 바로 보내세요!</span>
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <span className="text-3xl">📋</span>
            <span>{label}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 반짝이는 효과 */}
      {!copied && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
      )}
    </motion.button>
  );
}
