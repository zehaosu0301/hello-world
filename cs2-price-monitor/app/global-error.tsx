'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg text-white">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="max-w-md text-center text-sm text-slate-300">
            We are tracking this issue. Please try again or contact support if the problem persists.
          </p>
          <button className="rounded-xl bg-brand px-4 py-2 text-sm" type="button" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
