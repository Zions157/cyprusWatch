'use client';

import Image from 'next/image';

export default function Logo({ size = 40, className = '' }) {
  return (
    <Image
      src="/logo.png"
      alt="Cyprus Watch Logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority
    />
  );
}
