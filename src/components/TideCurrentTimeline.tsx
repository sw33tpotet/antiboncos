import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, Info, Moon, Play, RotateCcw, Waves, Wind } from 'lucide-react';
import { SolunarInfo, TidePoint } from '../types/marine';

interface TideCurrentTimelineProps {
  hourlyData: TidePoint[];
  currentHour: number;
  onHourChange: (hour: number) => void;
  solunar: SolunarInfo;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  highTideTimes: string[];
  lowTideTimes: string[];
}

export const TideCurrentTimeline: React.FC<TideCurrentTimelineProps> = ({
  hourlyData,
  currentHour,
  onHourChange,
  solunar,
  selectedDate,
  onDateChange,
  highTideTimes,
  lowTideTimes
}) => {
  const currentPoint = hourlyData[currentHour] || hourlyData[0];

  // Helper to shift date
  const shiftDay = (days: number) => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + days);
    onDateChange(nextDate);
  };

  const formattedDate = selectedDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  // Calculate SVG curve geometry for 24 hours
  // Width 800px, Height 180px
  // Min water level ~0.5m, Max water level ~3.6m
  const svgWidth = 800;
  const svgHeight = 180;
  const minLevel = 0.4;
  const maxLevel = 3.6;

  const getY = (val: number) => {
    const normalized = (val - minLevel) / (maxLevel - minLevel);
    return svgHeight - (normalized * (svgHeight - 40) + 20);
  };

  const getX = (hour: number) => {
    return (hour / 23) * (svgWidth - 60) + 30;
  };

  // Build SVG path
  let pathD = `M ${getX(0)} ${getY(hourlyData[0].waterLevelMeters)}`;
  for (let i = 1; i < hourlyData.length; i++) {
    const xPrev = getX(i - 1);
    const yPrev = getY(hourlyData[i - 1].waterLevelMeters);
    const xCurr = getX(i);
    const yCurr = getY(hourlyData[i].waterLevelMeters);
    const xMid = (xPrev + xCurr) / 2;
    pathD += ` C ${xMid} ${yPrev}, ${xMid} ${yCurr}, ${xCurr} ${yCurr}`;
  }

  // Area fill path
  const areaD = `${pathD} L ${getX(23)} ${svgHeight} L ${getX(0)} ${svgHeight} Z`;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden mb-8">
      {/* Top Header with Date Switcher and Solunar Type */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Waves className="h-3.5 w-3.5" />
            <span>MODEL HARMONIK PASANG SURUT & ARUS SELAT (24 JAM)</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Grafik Elevasi Air Laut & Vektor Arus Batam
          </h2>
        </div>

        {/* Date Selector Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => shiftDay(-1)}
            aria-label="Hari Sebelumnya"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/60"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-white">
            <Calendar className="h-3.5 w-3.5 text-cyan-400" />
            <span>{formattedDate}</span>
          </div>

          <button
            onClick={() => shiftDay(1)}
            aria-label="Hari Berikutnya"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/60"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Tidal Curve Chart */}
      <div className="p-4 sm:p-6 bg-slate-950/40 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 mb-4 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Tinggi Muka Air (Meter)
            </span>
            <span className="text-slate-400 font-mono">
              Pasang Puncak: <strong className="text-white">{highTideTimes.join(', ') || 'N/A'}</strong>
            </span>
            <span className="text-slate-400 font-mono">
              Surut Lembah: <strong className="text-white">{lowTideTimes.join(', ') || 'N/A'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span className="text-amber-400">FASE BULAN:</span>
            <span className="text-white font-semibold">{solunar.moonPhase}</span>
            <span className="text-slate-500">·</span>
            <span className="text-cyan-300 font-semibold">{solunar.tideType}</span>
          </div>
        </div>

        {/* SVG Tidal Chart */}
        <div className="relative w-full overflow-x-auto pb-2">
          <div className="min-w-[680px]">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-44 select-none">
              <defs>
                <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                  <stop offset="80%" stopColor="#0891b2" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines for heights (1m, 2m, 3m) */}
              {[1.0, 2.0, 3.0].map((level) => {
                const y = getY(level);
                return (
                  <g key={level}>
                    <line x1="30" y1={y} x2={svgWidth - 30} y2={y} stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />
                    <text x="5" y={y + 3} fill="#64748b" fontSize="9" fontFamily="monospace">
                      {level.toFixed(1)}m
                    </text>
                  </g>
                );
              })}

              {/* Mean Sea Level Line (MSL 1.95m) */}
              <line
                x1="30"
                y1={getY(1.95)}
                x2={svgWidth - 30}
                y2={getY(1.95)}
                stroke="#0284c7"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.5"
              />
              <text x={svgWidth - 65} y={getY(1.95) - 4} fill="#0284c7" fontSize="8" fontFamily="monospace">
                MSL 1.95m
              </text>

              {/* Tide Filled Area */}
              <path d={areaD} fill="url(#tideGradient)" />

              {/* Tide Stroke Curve */}
              <path d={pathD} fill="none" stroke="#22d3ee" strokeWidth="2.5" />

              {/* Hour Data Points & Peak Badges */}
              {hourlyData.map((pt, i) => {
                const cx = getX(i);
                const cy = getY(pt.waterLevelMeters);
                const isSelected = i === currentHour;

                return (
                  <g key={i}>
                    {/* High/Low Tide badges */}
                    {pt.isHighTide && (
                      <g>
                        <circle cx={cx} cy={cy} r="4" fill="#38bdf8" />
                        <text x={cx} y={cy - 9} fill="#38bdf8" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          PASANG {pt.waterLevelMeters.toFixed(2)}m
                        </text>
                      </g>
                    )}
                    {pt.isLowTide && (
                      <g>
                        <circle cx={cx} cy={cy} r="4" fill="#94a3b8" />
                        <text x={cx} y={cy + 14} fill="#94a3b8" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          SURUT {pt.waterLevelMeters.toFixed(2)}m
                        </text>
                      </g>
                    )}

                    {/* Hourly tick on x axis */}
                    <text x={cx} y={svgHeight - 4} fill={isSelected ? '#38bdf8' : '#64748b'} fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight={isSelected ? 'bold' : 'normal'}>
                      {String(i).padStart(2, '0')}
                    </text>
                  </g>
                );
              })}

              {/* Active Scrubber Line & Dot */}
              <line
                x1={getX(currentHour)}
                y1="10"
                x2={getX(currentHour)}
                y2={svgHeight - 18}
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              <circle
                cx={getX(currentHour)}
                cy={getY(currentPoint.waterLevelMeters)}
                r="6"
                fill="#0891b2"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        </div>

        {/* Time Scrubber Slider Controls */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-semibold text-white">Geser Waktu Jam:</span>
              <span className="text-sm font-bold font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">
                {currentPoint.timeStr} WIB
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Ketinggian Air: <span className="text-white font-bold">{currentPoint.waterLevelMeters.toFixed(2)} m</span>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="23"
            step="1"
            value={currentHour}
            onChange={(e) => onHourChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>00:00 (Tengah Malam)</span>
            <span>06:00 (Fajar)</span>
            <span>12:00 (Siang)</span>
            <span>18:00 (Senja)</span>
            <span>23:00 (Malam)</span>
          </div>
        </div>
      </div>

      {/* Dual Telemetry Gauges for Selected Hour: Arus Laut & Angin */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 p-5 bg-slate-900/60">
        {/* Gauge 1: Arus Laut Selat */}
        <div className="flex items-start gap-4 pb-4 md:pb-0 md:pr-4">
          <div className="relative flex-shrink-0 h-20 w-20 rounded-full border border-blue-500/40 bg-blue-950/30 flex items-center justify-center">
            {/* Rotating Arrow Indicator */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
              style={{ transform: `rotate(${currentPoint.currentDirectionDeg}deg)` }}
            >
              <div className="h-8 w-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
              <div className="absolute top-2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-cyan-400" />
            </div>
            <div className="text-[10px] font-mono text-cyan-200 z-10 font-bold">
              {currentPoint.currentSpeedKnots} kt
            </div>
          </div>

          <div className="flex-1">
            <div className="text-xs font-mono text-blue-400 mb-0.5 flex items-center gap-1">
              <span>VEKTOR HIDRODINAMIKA ARUS</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">
              {currentPoint.currentDirectionName}
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed mb-2">
              Kecepatan aliran <strong className="text-white font-mono">{currentPoint.currentSpeedKnots} knot</strong> (~{(currentPoint.currentSpeedKnots * 0.514).toFixed(2)} m/detik) dengan sudut azimuth <strong className="text-white font-mono">{currentPoint.currentDirectionDeg}°</strong>.
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800">
              {currentPoint.currentSpeedKnots < 0.6 ? (
                <span className="text-cyan-300 font-semibold">🌊 Air Tenang (Slack Water): Waktu emas mancing dasaran lubuk karang. Timah tidak hanyut.</span>
              ) : currentPoint.currentSpeedKnots <= 1.8 ? (
                <span className="text-emerald-300 font-semibold">🎣 Arus Jalan Sempurna: Plankton & anak ikan bergerak memicu Tenggiri & Kakap aktif memburu.</span>
              ) : (
                <span className="text-amber-300 font-semibold">⚠️ Arus Sangat Deras: Gunakan timah berat (J3-J5) atau cari posisi di belakang pilar/tanjung karang.</span>
              )}
            </div>
          </div>
        </div>

        {/* Gauge 2: Angin & Gelombang */}
        <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-4">
          <div className="relative flex-shrink-0 h-20 w-20 rounded-full border border-emerald-500/40 bg-emerald-950/30 flex items-center justify-center">
            {/* Rotating Arrow Indicator */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
              style={{ transform: `rotate(${currentPoint.windDirectionDeg}deg)` }}
            >
              <div className="h-8 w-1 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
              <div className="absolute top-2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-emerald-400" />
            </div>
            <div className="text-[10px] font-mono text-emerald-200 z-10 font-bold">
              {currentPoint.windSpeedKnots} kt
            </div>
          </div>

          <div className="flex-1">
            <div className="text-xs font-mono text-emerald-400 mb-0.5 flex items-center gap-1">
              <span>METEOROLOGI ANGIN & GELOMBANG</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">
              Angin {currentPoint.windDirectionDeg}° · Gelombang {currentPoint.waveHeightMeters}m
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed mb-2">
              Kecepatan angin <strong className="text-white font-mono">{currentPoint.windSpeedKnots} knot</strong> (~{(currentPoint.windSpeedKnots * 1.852).toFixed(1)} km/jam) memicu tinggi gelombang signifikan <strong className="text-white font-mono">{currentPoint.waveHeightMeters} m</strong> di selat.
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800">
              {currentPoint.windSpeedKnots <= 12 ? (
                <span className="text-emerald-300 font-semibold">⛵ Kondisi Melaut Aman: Sangat ramah bagi perahu pompong kecil dan mancing santai.</span>
              ) : currentPoint.windSpeedKnots <= 18 ? (
                <span className="text-amber-300 font-semibold">⚠️ Angin Sedang: Hati-hati ombak beriak di Selat Singapura terbuka.</span>
              ) : (
                <span className="text-rose-300 font-semibold">🛑 Angin Kencang: Tunda melaut dengan perahu kecil; ombak memecah di selat luar.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
