import Link from "next/link"
import { lemonada } from "@/ui/fonts"

export default function Page() {
  const otr = [
    {
      uuid: 1,
      title: "GSVXH",
      slug: "gsvxh",
      users: ["Durresi", "Librazhdi", "Saranda", "Korca"],
    },
    {
      uuid: 2,
      title: "GSVXH",
      slug: "gsvxh",
      users: ["Durresi", "Librazhdi", "Saranda", "Korca"],
    },
    {
      uuid: 3,
      title: "GSVXH",
      slug: "gsvxh",
      users: ["Durresi", "Librazhdi", "Saranda", "Korca"],
    },
    {
      uuid: 4,
      title: "GSVXH",
      slug: "gsvxh",
      users: ["Durresi", "Librazhdi", "Saranda", "Korca"],
    },
  ]
  return (
    <main className="w-screen ">
      <h1
        className={`${lemonada.className} -tracking-[4px] text-5xl mt-10 mb-6 text-center`}
      >
        <Link href="/">Moments</Link>
      </h1>
      <div className="w-4/5 m-auto">
        <h3 className="text-3xl font-bold mb-2">Welcome Vasjan</h3>
        <div className="flex gap-x-4 flex-wrap justify-between">
          <p className="sm:text-xl">Here are your groups</p>
          <div className="flex flex-row  gap-4">
            <Link className="hover:underline sm:text-xl" href="/create">
              Create
            </Link>
            <Link className="hover:underline sm:text-xl" href="/join">
              Join
            </Link>
          </div>
        </div>
        {/* Groups */}
        <div className="mt-4 flex items-center justify-between flex-wrap">
          {otr.map((i) => {
            return (
              <div
                key={i.uuid}
                className="flex items-center gap-4 border border-gray-200 rounded-lg justify-center p-4"
              >
                <h3 className="text-2xl font-bold mb-2">
                  <Link href={`/group/${i.slug}`}>{i.title}</Link>
                </h3>
                <div className="flex flex-row gap-2">
                  {i.users.map((user) => {
                    return (
                      <p className="text-sm" key={user}>
                        {user}
                      </p>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
