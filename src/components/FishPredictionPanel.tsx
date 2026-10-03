import React, { useState } from 'react';
import { Award, Compass, Eye, Fish, Flame, Sparkles, Target, Zap } from 'lucide-react';
import { BATAM_FISH_SPECIES } from '../data/batamMarineData';
import { FishSpecies, SolunarInfo, TidePoint } from '../types/marine';
import underwaterImg from '../assets/images/underwater_pelagic_batam_1791032103430.jpg';

interface FishPredictionPanelProps {
  currentPoint: TidePoint;
  solunar: SolunarInfo;
  hourlyData: TidePoint[];
  onSelectHour: (hour: number) => void;
}

export const FishPredictionPanel: React.FC<FishPredictionPanelProps> = ({
  currentPoint,
  solunar,
  hourlyData,
  onSelectHour
}) => {
  const [selectedSpecies, setSelectedSpecies] = useState<FishSpecies>(BATAM_FISH_SPECIES[0]);

  // Find top 3 hours with best activity today
  const sortedHours = [...hourlyData].sort((a, b) => b.fishActivityScore - a.fishActivityScore);
  const bestHours = sortedHours.slice(0, 4);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Fish className="h-3.5 w-3.5" />
            <span>BIO-OSEANOGRAFI & INDEKS STRIKE IKAN</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Prediksi Potensi Ikan & Jam Puncak Feeding (Batam Waters)
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">RATING HARI INI:</span>
          <span className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-600/50 text-amber-300 font-bold">
            ★ {solunar.overallRating.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Section: Current Hour Fish Probability & Hourly Feeding Barometer */}
        <div className="lg:col-span-5 p-5 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
              <span>STATUS JAM {currentPoint.timeStr} WIB</span>
              <span className="text-cyan-400">FAKTOR: ARUS + SOLUNAR</span>
            </div>

            {/* Score Ring / Barometer */}
            <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-5">
              <div className="relative flex-shrink-0 h-24 w-24 rounded-full flex items-center justify-center bg-slate-900 border-2 border-cyan-500/40">
                <div className="text-center">
                  <div className="text-3xl font-black font-mono text-cyan-300 tabular-nums">
                    {currentPoint.fishActivityScore}
                  </div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                    DARI 100
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  {currentPoint.fishActivityScore >= 80 ? 'Potensi Strike Sangat Tinggi' :
                   currentPoint.fishActivityScore >= 65 ? 'Potensi Strike Baik (Arus Jalan)' :
                   currentPoint.fishActivityScore >= 45 ? 'Aktivitas Ikan Sedang' : 'Ikan Cenderung Pasif'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentPoint.currentSpeedKnots >= 0.8 && currentPoint.currentSpeedKnots <= 1.8 
                    ? 'Arus sedang jalan ideal, membawa kawanan ikan tamban dan cumi kecil keluar dari palung.'
                    : currentPoint.currentSpeedKnots < 0.6
                    ? 'Air tenang (slack water). Ikan pelagis kurang agresif, namun waktu terbaik untuk mancing dasaran kerapu dan mayung.'
                    : 'Arus cukup deras di selat. Targetkan ikan di belakang karang atau pilar penahan arus.'}
                </p>
              </div>
            </div>

            {/* 24-Hour Fish Feeding Timeline Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-white">Distribusi Keaktifan Ikan 24 Jam:</span>
                <span className="font-mono text-slate-400 text-[11px]">Klik bar untuk cek jam</span>
              </div>
              <div className="grid grid-cols-24 gap-0.5 h-12 bg-slate-950/80 p-1 rounded-lg border border-slate-800 items-end">
                {hourlyData.map((pt, idx) => {
                  const isCurrent = idx === currentPoint.hour;
                  const score = pt.fishActivityScore;
                  const heightPercent = Math.max(15, score);
                  const colorClass = 
                    score >= 80 ? 'bg-cyan-400' :
                    score >= 65 ? 'bg-teal-400' :
                    score >= 45 ? 'bg-blue-500' : 'bg-slate-700';

                  return (
                    <button
                      key={idx}
                      onClick={() => onSelectHour(idx)}
                      title={`Pukul ${pt.timeStr} - Skor: ${score}% (${pt.currentSpeedKnots} knot)`}
                      className={`w-full rounded-t transition-all hover:opacity-100 ${colorClass} ${
                        isCurrent ? 'ring-2 ring-white opacity-100 z-10' : 'opacity-70 hover:scale-y-110'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                <span>00:00</span>
                <span>06:00 (Fajar)</span>
                <span>12:00</span>
                <span>18:00 (Senja)</span>
                <span>23:00</span>
              </div>
            </div>

            {/* Top Recommended Windows Today */}
            <div>
              <div className="text-xs font-semibold text-white mb-2 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span>Jam Puncak Makan Ikan (Golden Hours) Hari Ini:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {bestHours.map((bh, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectHour(bh.hour)}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer hover:border-cyan-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span className="font-mono font-bold text-cyan-300">{bh.timeStr} WIB</span>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">{bh.fishActivityScore}%</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      Arus: {bh.currentSpeedKnots} kt ({bh.currentDirectionName.split(' ')[0]})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solunar Minor/Major Periods */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 text-xs">
            <div className="text-slate-400 font-mono mb-1">PERIODE SOLUNAR:</div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-slate-950/40 border border-slate-800">
                <span className="text-amber-400 font-semibold">Mayor (2 Jam Puncak):</span>
                <div className="text-slate-200 mt-0.5 font-mono">{solunar.majorPeriods.join(' & ')}</div>
              </div>
              <div className="p-2 rounded bg-slate-950/40 border border-slate-800">
                <span className="text-slate-300 font-semibold">Minor (Terbit/Tenggelam):</span>
                <div className="text-slate-200 mt-0.5 font-mono">{solunar.minorPeriods.join(' & ')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Target Fish Species in Batam & Gear Breakdown */}
        <div className="lg:col-span-7 p-5 bg-slate-900/40">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Katalog Ikan Target & Karakteristik Perairan Batam
            </div>
            <span className="text-xs text-cyan-400 font-mono">PILIH SPESIES:</span>
          </div>

          {/* Species Selector Tabs */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-5">
            {BATAM_FISH_SPECIES.map((fish) => {
              const isSelected = selectedSpecies.id === fish.id;
              return (
                <button
                  key={fish.id}
                  onClick={() => setSelectedSpecies(fish)}
                  className={`p-2 rounded-lg text-left transition-colors border ${
                    isSelected 
                      ? 'bg-cyan-950/80 border-cyan-500/80 text-cyan-300 font-bold' 
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs truncate">{fish.localName.replace('Ikan ', '')}</div>
                  <div className="text-[10px] font-mono text-amber-400">{fish.activityRatingToday}%</div>
                </button>
              );
            })}
          </div>

          {/* Active Species Detail Card */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
            <div className="relative h-36 w-full overflow-hidden">
              <img
                src={underwaterImg}
                alt={selectedSpecies.localName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
              
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-xs font-mono text-cyan-400 italic">
                    {selectedSpecies.scientificName}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedSpecies.localName} ({selectedSpecies.indonesianName})
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400">KEAKTIFAN HARI INI</div>
                  <div className="text-2xl font-black font-mono text-amber-400 tabular-nums">
                    {selectedSpecies.activityRatingToday}%
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] mb-0.5">KONDISI ARUS OPTIMAL:</div>
                  <div className="text-cyan-300 font-bold">{selectedSpecies.optimalCurrent}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] mb-0.5">PASANG SURUT TERBAIK:</div>
                  <div className="text-amber-300 font-bold">{selectedSpecies.optimalTide}</div>
                </div>
              </div>

              <div>
                <div className="text-slate-400 font-semibold mb-1">Habitat & Karakteristik di Batam:</div>
                <div className="text-slate-200 leading-relaxed">{selectedSpecies.habitat}</div>
              </div>

              <div>
                <div className="text-slate-400 font-semibold mb-1">Umpan Paling Ampuh:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSpecies.bestBaits.map((bait, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200">
                      {bait}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-slate-400 font-semibold mb-1">Teknik & Piranti:</div>
                <div className="text-slate-300">{selectedSpecies.technique}</div>
              </div>

              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-200 leading-relaxed">
                <span className="font-semibold text-white">💡 Tips Rahasia Kapten Mancing Batam: </span>
                {selectedSpecies.tip}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
