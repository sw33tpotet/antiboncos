import React, { useState } from 'react';
import { Anchor, Compass, Info, RotateCcw, Scale, Sliders, Waves } from 'lucide-react';
import { TidePoint } from '../types/marine';

interface SinkerCalculatorProps {
  currentPoint: TidePoint;
}

export const SinkerCalculator: React.FC<SinkerCalculatorProps> = ({ currentPoint }) => {
  const [currentKnots, setCurrentKnots] = useState<number>(currentPoint.currentSpeedKnots);
  const [depthMeters, setDepthMeters] = useState<number>(20);
  const [peLineRating, setPeLineRating] = useState<number>(2.5); // PE 2.5

  // Sync with current hour if requested
  const handleSyncWithLive = () => {
    setCurrentKnots(currentPoint.currentSpeedKnots);
  };

  // Hydrodynamic drag & sinking weight calculation
  // Drag force ~ currentSpeed^2 * lineDiameter * depth
  // Empirically calibrated for Batam straits
  const calcResult = React.useMemo(() => {
    const baseWeightGrams = 30 + (currentKnots * currentKnots * 22) + (depthMeters * 2.2) + (peLineRating * 6);
    const weightGrams = Math.round(baseWeightGrams);

    let localNumber = 'No. 2 (50g)';
    let shapeRecommendation = 'Timah Bulat / Belimbing (Round/Olive)';
    let dragAngleDeg = Math.min(65, Math.round(15 + currentKnots * 14 + peLineRating * 2.5));

    if (weightGrams < 70) {
      localNumber = 'No. 2 - No. 3 (40 - 60g)';
      shapeRecommendation = 'Timah Bulat / Melon (Air Tenang)';
    } else if (weightGrams < 120) {
      localNumber = 'No. 4 (80 - 100g)';
      shapeRecommendation = 'Timah Torpedo / Daun Gantung';
    } else if (weightGrams < 180) {
      localNumber = 'No. 5 - No. 6 / J-2 (120 - 160g)';
      shapeRecommendation = 'Timah Torpedo Ujung Lancip';
    } else if (weightGrams < 260) {
      localNumber = 'No. 8 / J-4 (200 - 250g)';
      shapeRecommendation = 'Timah Piramida / Kerucut Segitiga (Anti Hanyut)';
    } else {
      localNumber = 'No. 10+ / J-6 (300 - 400g)';
      shapeRecommendation = 'Timah Jangkar / Piramida Kaki Pasir';
    }

    return {
      weightGrams,
      localNumber,
      shapeRecommendation,
      dragAngleDeg
    };
  }, [currentKnots, depthMeters, peLineRating]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden mb-8">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Scale className="h-3.5 w-3.5" />
            <span>HIDRODINAMIKA PIRANTI DASARAN (BOTTOM RIG)</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Kalkulator Beban Timah vs Arus Selat Batam
          </h2>
        </div>

        <button
          onClick={handleSyncWithLive}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-slate-800 text-cyan-300 hover:bg-slate-700 transition-colors border border-slate-700 font-mono"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Sinkron Arus Saat Ini ({currentPoint.currentSpeedKnots} kt)</span>
        </button>
      </div>

      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Input */}
        <div className="lg:col-span-6 space-y-5">
          {/* Slider 1: Kecepatan Arus */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Kecepatan Arus Selat:
              </label>
              <span className="font-mono text-sm font-bold text-cyan-400">
                {currentKnots.toFixed(1)} Knot (~{(currentKnots * 0.514).toFixed(2)} m/s)
              </span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.5"
              step="0.1"
              value={currentKnots}
              onChange={(e) => setCurrentKnots(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0.2 kt (Air Tenang)</span>
              <span>1.5 kt (Arus Jalan)</span>
              <span>3.5 kt (Arus Deras Barelang)</span>
            </div>
          </div>

          {/* Slider 2: Kedalaman Air */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Kedalaman Lubuk Karang:
              </label>
              <span className="font-mono text-sm font-bold text-cyan-400">
                {depthMeters} Meter
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={depthMeters}
              onChange={(e) => setDepthMeters(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>5m (Muara/Teluk)</span>
              <span>25m (Pilar Barelang)</span>
              <span>50m (Palung Selat Singapura)</span>
            </div>
          </div>

          {/* Slider 3: Ketebalan Senar PE */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Ukuran Tali Utama (Braided PE Line):
              </label>
              <span className="font-mono text-sm font-bold text-cyan-400">
                PE {peLineRating.toFixed(1)} (~{Math.round(peLineRating * 10 + 5)} lbs)
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.5"
              value={peLineRating}
              onChange={(e) => setPeLineRating(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>PE 1.0 (Halus, gesekan kecil)</span>
              <span>PE 2.5 (Standar dasaran Batam)</span>
              <span>PE 5.0 (Kerapu/Monster)</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 rounded-xl bg-slate-950 border border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-cyan-400 font-semibold mb-1">
              HASIL PERHITUNGAN PIRANTI DASARAN
            </div>
            <h3 className="text-lg font-bold text-white mb-4">
              Rekomendasi Timah Pancing & Konstruksi Rangkaian
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px] font-mono">NOMOR TIMAH LOKAL</div>
                <div className="text-base font-bold font-mono text-cyan-300 mt-0.5">
                  {calcResult.localNumber}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px] font-mono">ESTIMASI BERAT</div>
                <div className="text-base font-bold font-mono text-amber-300 mt-0.5">
                  ~{calcResult.weightGrams} Gram
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <strong className="text-white">Bentuk Timah yang Dianjurkan: </strong>
                <span>{calcResult.shapeRecommendation}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <strong className="text-white">Perkiraan Sudut Kemiringan Senar (Line Drift): </strong>
                <span className="font-mono text-cyan-400 font-bold">~{calcResult.dragAngleDeg}° dari vertikal</span>
                <p className="text-[11px] text-slate-400 mt-1">
                  {calcResult.dragAngleDeg > 45 
                    ? '⚠️ Kemiringan senar cukup tajam. Ulur senar lebih panjang agar umpan tetap menyentuh dasar karang.'
                    : '✅ Kemiringan senar sangat ideal. Sensitivitas getaran sambaran ikan akan terasa tajam ke joran.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
            💡 SARAN: Di Pilar Jembatan 1 Barelang & Selat Sambu, selalu bawa cadangan timah No. 4, 6, dan 8 di kotak pancing.
          </div>
        </div>
      </div>
    </div>
  );
};
