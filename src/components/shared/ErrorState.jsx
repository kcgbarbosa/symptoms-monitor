import React from 'react';

export default function ErrorState({ error }) {
  return (
    <div className="mb-8 rounded-lg border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      {error}
    </div>
  );
}
