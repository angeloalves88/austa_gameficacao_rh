import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-2">
      {message}
    </div>
  );
}
