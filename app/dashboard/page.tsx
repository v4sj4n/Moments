import Navbar from "@/components/ui/Navbar";
import { getServerSession } from "next-auth";

export default async function Page() {
  const user = await getServerSession()
  console.log(user?.user?.email)

  return (
    
    <>
    <Navbar />
    <main className="mx-16">
      <h1>Welcome you are logged in with <span className="accent-color font-bold">{user?.user?.email}</span></h1>
    </main>
    </>
  )
}
