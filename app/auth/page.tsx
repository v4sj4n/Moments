import Link from "next/link"
import { lemonada } from "@/ui/fonts"

export default function Page() {
  return (
    <main className="h-svh w-svw flex flex-col items-center justify-between">
      <h1 className={`${lemonada.className} -tracking-[4px] sm:text-5xl text-2xl mt-10`}>
        <Link href="/">Moments</Link>
      </h1>
      <div className="mb-16 flex flex-col items-center">
        <h3 className="sm:text-4xl text-3xl font-bold mb-9">Sign in / Sign up</h3>
        <form className="flex flex-col gap-4">
          <input
            className="rounded-md px-4 py-2"
            type="text"
            id="identifier"
            name="identifier"
            placeholder="enter a username or email"
          />
          <button className="bg-slate-200 text-slate-900 rounded-md py-2">
            continue
          </button>
        </form>
      </div>
      <p className="mb-10">Enjoy your favorite moments</p>
    </main>
  )
}
