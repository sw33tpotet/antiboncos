import React, { useState } from 'react';
import { Activity, Compass, Eye, Filter, Flame, Info, Layers, Navigation, Radio, Satellite, Sparkles, Thermometer, Waves, Zap } from 'lucide-react';

interface ThermalFrontSpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  mapX: number; // percentage
  mapY: number; // percentage
  sstCelsius: number;
  chlorophyllMgM3: number;
  frontGradient: string; // e.g. 'ΔT = 0.85°C / mil'
  pelagicTargets: string[];
  optimalSeason: string;
  status: 'Front Aktif Kuat' | 'Front Sedang' | 'Kondisi Stabil';
  description: string;
}

const THERMAL_FRONT_SPOTS: ThermalFrontSpot[] = [
  {
    id: 'front-karang-galang',
    name: 'Thermal Front Karang Galang Luar (Laut Natuna)',
    lat: 0.7250,
    lng: 104.3850,
    mapX: 78,
    mapY: 74,
    sstCelsius: 28.4,
    chlorophyllMgM3: 0.95,
    frontGradient: 'ΔT = 0.82°C / NM',
    pelagicTargets: ['Mahi-mahi (Lemadang)', 'Tenggiri Babon (>8 kg)', 'Yellowfin Tuna Muda'],
    optimalSeason: 'Peralihan Musim Timur ke Barat (Oktober - Desember)',
    status: 'Front Aktif Kuat',
    description: 'Pertemuan air dingin kaya nutrien dari Laut Natuna dengan massa air hangat dari Selat Riau. Sering terlihat buih konvergensi plankton di permukaan yang mengundang ikan Lemadang melompat memangsa terbang laut.'
  },
  {
    id: 'front-bintan-utara',
    name: 'Front Oseanografi Bintan Utara (Laut Cina Selatan)',
    lat: 1.2500,
    lng: 104.3600,
    mapX: 74,
    mapY: 18,
    sstCelsius: 28.6,
    chlorophyllMgM3: 1.15,
    frontGradient: 'ΔT = 0.74°C / NM',
    pelagicTargets: ['Ikan Tongkol Komo', 'Alu-alu Besar (Barracuda)', 'Wahoo'],
    optimalSeason: 'Sepanjang Musim Angin Barat Daya & Peralihan',
    status: 'Front Aktif Kuat',
    description: 'Satelit Sentinel-3 mendeteksi tingginya pigmen fitoplankton (klorofil-a) di perairan terbuka Bintan Utara. Arus upwelling lokal mengangkat nutrien dari palung 60 meter memicu perburuan mangsa pelagis pelari cepat.'
  },
  {
    id: 'front-selat-singapura-timur',
    name: 'Drop-off Thermal Selat Singapura Timur (Horsburgh)',
    lat: 1.2850,
    lng: 104.2200,
    mapX: 58,
    mapY: 12,
    sstCelsius: 29.1,
    chlorophyllMgM3: 0.68,
    frontGradient: 'ΔT = 0.55°C / NM',
    pelagicTargets: ['Tenggiri Batang', 'Kuwe Lilin / GT', 'Talang-talang Super'],
    optimalSeason: 'Saat air pasang perbani ke purnama',
    status: 'Front Sedang',
    description: 'Batas tubiran dalam antara perairan dangkal Nongsa Batam dan koridor kapal Selat Singapura. Perubahan suhu mendadak memandu kawanan tenggiri berpatroli menyusuri garis kontur.'
  },
  {
    id: 'front-dedap-galang',
    name: 'Selat Dempo & Pulau Dedap (Batam Selatan)',
    lat: 0.5400,
    lng: 104.2800,
    mapX: 68,
    mapY: 90,
    sstCelsius: 28.8,
    chlorophyllMgM3: 0.82,
    frontGradient: 'ΔT = 0.61°C / NM',
    pelagicTargets: ['Kakap Merah Dalam', 'Kerapu Sunu', 'Tenggiri Papan'],
    optimalSeason: 'Pagi subuh saat pergantian arus pasang',
    status: 'Front Sedang',
    description: 'Kawasan terumbu karang terluar Batam Selatan. Air jernih bertemperatur stabil 28.8°C menciptakan habitat ideal bagi ikan karang bernilai tinggi dan pelagis pesisir.'
  }
];

export const SatelliteSSTChlorophyll: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'sst' | 'chlorophyll' | 'fronts'>('sst');
  const [selectedFront, setSelectedFront] = useState<ThermalFrontSpot>(THERMAL_FRONT_SPOTS[0]);
  const [probeData, setProbeData] = useState<{ x: number; y: number; temp: number; chl: number } | null>(null);

  // Handle probe simulation when hovering/clicking the map
  const handleMapProbe = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const yPct = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    // Approximate temperature & chlorophyll gradient formula based on coordinates
    // Eastern waters (closer to open South China Sea) are cooler (28.2°C - 28.7°C), coastal Batam is warmer (29.8°C - 30.4°C)
    const baseTemp = 30.2 - (xPct / 100) * 1.8 + Math.sin(yPct * 0.1) * 0.4;
    const baseChl = 0.35 + (xPct / 100) * 0.75 + (yPct > 60 ? 0.3 : 0.1);

    setProbeData({
      x: xPct,
      y: yPct,
      temp: Math.round(baseTemp * 10) / 10,
      chl: Math.round(baseChl * 100) / 100
    });
  };

  return (
    <div id="sst-section" className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden mb-8">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Satellite className="h-3.5 w-3.5" />
            <span>SATELIT MODIS (AQUA/TERRA) & SENTINEL-3 (SLSTR/OLCI)</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Peta Suhu Permukaan Laut (SST), Klorofil-a & Deteksi Thermal Front
          </h2>
        </div>

        {/* Layer Selector Switches */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveLayer('sst')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeLayer === 'sst' 
                ? 'bg-gradient-to-r from-blue-600 to-amber-600 text-white font-semibold shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Suhu Laut (SST)
          </button>
          <button
            onClick={() => setActiveLayer('chlorophyll')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeLayer === 'chlorophyll' 
                ? 'bg-emerald-600 text-white font-semibold shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Klorofil-a Fitoplankton
          </button>
          <button
            onClick={() => setActiveLayer('fronts')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeLayer === 'fronts' 
                ? 'bg-cyan-500 text-slate-950 font-bold shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Deteksi Thermal Front
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Interactive Satellite Viewport Stage */}
        <div className="lg:col-span-8 bg-slate-950 relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
          <svg
            viewBox="0 0 800 650"
            className="w-full h-full max-w-[850px] cursor-crosshair select-none"
            onClick={handleMapProbe}
            onMouseMove={handleMapProbe}
          >
            <defs>
              {/* Thermal SST Gradient Pattern */}
              <radialGradient id="sstHeatmap" cx="70%" cy="30%" r="85%">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.9" /> {/* Cold 28.2°C Natuna */}
                <stop offset="35%" stopColor="#0284c7" stopOpacity="0.85" /> {/* 28.8°C */}
                <stop offset="65%" stopColor="#d97706" stopOpacity="0.75" /> {/* 29.8°C */}
                <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.85" /> {/* 30.6°C Coastal */}
              </radialGradient>

              {/* Chlorophyll-a Gradient Pattern */}
              <radialGradient id="chlHeatmap" cx="65%" cy="35%" r="80%">
                <stop offset="0%" stopColor="#047857" stopOpacity="0.9" /> {/* High Chl 1.2 mg/m3 */}
                <stop offset="40%" stopColor="#10b981" stopOpacity="0.8" /> {/* 0.8 mg/m3 */}
                <stop offset="70%" stopColor="#0284c7" stopOpacity="0.7" /> {/* 0.4 mg/m3 */}
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.85" /> {/* Low 0.2 mg/m3 */}
              </radialGradient>

              {/* Front Pulse Marker */}
              <filter id="glowFront" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Sea Layer tinted with selected satellite product */}
            <rect
              width="800"
              height="650"
              fill={activeLayer === 'chlorophyll' ? 'url(#chlHeatmap)' : 'url(#sstHeatmap)'}
            />

            {/* Thermal Front Isolines & Pelagic Migration Highway */}
            {(activeLayer === 'fronts' || activeLayer === 'sst') && (
              <g className="pointer-events-none">
                {/* Outer front line (Karang Galang - Natuna corridor) */}
                <path
                  d="M 580 80 Q 640 280 660 480 Q 670 560 630 630"
                  stroke="#22d3ee"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  fill="none"
                  filter="url(#glowFront)"
                  className="animate-pulse"
                />
                <text x="610" y="320" fill="#22d3ee" fontSize="11" fontWeight="bold" fontFamily="monospace" transform="rotate(80, 610, 320)">
                  THERMAL FRONT (ΔT &gt; 0.8°C) · JALUR LEMADANG & TUNA
                </text>

                {/* Northern Bintan Front */}
                <path
                  d="M 540 60 Q 660 70 760 110"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                  fill="none"
                />
                <text x="590" y="55" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  ZONA UPWELLING BINTAN UTARA
                </text>

                {/* Pelagic Migration Vector Arrows */}
                <path
                  d="M 720 180 L 670 290 L 640 430"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <text x="680" y="240" fill="#fbbf24" fontSize="9" fontFamily="monospace">
                  MIGRASI MAHI-MAHI →
                </text>
              </g>
            )}

            {/* Chlorophyll Phytoplankton Bloom Highlight Zones */}
            {activeLayer === 'chlorophyll' && (
              <g className="pointer-events-none opacity-40">
                <ellipse cx="640" cy="220" rx="90" ry="70" fill="#84cc16" />
                <ellipse cx="680" cy="460" rx="75" ry="60" fill="#a3e635" />
                <text x="600" y="225" fill="#14532d" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  BLOOM FITOPLANKTON 1.2 mg/m³
                </text>
              </g>
            )}

            {/* Landmass Outlines (Batam, Rempang, Galang, Bintan) */}
            <g stroke="#334155" strokeWidth="2" fill="#0f172a" opacity="0.95">
              {/* Singapore Coast */}
              <path d="M 50 10 Q 250 30 450 15 L 750 5 L 750 0 L 50 0 Z" />

              {/* Bintan Coast */}
              <path d="M 680 120 Q 640 240 660 380 Q 690 480 720 620 L 800 620 L 800 120 Z" />
              <text x="700" y="290" fill="#64748b" fontSize="11" fontWeight="bold" transform="rotate(75, 700, 290)">
                PULAU BINTAN
              </text>

              {/* Batam Island */}
              <path d="M 230 180 Q 300 120 440 130 Q 510 145 540 180 Q 560 230 520 280 Q 500 320 460 330 Q 380 345 330 330 Q 280 320 250 260 Q 210 220 230 180 Z" />
              <text x="350" y="235" fill="#f8fafc" fontSize="14" fontWeight="bold" letterSpacing="1">
                P. BATAM
              </text>

              {/* Rempang & Galang */}
              <path d="M 385 375 Q 450 380 470 420 Q 480 470 430 490 Q 380 495 370 450 Q 360 410 385 375 Z" />
              <text x="400" y="440" fill="#94a3b8" fontSize="11" fontWeight="600">P. Rempang</text>

              <path d="M 435 520 Q 500 530 510 590 Q 470 630 420 620 Q 400 580 435 520 Z" />
              <text x="440" y="575" fill="#94a3b8" fontSize="10" fontWeight="600">Galang Baru</text>

              <ellipse cx="530" cy="610" rx="18" ry="12" />
              <text x="515" y="613" fill="#38bdf8" fontSize="8" fontWeight="bold">P. Abang</text>
            </g>

            {/* Clickable Thermal Front Hotspots */}
            {THERMAL_FRONT_SPOTS.map((spot) => {
              const isSelected = selectedFront.id === spot.id;
              const cx = (spot.mapX / 100) * 800;
              const cy = (spot.mapY / 100) * 650;

              return (
                <g
                  key={spot.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedFront(spot)}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 18 : 11}
                    className={`${isSelected ? 'fill-cyan-500/40 stroke-cyan-300 stroke-2 animate-ping' : 'fill-amber-500/20 stroke-amber-400 stroke-1'}`}
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 9 : 6}
                    fill={isSelected ? '#22d3ee' : '#f59e0b'}
                  />

                  {/* Marker label */}
                  <rect
                    x={cx + 12}
                    y={cy - 12}
                    width={spot.name.length * 5.6 + 14}
                    height="18"
                    rx="4"
                    fill="#020617"
                    stroke={isSelected ? '#22d3ee' : '#334155'}
                    strokeWidth="1"
                    className="opacity-95"
                  />
                  <text
                    x={cx + 18}
                    y={cy + 1}
                    fill={isSelected ? '#22d3ee' : '#e2e8f0'}
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

          {/* Color Scale Bar Legend */}
          <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-slate-950/85 backdrop-blur border border-slate-800 pointer-events-none text-xs font-mono">
            {activeLayer === 'sst' || activeLayer === 'fronts' ? (
              <div>
                <div className="text-[10px] text-slate-400 mb-1 flex items-center justify-between">
                  <span>SUHU PERMUKAAN LAUT (SST)</span>
                  <span className="text-cyan-400 font-bold">°CELSIUS</span>
                </div>
                <div className="h-3 w-48 rounded bg-gradient-to-r from-blue-700 via-cyan-500 via-amber-500 to-rose-600 mb-1" />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>28.0°C (Dingin/Natuna)</span>
                  <span>29.5°C</span>
                  <span>30.8°C (Hangat Pesisir)</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-[10px] text-slate-400 mb-1 flex items-center justify-between">
                  <span>KONSENTRASI KLOROFIL-A</span>
                  <span className="text-emerald-400 font-bold">mg/m³</span>
                </div>
                <div className="h-3 w-48 rounded bg-gradient-to-r from-slate-900 via-teal-600 via-emerald-500 to-lime-400 mb-1" />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0.2 mg/m³</span>
                  <span>0.6 mg/m³</span>
                  <span>1.2+ mg/m³ (Bloom Plankton)</span>
                </div>
              </div>
            )}
          </div>

          {/* Live Sensor Probe HUD */}
          {probeData && (
            <div className="absolute top-4 left-4 p-3 rounded-xl bg-slate-950/90 border border-cyan-800/80 pointer-events-none text-xs font-mono">
              <div className="text-[10px] text-cyan-400 font-bold flex items-center gap-1 mb-1">
                <Satellite className="h-3 w-3" />
                <span>SONDE PROBE KOORDINAT AKTIF</span>
              </div>
              <div className="text-white">
                Suhu SST: <strong className="text-cyan-300">{probeData.temp}°C</strong>
              </div>
              <div className="text-white">
                Klorofil-a: <strong className="text-emerald-300">{probeData.chl} mg/m³</strong>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {probeData.temp <= 28.8 ? '🌊 Zona Thermal Front Dingin (Pelagis Aktif)' : '☀️ Perairan Hangat Pesisir Batam'}
              </div>
            </div>
          )}
        </div>

        {/* Selected Front Inspection & Species Details */}
        <div className="lg:col-span-4 p-5 bg-slate-900 flex flex-col justify-between overflow-y-auto max-h-[520px]">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono text-cyan-400">DATA SATELIT SENTINEL-3</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 text-[10px] font-bold">
                {selectedFront.status}
              </span>
            </div>

            <h3 className="text-base font-bold text-white mb-2 leading-snug">
              {selectedFront.name}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {selectedFront.description}
            </p>

            {/* Front Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="text-slate-400 text-[10px] mb-0.5">SUHU LAUT (SST)</div>
                <div className="text-cyan-300 font-bold text-sm">{selectedFront.sstCelsius}°C</div>
                <div className="text-[10px] text-slate-500">Gradien {selectedFront.frontGradient}</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="text-slate-400 text-[10px] mb-0.5">KLOROFIL-A</div>
                <div className="text-emerald-300 font-bold text-sm">{selectedFront.chlorophyllMgM3} mg/m³</div>
                <div className="text-[10px] text-emerald-500">Bloom Fitoplankton Tinggi</div>
              </div>
            </div>

            {/* Target Pelagic Migrations */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                <span>Target Pelagis Besar di Garis Front Ini:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedFront.pelagicTargets.map((fish, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-200 border border-cyan-900/60 font-medium"
                  >
                    {fish}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs space-y-1.5 mb-4">
              <div className="font-semibold text-white">Musim Migrasi Paling Optimal:</div>
              <div className="text-slate-300 leading-normal">{selectedFront.optimalSeason}</div>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="pt-3 border-t border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 mb-2">PILIH TITIK FRONT LAINNYA:</div>
            <div className="grid grid-cols-2 gap-1.5">
              {THERMAL_FRONT_SPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedFront(spot)}
                  className={`text-left text-xs p-2 rounded transition-colors truncate border ${
                    selectedFront.id === spot.id 
                      ? 'bg-cyan-950/80 text-cyan-300 font-bold border-cyan-700' 
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border-slate-800'
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
