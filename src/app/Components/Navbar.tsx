'use client'

import Link from 'next/link'
import { Keyboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <header className="w-full px-4 py-3 flex justify-between items-center  bg-white dark:bg-black">
      <Link href="/" className="flex items-center gap-2">
        <Keyboard className="w-6 h-6 text-blue-600" />
        <span className="font-bold text-xl text-black dark:text-white text-6xl">TypeRush</span>
      </Link>

      <nav className="flex items-center gap-4">
        <Link href="/test">
          <Button variant="ghost">LOGIN </Button>
        </Link>
        
      </nav>
    </header>
  )
}
