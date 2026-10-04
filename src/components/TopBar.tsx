import React from 'react';
import { Compass, Waves } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface TopBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onJumpToNow: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ activeTab, onTabChange, onJumpToNow }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Zone - Single text element wordmark */}
        <a 
          href="#beranda" 
          onClick={() => onTabChange('radar')}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <Waves className="h-4 w-4" />
          </div>
          <span>Batam OceanCast</span>
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => onTabChange('radar')}
            className={`transition-colors hover:text-white whitespace-nowrap ${activeTab === 'radar' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Peta Radar
          </button>
          <button
            onClick={() => onTabChange('pasang-surut')}
            className={`transition-colors hover:text-white whitespace-nowrap ${activeTab === 'pasang-surut' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Pasang Surut
          </button>
          <button
            onClick={() => onTabChange('petua-bulan')}
            className={`transition-colors hover:text-white whitespace-nowrap ${activeTab === 'petua-bulan' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Kalender Petua
          </button>
          <button
            onClick={() => onTabChange('sst')}
            className={`transition-colors hover:text-white whitespace-nowrap ${activeTab === 'sst' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Satelit SST
          </button>
          <button
            onClick={() => onTabChange('rig-simulator')}
            className={`transition-colors hover:text-white whitespace-nowrap ${activeTab === 'rig-simulator' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Rangkaian Pancing
          </button>
          <button
            onClick={() => onTabChange('safety')}
            className={`transition-colors hover:text-white whitespace-nowrap ${activeTab === 'safety' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Keselamatan Laut
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <PWAInstallButton />
          <button
            onClick={onJumpToNow}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Kondisi Saat Ini</span>
          </button>
        </div>
      </div>
    </header>
  );
};

