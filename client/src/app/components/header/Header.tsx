'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { signOutServer } from '@/app/api/auth/route';

export default function Header() {
  const { data: session } = useSession();

  const router = useRouter();

  async function handleSignOut() {
    const res = await signOutServer();
    if (res.status === 201) signOut();
  }

  return (
    <header className="flex shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <div
          id="collapseMenu"
          className="max-lg:before:opacity-0 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <ul className="lg:flex lg:gap-x-5 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:overflow-auto z-50">
            <li className=" px-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]"
              >
                Home
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center ml-auto space-x-6">
          {!session?.user && (
            <>
              <button
                type="button"
                className="font-semibold text-[15px] border-none outline-none"
              >
                <a href="/signIn" className="text-[#007bff] hover:underline">
                  Login
                </a>
              </button>
              <button
                type="button"
                onClick={() => router.push('/signIn?isSignUp=true')}
                className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
              >
                Sign up
              </button>
            </>
          )}

          {session?.user && (
            <button
              type="button"
              onClick={() => handleSignOut()}
              className="font-semibold text-[15px] border-none outline-none text-[#007bff]"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
