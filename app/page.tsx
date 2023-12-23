import Link from "next/link"
import { lemonada } from "@/ui/fonts"

export default function Home() {
  return (
    <main className="h-svh w-svw flex flex-col items-center justify-center">
      <h2 className="text-5xl sm:text-2xl p-4 text-center">
        Welcome to{" "}
        <span className={`${lemonada.className} -tracking-[4px]`}>Moments</span>
      </h2>
      <p className="text-xl sm:text-sm text-center">
        save moments, chat and much more together...
      </p>
      <Link
        className="mt-8 px-8 py-2 bg-slate-200 text-slate-900 rounded-md"
        href="/auth"
      >
        Get Started
      </Link>
    </main>
  )
}
