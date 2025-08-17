'use client';

import React, { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

/* Improve react-hot-toast to include a maximum for better UX */
function useMaxToasts(max: number) {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= max)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts, max]);
}

export function ImprovedToaster({
  max = 10,
  ...props
}: React.ComponentProps<typeof Toaster> & {
  max?: number;
}) {
  useMaxToasts(max);

  return <Toaster {...props} />;
}
