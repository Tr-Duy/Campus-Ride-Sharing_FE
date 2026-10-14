interface Props {
  title: string;
  body: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function Modal({ title, body, onConfirm, onClose }: Props) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const dialogRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const previousFocus = document.activeElement;
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    return () => {
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  const handleConfirm = async () => {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      await onConfirm();
      onClose();
    } catch (e: unknown) {
      setError((e instanceof Error ? e.message : "Unexpected error. Please retry."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-bg"
      ref={dialogRef}
      onClick={(e) => { if (!loading && e.target === e.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !loading) onClose();
        if (event.key !== 'Tab') return;
        const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }}
      role="dialog"
      aria-modal
      aria-labelledby="modal-title"
    >
      <div className="panel">
        <h3 id="modal-title">{title}</h3>
        <p className="muted" style={{ marginTop: 16 }}>{body}</p>
        {error && <p className="error" style={{ marginTop: 12 }} role="alert">{error}</p>}
        <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
          <button type="button" className="btn secondary" onClick={onClose} disabled={loading}>Quay lại</button>
          <button type="button" className="btn primary" onClick={handleConfirm} disabled={loading}>
            {loading ? 'Đang xử lý' : 'Xác nhận'}
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
