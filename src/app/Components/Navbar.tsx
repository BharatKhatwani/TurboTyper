'use client';

import Link from 'next/link';
import { Keyboard } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full px-6 py-4 z-50   flex justify-between items-center">
      <Link href="/" className="flex items-center gap-3 mt-3">
        {/* <Keyboard className="w-8 h-8 text-white" /> */}
        <span className="font-extrabold text-white text-5xl tracking-wide font-mono">
          TURBOTYPE
        </span>
      </Link>

      {/* <nav className="text-white font-medium text-lg">
        Practice Mode
      </nav> */}
    </header>
  );
}
