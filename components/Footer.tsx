import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <motion.footer
      className="mt-16 py-8 border-t border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center space-y-4">
          {/* Contact & Updates */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white/90">Contact & Updates</h3>
            <div className="flex flex-col items-center gap-2 text-white/70">
              <p>운영자: <span className="font-semibold text-white/90">NomadLab</span></p>
              <Link
                href="https://www.threads.net/@reels_code_official"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 hover:border-purple-500/60 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">💬</span>
                  <span className="font-semibold text-white/90 group-hover:text-white">
                    @reels_code_official
                  </span>
                  <span className="text-sm text-white/60">(Threads)</span>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-4 border-t border-white/5">
            <p className="text-sm text-white/50">
              © 2025 MBTI Explain. All rights reserved.
            </p>
          </div>

          {/* Quick Links (Optional) */}
          <div className="flex justify-center gap-4 text-xs text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">
              홈
            </Link>
            <span>•</span>
            <Link href="/quiz" className="hover:text-white/70 transition-colors">
              1분 퀴즈
            </Link>
            <span>•</span>
            <Link href="/simulator" className="hover:text-white/70 transition-colors">
              갈등 시뮬레이터
            </Link>
            <span>•</span>
            <Link href="/translator" className="hover:text-white/70 transition-colors">
              속마음 번역기
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
