import { useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';

interface AnimatedVisualProps {
  children: ReactNode;
  className: string;
  label: string;
}

export default function AnimatedVisual({ children, className, label }: AnimatedVisualProps) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`${className} animated-visual${paused ? ' is-paused' : ''}`}>
      {children}
      <button className="visual-motion-toggle" type="button" aria-label={`${paused ? 'Phát' : 'Tạm dừng'} chuyển động ${label}`}
        aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}
