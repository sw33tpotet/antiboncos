import React, { useState, useMemo } from 'react';
import { Calendar, Moon, Sparkles, Waves, Info, Shield, Compass, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface TidalDay {
  hijriDay: number;
  date: Date;
  phaseType: 'air-mati' | 'air-hidup' | 'air-bunga';
  phaseName: string;
  subTitle: string;
  moonName: string;
  moonIcon: string;
  currentStrength: string;
  tideRangeMeters: string;
  primaryTarget: string[];
  recommendedTechnique: string;
  bestBait: string;
  melayuWisdom: string;
  ratingStars: number;
}

// Generate the 30-day lunar cycle mapping aligned with Malay Batam maritime traditions
function getTidalWisdomForDay(hijriDay: number, date: Date): TidalDay {
  // Cycle classification based on Riau Archipelago maritime wisdom:
  // - Air Kancing / Air Mati: Hari ke 7, 8, 9, 10 & 21, 22, 23, 24
  // - Air Besar / Air Hidup: Hari ke 13, 14, 15, 16, 17 & 28, 29, 30, 1, 2
  // - Air Bunga / Air Peralihan: Hari ke 3, 4, 5, 6 & 11, 12 & 18, 19, 20 & 25, 26, 27
  
  if ((hijriDay >= 7 && hijriDay <= 10) || (hijriDay >= 21 && hijriDay <= 24)) {
    return {
      hijriDay,
      date,
      phaseType: 'air-mati',
      phaseName: 'Air Kancing / Air Mati (Perbani)',
      subTitle: 'Arus Lambat & Tenang — Waktu Emas Lubuk Karang & Kelong',
      moonName: hijriDay <= 10 ? 'Bulan Paruh Awal (First Quarter)' : 'Bulan Paruh Akhir (Last Quarter)',
      moonIcon: '🌓',
      currentStrength: 'Sangat Tenang (0.3 - 0.9 Knot)',
      tideRangeMeters: '0.8 - 1.2 Meter (Pasang Rendah)',
      primaryTarget: ['Kerapu Macan / Lumpur', 'Kakap Merah / Jenahak', 'Cumi-cumi Torak Kelong', 'Ikan Sembilang', 'Pari Pasir'],
      recommendedTechnique: 'Dasaran glosor timah kecil (J1-J2), mancing pelampung tidak hanyut, dan ngoncer cumi lampu kelong.',
      bestBait: 'Udang hidup sungut, cacing laut (pumpun), umpan cumi iris segar.',
      melayuWisdom: 'Saat air kancing laut berteduh, umpan jatuh tegak ke pintu lubuk batu. Ikan karang keluar dari persembunyian mencari makan tanpa lelah melawan arus selat.',
      ratingStars: 5,
    };
  } else if ((hijriDay >= 13 && hijriDay <= 17) || hijriDay >= 28 || hijriDay <= 2) {
    const isPurnama = hijriDay >= 13 && hijriDay <= 17;
    return {
      hijriDay,
      date,
      phaseType: 'air-hidup',
      phaseName: 'Air Besar / Air Hidup (Purnama / Tilem)',
      subTitle: 'Arus Kencang Bergolak — Waktu Emas Predator Pelagis',
      moonName: isPurnama ? 'Bulan Purnama Penuh (Full Moon)' : 'Bulan Mati / Gelap (New Moon)',
      moonIcon: isPurnama ? '🌕' : '🌑',
      currentStrength: 'Sangat Kencang (2.4 - 3.8 Knot)',
      tideRangeMeters: '2.8 - 3.4 Meter (Pasang Maksimal)',
      primaryTarget: ['Tenggiri Batang Melayu', 'Ikan Talang-talang', 'Alu-alu / Barracuda', 'Kuwe GT (Giant Trevally)', 'Kakap Putih (Siakap)'],
      recommendedTechnique: 'Drift live-bait ikan tamban hanyut dengan pelampung balon, speed jigging di tubiran pulau luar, atau casting muara jembatan.',
      bestBait: 'Ikan tamban hidup utuh, selar segar, minnow rapala perak, metal jig 80-120g.',
      melayuWisdom: 'Air hidup mengaduk selat, kawanan ikan kecil hanyut linglung. Predator pelagis berpatroli di bibir tubiran menyambar apa saja yang terbawa pusaran arus.',
      ratingStars: 5,
    };
  } else {
    return {
      hijriDay,
      date,
      phaseType: 'air-bunga',
      phaseName: 'Air Bunga / Air Olak (Peralihan)',
      subTitle: 'Arus Sedang & Stabil — Waktu Mancing Segala Teknik',
      moonName: hijriDay < 14 ? 'Bulan Sabit Menuju Purnama' : 'Bulan Susut Menuju Gelap',
      moonIcon: '🌔',
      currentStrength: 'Sedang (1.0 - 1.8 Knot)',
      tideRangeMeters: '1.6 - 2.2 Meter',
      primaryTarget: ['Kakap Putih', 'Baronang Angin / Susu', 'Ikan Daun Baru', 'Kerapu Karang', 'Ebek / Kuwe Lilin'],
      recommendedTechnique: 'Dasaran timah sedang (J3-J4) di balik tiang jembatan Barelang, garong baronang umpan lumut/nasi, dan casting pinggir karang.',
      bestBait: 'Udang api-api hidup, kepiting batu kecil, lumut karang, udang kupas.',
      melayuWisdom: 'Air bunga adalah sahabat segala pemancing. Arus tidak terlalu deras untuk timah dasaran, namun air tetap mengalir membawa aroma umpan jauh ke dalam celah batu.',
      ratingStars: 4,
    };
  }
}

export const TidalWisdomCalendar: React.FC = () => {
  // Lunar date estimate relative to current date (standard 29.53 day lunar synodic cycle)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(7); // Default to Air Kancing day for illustration

  // Generate 15 consecutive days starting around current date
  const calendarDays = useMemo(() => {
    const list: TidalDay[] = [];
    const baseDate = new Date();
    // Synodic reference anchor
    const knownNewMoon = new Date('2026-09-11T00:00:00Z').getTime();
    
    for (let offset = -7; offset <= 14; offset++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + offset);
      const diffDays = (d.getTime() - knownNewMoon) / (1000 * 60 * 60 * 24);
      let hijri = Math.floor((diffDays % 29.530588) + 1);
      if (hijri <= 0) hijri += 30;
      if (hijri > 30) hijri = 30;
      list.push(getTidalWisdomForDay(hijri, d));
    }
    return list;
  }, []);

  const activeDay = calendarDays[selectedDayIndex] || calendarDays[7];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden mb-8 shadow-xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Moon className="h-3.5 w-3.5" />
            <span>PETUA & PENANGGALAN BULAN MARITIM KEPULAUAN RIAU</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Kalender Pasang Kancing / Air Mati vs Air Hidup
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Panduan kearifan lokal nelayan Melayu Batam membaca perilaku arus & nafsu makan ikan berdasarkan siklus peredaran bulan.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300 self-start sm:self-auto">
          <span>AIR AKTIF:</span>
          <span className={`font-bold ${
            activeDay.phaseType === 'air-mati' 
              ? 'text-emerald-400' 
              : activeDay.phaseType === 'air-hidup' 
              ? 'text-cyan-400' 
              : 'text-amber-400'
          }`}>
            {activeDay.phaseName.split('(')[0]}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Horizontal Calendar Ribbon */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-cyan-400" />
              <span>Pilih Tanggal Penangkapan (Klik untuk melihat analisis petua nelayan):</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Menampilkan {calendarDays.length} Hari Berjalan
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {calendarDays.map((day, idx) => {
              const isSelected = idx === selectedDayIndex;
              const isAirMati = day.phaseType === 'air-mati';
              const isAirHidup = day.phaseType === 'air-hidup';

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`flex-shrink-0 w-24 p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400/50'
                      : isAirMati
                      ? 'border-emerald-900/60 bg-emerald-950/10 hover:border-emerald-600/50'
                      : isAirHidup
                      ? 'border-cyan-900/60 bg-cyan-950/10 hover:border-cyan-600/50'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    {day.date.toLocaleDateString('id-ID', { weekday: 'short' })}
                  </div>
                  <div className="text-sm font-bold text-white my-0.5">
                    {day.date.getDate()} {day.date.toLocaleDateString('id-ID', { month: 'short' })}
                  </div>
                  <div className="text-base my-0.5" title={day.moonName}>
                    {day.moonIcon}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Hari ke-{day.hijriDay}
                  </div>
                  <div className={`mt-1.5 px-1 py-0.5 text-[9px] font-bold rounded ${
                    isAirMati
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                      : isAirHidup
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60'
                      : 'bg-amber-950 text-amber-300 border border-amber-800/60'
                  }`}>
                    {isAirMati ? 'AIR MATI' : isAirHidup ? 'AIR BESAR' : 'AIR BUNGA'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Spotlight Card */}
        <div className={`rounded-xl border p-5 transition-colors ${
          activeDay.phaseType === 'air-mati'
            ? 'border-emerald-500/30 bg-emerald-950/20'
            : activeDay.phaseType === 'air-hidup'
            ? 'border-cyan-500/30 bg-cyan-950/20'
            : 'border-amber-500/30 bg-amber-950/20'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <span>FASE BULAN HARI KE-{activeDay.hijriDay} QOMARIYAH</span>
                <span aria-hidden="true">·</span>
                <span className="text-white font-semibold">{activeDay.moonName}</span>
              </div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{activeDay.phaseName}</span>
                <span className="text-2xl">{activeDay.moonIcon}</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {activeDay.subTitle}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <div className="px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center min-w-[120px]">
                <div className="text-[10px] text-slate-400 font-mono">KEKUATAN ARUS</div>
                <div className="text-xs font-bold text-white mt-0.5">{activeDay.currentStrength}</div>
              </div>
              <div className="px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center min-w-[120px]">
                <div className="text-[10px] text-slate-400 font-mono">RENTANG PASANG</div>
                <div className="text-xs font-bold text-cyan-300 mt-0.5">{activeDay.tideRangeMeters}</div>
              </div>
            </div>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Target Ikan Paling Potensial */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800">
              <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Target Ikan Paling Potensial</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {activeDay.primaryTarget.map((fish, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>{fish}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rekomendasi Teknik & Umpan */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800">
              <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
                <Compass className="h-4 w-4 text-cyan-400" />
                <span>Teknik & Umpan Terbaik</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block font-mono">TEKNIK OLAHAN:</span>
                  <span className="text-slate-200">{activeDay.recommendedTechnique}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block font-mono">UMPAN PALING JITU:</span>
                  <span className="text-emerald-300 font-medium">{activeDay.bestBait}</span>
                </div>
              </div>
            </div>

            {/* Petua & Filosofi Nelayan Melayu */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
                  <Award className="h-4 w-4 text-rose-400" />
                  <span>Petua & Kearifan Nelayan Melayu</span>
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{activeDay.melayuWisdom}"
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
                Sumber: Tradisi Lisan Nelayan Pulau Kasu & Belakang Padang
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Summary Legend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/40">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>AIR KANCING / AIR MATI (Hari 7–10 & 21–24)</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Arus perbani sangat pelan. Timah dasaran nomor kecil tidak terangkat arus. Sangat cocok untuk mancing dasar karang, kelong cumi malam hari, dan mancing santai keluarga.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-cyan-900/40">
            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>AIR BESAR / AIR HIDUP (Hari 13–17 & 28–2)</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Pasang tertinggi & surut terendah. Arus selat kencang berputar memicu predator pelagis (Tenggiri, Talang-talang) aktif memangsa di permukaan dan tubiran karang.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-amber-900/40">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span>AIR BUNGA / AIR OLAK (Hari 3–6 & 11–12)</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Periode transisi arus stabil. Waktu paling fleksibel untuk mencoba berbagai teknik: dasaran tiang Barelang, casting muara, atau garong baronang di dermaga.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
