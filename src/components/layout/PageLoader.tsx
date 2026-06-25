'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trees } from 'lucide-react';

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let finishTimeout: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      finishTimeout = setTimeout(() => setLoading(false), 1000);
    };

    if (document.readyState === 'complete') { finish(); return () => { if (finishTimeout) clearTimeout(finishTimeout); }; }

    window.addEventListener('load', finish);
    const fallbackTimeout = setTimeout(finish, 3000);

    return () => {
      window.removeEventListener('load', finish);
      clearTimeout(fallbackTimeout);
      if (finishTimeout) clearTimeout(finishTimeout);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-0 z-[100] bg-stone-900 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-ochre-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-ochre-600/20">
                  <Trees className="w-10 h-10 text-clay-50" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-1 -right-1 w-6 h-6 border-2 border-ochre-400 border-t-transparent rounded-full"
                />
              </div>
              <div className="text-center">
                <h2 className="font-serif text-2xl text-white mb-1">Pahadi <span className="text-ochre-400">Aangan</span></h2>
                <p className="text-stone-500 text-sm">A Heritage Retreat</p>
              </div>
              <div className="w-48 h-1 bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full bg-gradient-to-r from-ochre-600 to-ochre-400 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        animate={!loading ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
