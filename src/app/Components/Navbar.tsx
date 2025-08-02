'use client';

import Link from 'next/link';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useTheme } from './ThemeContext'; // make sure this path is correct

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full px-6 py-4 z-50 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-3 mt-3">
        <span className="font-extrabold text-5xl tracking-wide font-mono text-black dark:text-white">
          TURBOTYPE
        </span>
      </Link>

      <button
        onClick={toggleTheme}
        className="text-3xl text-black dark:text-white hover:scale-110 transition-transform cursor-pointer duration-300"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <CiLight /> : <MdDarkMode />}
      </button>
    </header>
  );
}
