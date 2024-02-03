import Link from "next/link";

export default function Home() {
  return (
    <main className="h-svh flex flex-col items-center justify-center">
      <h1 className="poppins text-6xl font-bold">Moments</h1>
      <hr className="w-32 mb-2 mt-0.5 ml-40 accent-color-border"  />
      <p className="raleway font-normal text-[13.5px] mb-4">The place where you save all your memories</p>
      <Link href="/dashboard" className="h-8 accent-color-bg w-72 rounded-[10px] flex justify-center items-center font-bold">get started</Link>
    </main>
  );
}
