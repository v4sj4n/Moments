import Link from "next/link"
import { lemonada } from "@/ui/fonts"

export default function Page() {
  return (
    <main className="h-[90svh] sm:h-[70svh] w-svw flex flex-col items-center justify-between">
      <h1
        className={`${lemonada.className} -tracking-[4px] sm:text-5xl text-2xl mt-10`}
      >
        <Link href="/">Moments</Link>
      </h1>
      <div className="mb-16 flex flex-col items-center">
        <h3 className="sm:text-4xl text-3xl font-bold mb-9">Sign up</h3>

        <form className="flex flex-col gap-4 w-80">
          <input
            className="rounded-md px-4 py-2 text-gray-900"
            type="text"
            id="identifier"
            name="identifier"
            placeholder="name"
          />
          <input
            className="rounded-md px-4 py-2 text-gray-900"
            type="text"
            id="identifier"
            name="identifier"
            placeholder="username"
          />
          <input
            className="rounded-md px-4 py-2 text-gray-900"
            type="email"
            id="identifier"
            name="identifier"
            placeholder="email"
          />
          <input
            className="rounded-md px-4 py-2 text-gray-900"
            type="password"
            id="identifier"
            name="identifier"
            placeholder="password"
          />
          <button className="border border-gray-200 hover:bg-gray-200 hover:text-gray-900 text-gray-200 rounded-md py-2 mt-2 sm:mt-4">
            continue
          </button>
        </form>
      </div>
    </main>
  )
}
