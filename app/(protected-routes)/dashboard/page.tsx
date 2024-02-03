import Navbar from '@/components/Navbar'
import { currentUser } from '@clerk/nextjs'

export default async function Page() {
  const user = await currentUser()
  let userObj = {}
  if (user) {
    userObj = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0].emailAddress,
      username: user.username,
    }
  }
  return (
      <main className='mx-10'>
        <h1>Dashboard</h1>
      </main>
  )
}
