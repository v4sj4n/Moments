export default function NotFound() {
  return (
    <main className='h-[77svh] grid place-content-center'>
      <div className='flex gap-3 items-center'>
        <h1 className='accent-color text-5xl pr-4 border-r border-opacity-25 border-slate-100'>
          404
        </h1>{' '}
        <p className='text-lg'>The group you tried to join is not found</p>
      </div>
    </main>
  )
}
