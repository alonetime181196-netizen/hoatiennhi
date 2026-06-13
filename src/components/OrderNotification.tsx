import { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { SOCIAL_PROOF_POOL } from '../data';

export default function OrderNotification() {
  const [currentNotification, setCurrentNotification] = useState<typeof SOCIAL_PROOF_POOL[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show initial notification after 4 seconds
    const initialTimeout = setTimeout(() => {
      triggerNewNotification();
    }, 4000);

    const interval = setInterval(() => {
      triggerNewNotification();
    }, 12000); // Trigger a new one every 12 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const triggerNewNotification = () => {
    setIsVisible(false);
    
    // Select random item
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * SOCIAL_PROOF_POOL.length);
      setCurrentNotification(SOCIAL_PROOF_POOL[randomIndex]);
      setIsVisible(true);
      
      // Auto hides after 5.5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5500);
    }, 400);
  };

  if (!currentNotification || !isVisible) return null;

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 max-w-sm w-[calc(100vw-32px)] md:w-auto bg-white/95 backdrop-blur-md rounded-xl border border-rosegold-light/40 p-4 shadow-xl flex items-start gap-3 transition-all duration-700 transform translate-y-0 opacity-100 animate-bounce-subtle"
      style={{
        animation: 'slideUpFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      <div className="bg-burgundy text-rosegold-light p-2.5 rounded-full flex-shrink-0 animate-pulse">
        <ShoppingBag className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="font-sans font-semibold text-xs text-burgundy">Đơn Hàng Mới</span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          <span className="font-mono text-[9px] text-rosegold ml-auto flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" /> vừa đặt xong
          </span>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed font-sans mt-1">
          <strong className="text-burgundy font-medium">{currentNotification.name}</strong> ({currentNotification.location}) {currentNotification.action} cách đây vài phút.
        </p>
      </div>
      
      <style>{`
        @keyframes slideUpFadeIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
