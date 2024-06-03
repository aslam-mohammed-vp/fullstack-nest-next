'use client';

import { useSession } from 'next-auth/react';

export default function Content() {
  const { data: session } = useSession();

  return (
    <article className="h-screen flex flex-col justify-center items-center">
      <p>
        {!!(session && session.user) &&
          `Hi ${session?.user?.name}. Weclome to the application`}
        {!(session && session.user) && (
          <p>
            <a href="/signIn" className="hover:underline">
              Sign in
            </a>{' '}
            to continue
          </p>
        )}
      </p>
    </article>
  );
}
