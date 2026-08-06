'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="notfound">
      <h1 className="h-display">Oops</h1>
      <p className="lead mt-22">Something went wrong.</p>
      <p className="mt-10 notfound-msg">
        An unexpected error occurred. Please try again.
      </p>
      <button type="button" className="btn btn-primary mt-28" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
