import React, { useState } from 'react';
import { CheckCircle2, HardDrive, Wifi, WifiOff, X } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      {!isOnline && (
        <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center justify-between gap-3 rounded-xl bg-amber-950/95 border border-amber-600/70 p-3 text-xs font-medium text-amber-200 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-900/60 text-amber-400">
              <WifiOff className="h-4 w-4 animate-pulse" />
            </div>
            <div>
              <div className="font-bold text-white">Mode Offline Aktif (Tanpa Sinyal)</div>
              <div className="text-[11px] text-amber-300">
                Peta batimetri Batam & tabel pasang surut astronomis tetap berjalan normal dari penyimpanan lokal HP.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Offline Readiness Badge in Header / Bottom corner */}
      {isOnline && !dismissed && (
        <div className="hidden lg:flex fixed bottom-4 right-4 z-40 items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 backdrop-blur shadow-lg">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>OFFLINE READY · CACHED FOR SEA TRIP</span>
          <button
            onClick={() => setDismissed(true)}
            className="hover:text-white p-0.5"
            aria-label="Tutup info"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </>
  );
};
