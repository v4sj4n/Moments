import Link from "next/link"
import { lemonada } from "@/ui/fonts"

export default function Home() {
  return (
    <main className="h-svh w-svw flex flex-col items-center justify-center">
      <h2 className="sm:text-5xl text-3xl sm:p-4 p-2 text-center">
        Welcome to{" "}
        <span className={`${lemonada.className} -tracking-[4px]`}>Moments</span>
      </h2>
      <p className="sm:text-xl text-sm text-center">
        save moments, chat and much more together...
      </p>
      <Link
        className="sm:mt-8 mt-4 px-8 py-2 bg-slate-200 text-slate-900 rounded-md"
        href="/auth"
      >
        Get Started
      </Link>
    </main>
  )
}
