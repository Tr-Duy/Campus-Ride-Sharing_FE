import { useEffect, useRef } from 'react';
import { useApp } from '../../hooks/useApp';

export default function Toast() {
  const { toast, toastKey } = useApp();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toast && ref.current) ref.current.focus();
  }, [toast, toastKey]);

  if (!toast) return null;

  return (
    <div
      ref={ref}
      key={toastKey}
      className="toast-container"
      role="status"
      aria-live="polite"
      tabIndex={-1}
    >
      {toast}
    </div>
  );
}
