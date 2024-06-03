'use client';

import { useSession } from 'next-auth/react';

export default function Content() {
  const { data: session } = useSession();

  return (
    <article className="h-screen flex flex-col justify-center items-center">
      <p>
        {!!(session && session.user) && `Welcome  ${session?.user?.name}`}
        {!(session && session.user) && `Sign in to continue`}
      </p>
    </article>
  );
}
