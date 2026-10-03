import React from 'react';
import { Anchor, ArrowUpRight, Gauge, Navigation, Waves, Wind } from 'lucide-react';
import { SolunarInfo, TidePoint, WeatherCondition } from '../types/marine';
import heroSatelliteImg from '../assets/images/batam_waters_satellite_1791032075731.jpg';

interface MarineHeroProps {
  currentPoint: TidePoint;
  solunar: SolunarInfo;
  weather: WeatherCondition;
  selectedDate: Date;
  onExploreMap: () => void;
  onReadMethodology: () => void;
}

export const MarineHero: React.FC<MarineHeroProps> = ({
  currentPoint,
  solunar,
  weather,
  selectedDate,
  onExploreMap,
  onReadMethodology,
}) => {
  const formattedDate = selectedDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 mb-8">
      {/* Background satellite overlay with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSatelliteImg}
          alt="Satelit Oseanografi Perairan Batam dan Selat Singapura"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/50" />
      </div>

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3 tracking-wide">
            <span>PERAIRAN KEPULAUAN RIAU</span>
            <span aria-hidden="true">·</span>
            <span>SELAT SINGAPURA & SELAT RIAU</span>
            <span aria-hidden="true">·</span>
            <span>KOORDINAT 1.08° N, 104.03° E</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3 leading-tight" style={{ textWrap: 'balance' }}>
            Prediksi Oseanografi & Lubuk Ikan Perairan Batam
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-2xl">
            Sistem kalkulasi presisi kecepatan dan arah arus selat, kurva pasang surut astronomis semidiurnal, arah angin permukaan, serta indeks keaktifan feeding predator laut (Tenggiri, Siakap, Kerapu, dan Cumi-cumi) untuk wilayah Batam dan Barelang.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreMap}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span>Buka Radar & Titik Lubuk Ikan</span>
            </button>
            <button
              onClick={onReadMethodology}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700/80 rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
            >
              <span>Bagaimana Cara Prediksinya?</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Live Metric Ribbon (4 Key Telemetry Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border-t border-slate-800/80 pt-6">
          {/* Card 1: Tinggi Air & Pasang Surut */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5">
                <Waves className="h-3.5 w-3.5 text-cyan-400" />
                <span>Muka Air Laut</span>
              </span>
              <span className="font-mono text-cyan-400">{currentPoint.timeStr} WIB</span>
            </div>
            <div className="flex items-baseline gap-1.5 my-1">
              <span className="text-2xl font-bold font-mono text-white tabular-nums">
                {currentPoint.waterLevelMeters.toFixed(2)}
              </span>
              <span className="text-xs font-mono text-slate-400">METER</span>
            </div>
            <div className="text-xs text-slate-400 truncate">
              {currentPoint.isHighTide ? 'Puncak Air Pasang' : currentPoint.isLowTide ? 'Lembah Air Surut' : solunar.tideType}
            </div>
          </div>

          {/* Card 2: Arus Laut */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5">
                <Anchor className="h-3.5 w-3.5 text-blue-400" />
                <span>Arus Selat</span>
              </span>
              <span className="font-mono text-blue-400">{currentPoint.currentDirectionDeg}°</span>
            </div>
            <div className="flex items-baseline gap-1.5 my-1">
              <span className="text-2xl font-bold font-mono text-white tabular-nums">
                {currentPoint.currentSpeedKnots.toFixed(1)}
              </span>
              <span className="text-xs font-mono text-slate-400">KNOT</span>
            </div>
            <div className="text-xs text-slate-400 truncate">
              {currentPoint.currentDirectionName}
            </div>
          </div>

          {/* Card 3: Arah & Kecepatan Angin */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5">
                <Wind className="h-3.5 w-3.5 text-emerald-400" />
                <span>Angin Permukaan</span>
              </span>
              <span className="font-mono text-emerald-400">{currentPoint.windDirectionDeg}°</span>
            </div>
            <div className="flex items-baseline gap-1.5 my-1">
              <span className="text-2xl font-bold font-mono text-white tabular-nums">
                {currentPoint.windSpeedKnots.toFixed(1)}
              </span>
              <span className="text-xs font-mono text-slate-400">KNOT</span>
            </div>
            <div className="text-xs text-slate-400 truncate">
              Gelombang: {currentPoint.waveHeightMeters}m (Tenang)
            </div>
          </div>

          {/* Card 4: Indeks Ikan & Solunar */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5">
                <Gauge className="h-3.5 w-3.5 text-amber-400" />
                <span>Aktivitas Ikan</span>
              </span>
              <span className="font-mono text-amber-400">{solunar.moonPhase.split(' ')[0]}</span>
            </div>
            <div className="flex items-baseline gap-1.5 my-1">
              <span className="text-2xl font-bold font-mono text-white tabular-nums">
                {currentPoint.fishActivityScore}%
              </span>
              <span className="text-xs font-mono text-slate-400">POTENSI</span>
            </div>
            <div className="text-xs text-slate-400 truncate">
              {currentPoint.fishActivityScore >= 80 ? 'Sangat Aktif Makan' : currentPoint.fishActivityScore >= 60 ? 'Arus Makan Bagus' : 'Aktivitas Normal'}
            </div>
          </div>
        </div>

        {/* Date context bar */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>TANGGAL PREDIKSI: {formattedDate.toUpperCase()}</span>
          <span>FASE BULAN: {solunar.moonPhase} ({solunar.moonIllumination}%)</span>
        </div>
      </div>
    </div>
  );
};
