import React, { useState } from 'react';
import { Anchor, ArrowRight, Calendar, CheckCircle2, Clock, Compass, Fish, Sparkles, Waves } from 'lucide-react';
import { BATAM_FISHING_SPOTS, BATAM_FISH_SPECIES } from '../data/batamMarineData';
import { FishingSpot, FishSpecies, TidePoint } from '../types/marine';

interface FishingTripPlannerProps {
  hourlyData: TidePoint[];
  selectedDate: Date;
}

export const FishingTripPlanner: React.FC<FishingTripPlannerProps> = ({ hourlyData, selectedDate }) => {
  const [selectedSpotId, setSelectedSpotId] = useState<string>(BATAM_FISHING_SPOTS[0].id);
  const [selectedFishId, setSelectedFishId] = useState<string>(BATAM_FISH_SPECIES[0].id);

  const selectedSpot = BATAM_FISHING_SPOTS.find(s => s.id === selectedSpotId) || BATAM_FISHING_SPOTS[0];
  const selectedFish = BATAM_FISH_SPECIES.find(f => f.id === selectedFishId) || BATAM_FISH_SPECIES[0];

  // Calculate best hours for this spot & target fish
  // Best hours: highest fishActivityScore that matches fish preferred current
  const plan = React.useMemo(() => {
    const scoredHours = hourlyData.map(pt => {
      let matchScore = pt.fishActivityScore;
      // Bonus if current is within optimal range
      if (selectedFish.id === 'tenggiri' && pt.currentSpeedKnots >= 1.2 && pt.currentSpeedKnots <= 2.2) {
        matchScore += 15;
      } else if (selectedFish.id === 'kerapu' && pt.currentSpeedKnots <= 0.8) {
        matchScore += 20; // Kerapu loves slack water
      } else if (selectedFish.id === 'kakap-putih' && pt.currentSpeedKnots >= 0.5 && pt.currentSpeedKnots <= 1.3) {
        matchScore += 18;
      } else if (selectedFish.id === 'cumi-torak' && (pt.hour >= 19 || pt.hour <= 5) && pt.currentSpeedKnots <= 0.8) {
        matchScore += 25; // Night + calm water
      }

      return {
        ...pt,
        finalScore: Math.min(100, matchScore)
      };
    });

    scoredHours.sort((a, b) => b.finalScore - a.finalScore);
    const topHours = scoredHours.slice(0, 3);
    const primaryHour = topHours[0];

    // Departure recommendation: 1.5 hours before primary feeding window
    const departHour = (primaryHour.hour - 1 + 24) % 24;
    const departTimeStr = `${String(departHour).padStart(2, '0')}:30`;

    // Sinker recommendation based on current
    let sinkerRec = 'Timah No. 2 - 3 (50-80g)';
    if (primaryHour.currentSpeedKnots > 2.0) {
      sinkerRec = 'Timah No. 6 - 8 / J-4 (200-300g Piramida / Kerucut Arus Deras)';
    } else if (primaryHour.currentSpeedKnots > 1.2) {
      sinkerRec = 'Timah No. 4 - 5 / J-2 (120-160g Torpedo)';
    }

    return {
      primaryHour,
      topHours,
      departTimeStr,
      sinkerRec
    };
  }, [hourlyData, selectedFish, selectedSpot]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden mb-8">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Compass className="h-3.5 w-3.5" />
            <span>SMART TRIP PLANNER PERAIRAN BATAM</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Perencana Jadwal Trip & Rekomendasi Piranti Mancing
          </h2>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          OPTIMASI KONDISI ARUS & WAKTU FEEDING
        </div>
      </div>

      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Selectors */}
        <div className="lg:col-span-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              1. Pilih Lokasi / Spot Mancing:
            </label>
            <select
              value={selectedSpotId}
              onChange={(e) => setSelectedSpotId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
            >
              {BATAM_FISHING_SPOTS.map(spot => (
                <option key={spot.id} value={spot.id}>
                  {spot.name} ({spot.depthMeters})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              2. Target Ikan Utama:
            </label>
            <select
              value={selectedFishId}
              onChange={(e) => setSelectedFishId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
            >
              {BATAM_FISH_SPECIES.map(fish => (
                <option key={fish.id} value={fish.id}>
                  {fish.localName} ({fish.indonesianName})
                </option>
              ))}
            </select>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Fish className="h-3.5 w-3.5 text-cyan-400" />
              <span>Karakteristik Spot {selectedSpot.name.split(' (')[0]}:</span>
            </div>
            <div className="text-slate-400 leading-relaxed">
              Kedalaman {selectedSpot.depthMeters}. {selectedSpot.currentProfile}
            </div>
          </div>
        </div>

        {/* Right Column: Generated Plan Card */}
        <div className="lg:col-span-8 rounded-xl bg-slate-950 border border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
                  HASIL ANALISIS TRIP
                </span>
                <h3 className="text-base font-bold text-white">
                  Rencana Ekspedisi {selectedFish.localName} di {selectedSpot.name.split(' (')[0]}
                </h3>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400">SKOR KELAYAKAN</div>
                <div className="text-xl font-black font-mono text-amber-400">
                  {plan.primaryHour.finalScore}%
                </div>
              </div>
            </div>

            {/* Plan Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px] font-mono mb-1 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-cyan-400" />
                  <span>JAM BERANGKAT DERMAGA</span>
                </div>
                <div className="text-base font-bold font-mono text-cyan-300">
                  {plan.departTimeStr} WIB
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Tiba sebelum arus mulai jalan
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px] font-mono mb-1 flex items-center gap-1">
                  <Waves className="h-3 w-3 text-blue-400" />
                  <span>JAM EMAS STRIKE (GOLDEN)</span>
                </div>
                <div className="text-base font-bold font-mono text-emerald-400">
                  {plan.primaryHour.timeStr} WIB
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Arus {plan.primaryHour.currentSpeedKnots} kt ({plan.primaryHour.currentDirectionName.split(' ')[0]})
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px] font-mono mb-1 flex items-center gap-1">
                  <Anchor className="h-3 w-3 text-amber-400" />
                  <span>TIMAH PANCING COCOK</span>
                </div>
                <div className="text-xs font-bold text-white leading-tight">
                  {plan.sinkerRec.split(' / ')[0]}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Menyesuaikan arus selat
                </div>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Umpan Wajib Dibawa: </strong>
                  <span className="text-slate-300">{selectedSpot.bestBait.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Teknik Terbaik di Spot Ini: </strong>
                  <span className="text-slate-300">{selectedSpot.recommendedTechnique}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Tips Khusus: </strong>
                  <span className="text-slate-300">{selectedFish.tip}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>ALTERNATIF JAM MAKAN: {plan.topHours.map(h => `${h.timeStr} (${h.finalScore}%)`).join(' · ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
