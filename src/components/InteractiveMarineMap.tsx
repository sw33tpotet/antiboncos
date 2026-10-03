import React, { useState } from 'react';
import { Anchor, Compass, Eye, Fish, Info, Layers, MapPin, ShieldAlert, Waves, Wind } from 'lucide-react';
import { BATAM_FISHING_SPOTS } from '../data/batamMarineData';
import { FishingSpot, TidePoint } from '../types/marine';

interface InteractiveMarineMapProps {
  currentPoint: TidePoint;
  onSelectSpot: (spot: FishingSpot) => void;
  selectedSpot: FishingSpot | null;
}

export const InteractiveMarineMap: React.FC<InteractiveMarineMapProps> = ({
  currentPoint,
  onSelectSpot,
  selectedSpot
}) => {
  const [showCurrents, setShowCurrents] = useState<boolean>(true);
  const [showWind, setShowWind] = useState<boolean>(true);
  const [showSpots, setShowSpots] = useState<boolean>(true);
  const [showBathymetry, setShowBathymetry] = useState<boolean>(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Filter spots by category
  const filteredSpots = BATAM_FISHING_SPOTS.filter(s => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  // Calculate current vector angle and flow animation speed
  const isFlood = currentPoint.currentDirectionDeg < 180; // Arus pasang ke arah timur
  const currentSpeed = currentPoint.currentSpeedKnots;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden mb-8">
      {/* Map Control Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Compass className="h-3.5 w-3.5" />
            <span>RADAR OSEANOGRAFI & LUBUK IKAN BATAM</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Peta Arus Selat, Arah Angin & Zona Pemancingan
          </h2>
        </div>

        {/* Layer Switches & Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer Buttons */}
          <button
            onClick={() => setShowCurrents(!showCurrents)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium border transition-colors ${
              showCurrents 
                ? 'bg-blue-950/80 border-blue-500/50 text-blue-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <Waves className="h-3 w-3" />
            <span>Arus Laut</span>
          </button>

          <button
            onClick={() => setShowWind(!showWind)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium border transition-colors ${
              showWind 
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <Wind className="h-3 w-3" />
            <span>Angin</span>
          </button>

          <button
            onClick={() => setShowSpots(!showSpots)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium border transition-colors ${
              showSpots 
                ? 'bg-amber-950/80 border-amber-500/50 text-amber-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <Fish className="h-3 w-3" />
            <span>Titik Lubuk</span>
          </button>

          <button
            onClick={() => setShowBathymetry(!showBathymetry)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium border transition-colors ${
              showBathymetry 
                ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>Kontur</span>
          </button>
        </div>
      </div>

      {/* Main Radar Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
        <div className="lg:col-span-8 bg-slate-950 relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Ambient grid overlay */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)',
              backgroundSize: '36px 36px'
            }}
          />

          {/* SVG Map of Batam waters */}
          <svg
            viewBox="0 0 800 650"
            className="w-full h-full max-w-[850px] select-none"
            style={{ filter: 'drop-shadow(0 0 20px rgba(8, 145, 178, 0.1))' }}
          >
            <defs>
              {/* Radial gradient for depth */}
              <radialGradient id="oceanDeep" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#082f49" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
              </radialGradient>

              {/* Current flow marker */}
              <marker id="currentArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
              </marker>

              {/* Wind arrow marker */}
              <marker id="windArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 2 L 7 5 L 0 8 z" fill="#34d399" />
              </marker>
            </defs>

            {/* Sea Background */}
            <rect width="800" height="650" fill="url(#oceanDeep)" />

            {/* Bathymetry depth contours (Kontur Kedalaman) */}
            {showBathymetry && (
              <g className="opacity-25" stroke="#0ea5e9" strokeWidth="1" fill="none" strokeDasharray="3 3">
                {/* 50m Trench Selat Singapura */}
                <path d="M 120 40 Q 400 80 750 60" />
                <path d="M 150 70 Q 420 110 770 90" />
                {/* 30m Trench Selat Riau */}
                <path d="M 520 140 Q 560 300 620 580" />
                {/* 20m Channel Barelang */}
                <path d="M 330 360 Q 400 480 430 630" />
                {/* Depth Labels */}
                <text x="380" y="70" fill="#38bdf8" fontSize="10" fontFamily="monospace">PALUNG 50m</text>
                <text x="580" y="320" fill="#38bdf8" fontSize="10" fontFamily="monospace">SELAT RIAU 35m</text>
                <text x="360" y="520" fill="#38bdf8" fontSize="10" fontFamily="monospace">BARELANG 25m</text>
              </g>
            )}

            {/* Landmass 1: Singapore Coastline (North) */}
            <path
              d="M 50 10 Q 250 30 450 15 L 750 5 L 750 0 L 50 0 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
            />
            <text x="250" y="22" fill="#64748b" fontSize="11" fontWeight="600" fontFamily="sans-serif">
              PANTAI SINGAPURA (SELAT SINGAPURA)
            </text>

            {/* Landmass 2: Bintan Coastline (East) */}
            <path
              d="M 680 120 Q 640 240 660 380 Q 690 480 720 620 L 800 620 L 800 120 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
            />
            <text x="690" y="280" fill="#64748b" fontSize="12" fontWeight="600" fontFamily="sans-serif" transform="rotate(75, 690, 280)">
              PULAU BINTAN (TANJUNG UBAN)
            </text>

            {/* Landmass 3: Belakang Padang & Pulau Sambu (West) */}
            <g>
              <ellipse cx="140" cy="180" rx="35" ry="24" fill="#334155" stroke="#475569" strokeWidth="1.5" />
              <text x="105" y="184" fill="#94a3b8" fontSize="9" fontWeight="600">P. Belakang Padang</text>

              <ellipse cx="185" cy="155" rx="14" ry="10" fill="#334155" stroke="#475569" strokeWidth="1" />
              <text x="175" y="152" fill="#94a3b8" fontSize="8">P. Sambu</text>
            </g>

            {/* Landmass 4: MAIN BATAM ISLAND */}
            <path
              d="M 230 180 
                 Q 300 120 440 130 
                 Q 510 145 540 180 
                 Q 560 230 520 280 
                 Q 500 320 460 330 
                 Q 380 345 330 330 
                 Q 280 320 250 260 
                 Q 210 220 230 180 Z"
              fill="#1e293b"
              stroke="#475569"
              strokeWidth="2"
            />
            <text x="350" y="235" fill="#f8fafc" fontSize="15" fontWeight="bold" letterSpacing="2">
              PULAU BATAM
            </text>
            <text x="355" y="252" fill="#94a3b8" fontSize="10" fontFamily="monospace">
              BATAM CENTER / NONGSA / SEKUPANG
            </text>

            {/* Barelang Bridges Lines (Jembatan 1 - 6) */}
            <path
              d="M 390 340 L 400 365"
              stroke="#f59e0b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <text x="408" y="358" fill="#fbbf24" fontSize="9" fontWeight="bold">Jembatan 1</text>

            {/* Landmass 5: Pulau Rempang */}
            <path
              d="M 385 375 
                 Q 450 380 470 420 
                 Q 480 470 430 490 
                 Q 380 495 370 450 
                 Q 360 410 385 375 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
            />
            <text x="400" y="440" fill="#cbd5e1" fontSize="12" fontWeight="600">
              P. Rempang
            </text>

            {/* Barelang Jembatan 4-5 Link */}
            <path
              d="M 430 490 L 440 515"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <text x="448" y="505" fill="#fbbf24" fontSize="8" fontWeight="bold">Jembatan 4-5</text>

            {/* Landmass 6: Pulau Galang & Galang Baru */}
            <path
              d="M 435 520 
                 Q 500 530 510 590 
                 Q 470 630 420 620 
                 Q 400 580 435 520 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
            />
            <text x="440" y="575" fill="#cbd5e1" fontSize="11" fontWeight="600">
              P. Galang Baru
            </text>

            {/* Landmass 7: Pulau Abang & Karas (Selatan) */}
            <ellipse cx="530" cy="610" rx="18" ry="12" fill="#334155" stroke="#475569" strokeWidth="1" />
            <text x="515" y="613" fill="#38bdf8" fontSize="8" fontWeight="bold">P. Abang</text>

            {/* Waterway Names */}
            <text x="320" y="110" fill="#38bdf8" fontSize="11" fontFamily="monospace" opacity="0.6">
              SELAT SINGAPURA (INTERNATIONAL TRAFFIC)
            </text>
            <text x="540" y="270" fill="#38bdf8" fontSize="10" fontFamily="monospace" opacity="0.6" transform="rotate(75, 540, 270)">
              SELAT RIAU
            </text>
            <text x="180" y="260" fill="#38bdf8" fontSize="9" fontFamily="monospace" opacity="0.6">
              SELAT SAMBU
            </text>

            {/* Dynamic Current Stream Vectors (Animated Arus Laut) */}
            {showCurrents && (
              <g className="pointer-events-none">
                {/* Selat Singapura Current Lines */}
                <path
                  d={isFlood ? "M 150 80 Q 400 100 700 85" : "M 700 85 Q 400 100 150 80"}
                  stroke="#38bdf8"
                  strokeWidth={Math.min(4, Math.max(1.5, currentSpeed * 1.2))}
                  strokeDasharray="10 8"
                  fill="none"
                  markerEnd="url(#currentArrow)"
                  className="animate-pulse"
                />
                <path
                  d={isFlood ? "M 170 120 Q 380 135 620 125" : "M 620 125 Q 380 135 170 120"}
                  stroke="#0284c7"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  fill="none"
                  markerEnd="url(#currentArrow)"
                />

                {/* Selat Riau Current Lines */}
                <path
                  d={isFlood ? "M 560 160 Q 580 320 630 520" : "M 630 520 Q 580 320 560 160"}
                  stroke="#38bdf8"
                  strokeWidth={Math.min(3.5, Math.max(1.2, currentSpeed))}
                  strokeDasharray="8 6"
                  fill="none"
                  markerEnd="url(#currentArrow)"
                />

                {/* Barelang Strait Current Lines */}
                <path
                  d={isFlood ? "M 380 330 Q 395 430 420 540" : "M 420 540 Q 395 430 380 330"}
                  stroke="#0ea5e9"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  markerEnd="url(#currentArrow)"
                />

                {/* Current Indicators Label */}
                <g transform="translate(60, 570)">
                  <rect width="180" height="52" rx="8" fill="#0f172a" stroke="#1e293b" opacity="0.9" />
                  <text x="10" y="20" fill="#94a3b8" fontSize="9" fontFamily="monospace">VEKTOR ARUS SAAT INI</text>
                  <text x="10" y="38" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    {currentPoint.currentSpeedKnots} KNOT · {currentPoint.currentDirectionDeg}°
                  </text>
                </g>
              </g>
            )}

            {/* Wind Vector Arrows (Arah Angin) */}
            {showWind && (
              <g className="pointer-events-none opacity-80">
                {/* Wind flow lines across grid */}
                {[
                  { x: 100, y: 320 },
                  { x: 260, y: 70 },
                  { x: 480, y: 80 },
                  { x: 620, y: 400 },
                  { x: 300, y: 480 }
                ].map((pos, i) => {
                  const rad = (currentPoint.windDirectionDeg * Math.PI) / 180;
                  const len = 32;
                  const dx = Math.sin(rad) * len;
                  const dy = -Math.cos(rad) * len;
                  return (
                    <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                      <line
                        x1={-dx / 2}
                        y1={-dy / 2}
                        x2={dx / 2}
                        y2={dy / 2}
                        stroke="#34d399"
                        strokeWidth="1.8"
                        markerEnd="url(#windArrow)"
                      />
                    </g>
                  );
                })}

                {/* Wind Status HUD */}
                <g transform="translate(60, 505)">
                  <rect width="180" height="50" rx="8" fill="#0f172a" stroke="#1e293b" opacity="0.9" />
                  <text x="10" y="18" fill="#94a3b8" fontSize="9" fontFamily="monospace">ANGIN PERMUKAAN</text>
                  <text x="10" y="36" fill="#34d399" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    {currentPoint.windSpeedKnots} KNOT ({currentPoint.windDirectionDeg}°)
                  </text>
                </g>
              </g>
            )}

            {/* Fishing Spots Hotspots (Titik Lubuk Ikan) */}
            {showSpots && filteredSpots.map((spot) => {
              const isSelected = selectedSpot?.id === spot.id;
              // Map spot coordinates to SVG (approximate mapping)
              const cx = (spot.mapX / 100) * 800;
              const cy = (spot.mapY / 100) * 650;

              return (
                <g 
                  key={spot.id} 
                  className="cursor-pointer group"
                  onClick={() => onSelectSpot(spot)}
                >
                  {/* Pulsing ring for selected or high safety spot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 16 : 10}
                    className={`${isSelected ? 'fill-cyan-500/30 stroke-cyan-400 stroke-2 animate-ping' : 'fill-amber-500/20 stroke-amber-400 stroke-1'}`}
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 8 : 6}
                    className={`${isSelected ? 'fill-cyan-400' : 'fill-amber-400'}`}
                  />
                  
                  {/* Spot Marker Label */}
                  <rect
                    x={cx + 10}
                    y={cy - 12}
                    width={spot.name.length * 5.8 + 14}
                    height="18"
                    rx="4"
                    fill="#020617"
                    stroke={isSelected ? '#38bdf8' : '#334155'}
                    strokeWidth="1"
                    className="opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <text
                    x={cx + 16}
                    y={cy + 1}
                    fill={isSelected ? '#38bdf8' : '#e2e8f0'}
                    fontSize="9.5"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    fontFamily="sans-serif"
                  >
                    {spot.name.split(' (')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Compass Rose HUD */}
          <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur border border-slate-800 pointer-events-none text-center">
            <div className="text-[10px] font-mono text-cyan-400 font-bold">U (NORTH)</div>
            <div className="h-6 w-0.5 bg-cyan-500/40 mx-auto my-0.5" />
            <div className="text-[10px] font-mono text-slate-400">BATAM</div>
          </div>
        </div>

        {/* Selected Spot Inspector Sidebar */}
        <div className="lg:col-span-4 p-5 bg-slate-900 flex flex-col justify-between overflow-y-auto max-h-[520px]">
          {selectedSpot ? (
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-cyan-400">{selectedSpot.subDistrict.toUpperCase()}</span>
                <span className="text-slate-400">{selectedSpot.category}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                {selectedSpot.name}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {selectedSpot.description}
              </p>

              {/* Spot Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <div className="text-slate-400 mb-0.5">KEDALAMAN</div>
                  <div className="text-cyan-400 font-bold text-sm">{selectedSpot.depthMeters}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <div className="text-slate-400 mb-0.5">RISIKO ARUS</div>
                  <div className={`font-bold text-sm ${
                    selectedSpot.safetyRating === 'Aman' ? 'text-emerald-400' :
                    selectedSpot.safetyRating === 'Waspada' ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {selectedSpot.safetyRating}
                  </div>
                </div>
              </div>

              {/* Target Fish Species */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Fish className="h-3.5 w-3.5 text-amber-400" />
                  <span>Target Ikan Utama</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSpot.targetFish.map((fish, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700/60"
                    >
                      {fish}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Bait & Technique */}
              <div className="space-y-3 mb-4 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80">
                  <div className="text-slate-400 font-semibold mb-1">Umpan Paling Ampuh:</div>
                  <div className="text-slate-200">{selectedSpot.bestBait.join(' · ')}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80">
                  <div className="text-slate-400 font-semibold mb-1">Teknik & Piranti:</div>
                  <div className="text-slate-200">{selectedSpot.recommendedTechnique}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80">
                  <div className="text-slate-400 font-semibold mb-1">Profil Arus:</div>
                  <div className="text-slate-300 leading-normal">{selectedSpot.currentProfile}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 px-4 flex flex-col items-center justify-center h-full">
              <MapPin className="h-10 w-10 text-cyan-400/40 mb-3 animate-bounce" />
              <h4 className="text-sm font-semibold text-white mb-1">Pilih Titik Lubuk Ikan</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Klik salah satu titik lingkaran pada peta perairan Batam di samping untuk melihat kedalaman, target ikan, umpan terbaik, serta analisis arusnya.
              </p>
            </div>
          )}

          {/* Quick Spots List for Mobile/Direct selection */}
          <div className="pt-3 border-t border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 mb-2">PINTASAN SPOT POPULER:</div>
            <div className="grid grid-cols-2 gap-1.5">
              {BATAM_FISHING_SPOTS.slice(0, 4).map(spot => (
                <button
                  key={spot.id}
                  onClick={() => onSelectSpot(spot)}
                  className={`text-left text-xs p-1.5 rounded transition-colors truncate ${
                    selectedSpot?.id === spot.id 
                      ? 'bg-cyan-950/80 text-cyan-300 font-semibold border border-cyan-800' 
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {spot.name.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
