'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-2xl p-8 text-center cursor-pointer card-hover border-4 border-purple-200 min-h-[200px] flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-purple-900 mb-2 whitespace-nowrap">{title}</h3>
        <p className="text-sm text-gray-600 whitespace-nowrap">{description}</p>
      </div>
    </Link>
  );
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  type?: 'button' | 'submit';
}

export function Button({ children, onClick, variant = 'primary', className = '', type = 'button' }: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all duration-300 min-h-[44px]';
  const variants = {
    primary: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:scale-105 hover:shadow-lg',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

interface MBTIButtonProps {
  mbti: string;
  onClick: () => void;
  imageUrl?: string;
}

export function MBTIButton({ mbti, onClick, imageUrl }: MBTIButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white border-3 border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 min-h-[100px] min-w-[70px] hover:border-purple-500 hover:scale-105 transition-all duration-300 hover:shadow-lg"
    >
      {imageUrl && (
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-purple-600">
            {mbti.substring(0, 2)}
          </div>
        </div>
      )}
      <span className="font-semibold text-gray-800">{mbti}</span>
    </button>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}>
      {children}
    </div>
  );
}

interface RelationshipCardProps {
  icon: string;
  text: string;
  onClick: () => void;
}

export function RelationshipCard({ icon, text, onClick }: RelationshipCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-br from-white to-gray-50 border-3 border-gray-200 rounded-2xl p-6 text-center min-h-[100px] flex flex-col items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-xl group"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <div className="font-bold text-gray-800 group-hover:text-white">{text}</div>
    </button>
  );
}
