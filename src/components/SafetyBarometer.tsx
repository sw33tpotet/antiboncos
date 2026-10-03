import React from 'react';
import { AlertTriangle, CheckCircle, Navigation, ShieldAlert, Waves, Wind } from 'lucide-react';
import { TidePoint, WeatherCondition } from '../types/marine';
import boatFishingImg from '../assets/images/barelang_marine_fishing_1791032089453.jpg';

interface SafetyBarometerProps {
  currentPoint: TidePoint;
  weather: WeatherCondition;
}

export const SafetyBarometer: React.FC<SafetyBarometerProps> = ({ currentPoint, weather }) => {
  const currentSpeed = currentPoint.currentSpeedKnots;
  const windSpeed = currentPoint.windSpeedKnots;
  const waveHeight = currentPoint.waveHeightMeters;

  // Determine safety status for small fishing boats (pompong)
  const isPompongSafe = windSpeed <= 14 && waveHeight <= 0.8 && currentSpeed <= 2.2;
  const isPompongWarning = !isPompongSafe && (windSpeed <= 18 && waveHeight <= 1.2);
  const pompongStatus = isPompongSafe 
    ? 'Aman Melaut' 
    : isPompongWarning 
    ? 'Waspada Arus & Gelombang' 
    : 'Tidak Disarankan Melaut';

  // Determine safety status for speedboats / modern fishing boats
  const isSpeedboatSafe = windSpeed <= 20 && waveHeight <= 1.3;
  const speedboatStatus = isSpeedboatSafe ? 'Aman Berlayar' : 'Waspada Gelombang Tinggi';

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>STANDAR KESELAMATAN MARITIM & KELAUTAN</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Barometer Keselamatan Berlayar & Mancing Perairan Batam
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span>MONSUN:</span>
          <span className="text-emerald-400 font-semibold">{weather.monsoonPeriod}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column: Traditional Pompong Boat photo & Batam Specific Hazards */}
        <div className="lg:col-span-5 relative min-h-[240px] overflow-hidden flex flex-col justify-end p-6 border-b lg:border-b-0 lg:border-r border-slate-800">
          <img
            src={boatFishingImg}
            alt="Perahu Pompong Nelayan Batam Barelang"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

          <div className="relative z-10">
            <div className="text-xs font-mono text-cyan-400 mb-1">KAPAL TRADISIONAL & SPORTFISHING</div>
            <h3 className="text-base font-bold text-white mb-2">
              Karakteristik Jalur Pelayaran & Bahaya Khusus Batam
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong className="text-white">Alur Selat Singapura (TSS):</strong> Jalur kapal kargo raksasa & tanker internasional. Dilarang jangkar di alur utama pemisah lalu lintas.</li>
              <li><strong className="text-white">Pilar Jembatan Barelang:</strong> Arus pasang surut dapat membentuk pusaran air kuat (eddy current). Jaga jarak aman minimal 15 meter dari tiang beton.</li>
              <li><strong className="text-white">Sumatra Squall (Angin Ribut Mendadak):</strong> Angin kencang tiba-tiba yang sering melanda saat fajar atau sore di Selat Malaka/Batam barat.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Fleet Status Matrix & Weather Values */}
        <div className="lg:col-span-7 p-5 bg-slate-900/50 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Status Perahu Pompong (<5 GT) */}
            <div className={`p-4 rounded-xl border ${
              isPompongSafe 
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                : isPompongWarning 
                ? 'bg-amber-950/20 border-amber-500/40 text-amber-300' 
                : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                  Perahu Pompong Nelayan (&lt; 5 GT)
                </span>
                {isPompongSafe ? (
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                )}
              </div>
              <div className="text-lg font-bold text-white mb-1">
                {pompongStatus}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isPompongSafe 
                  ? 'Kondisi angin dan gelombang sangat ideal untuk perahu kayu tradisional mencari ikan di perairan selat dalam dan pinggiran.'
                  : isPompongWarning 
                  ? 'Gunakan jaket pelampung (life jacket). Hindari melintasi selat terbuka saat arus sedang puncak.'
                  : 'Gelombang dan arus melebihi batas toleransi perahu pompong kecil. Disarankan menunggu arus mereda.'}
              </p>
            </div>

            {/* Status Speedboat / Mancing Sport (5 - 10 GT) */}
            <div className={`p-4 rounded-xl border ${
              isSpeedboatSafe 
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                : 'bg-amber-950/20 border-amber-500/40 text-amber-300'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
                  Speedboat / Sportfishing (5-10 GT)
                </span>
                <CheckCircle className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-lg font-bold text-white mb-1">
                {speedboatStatus}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mesin tempel bertenaga mampu mengatasi arus selat hingga 3.5 knot. Aman untuk menembus spot luar Pulau Abang, Nongsa, dan Karang Heluput.
              </p>
            </div>
          </div>

          {/* Current Parameter Checklist */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-slate-400 text-[10px]">KECEPATAN ANGIN</div>
              <div className="text-white font-bold text-sm mt-0.5">{currentPoint.windSpeedKnots} KNOT</div>
              <div className="text-emerald-400 text-[10px]">Normal</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">HEMBUSAN (GUSTS)</div>
              <div className="text-white font-bold text-sm mt-0.5">{weather.windGustKnots} KNOT</div>
              <div className="text-slate-400 text-[10px]">Maksimum</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">TINGGI GELOMBANG</div>
              <div className="text-white font-bold text-sm mt-0.5">{currentPoint.waveHeightMeters} M</div>
              <div className="text-cyan-400 text-[10px]">Tenang</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">SUHU AIR LAUT</div>
              <div className="text-white font-bold text-sm mt-0.5">{weather.waterTempCelsius}°C</div>
              <div className="text-cyan-400 text-[10px]">Optimal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
