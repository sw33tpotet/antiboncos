import React from 'react';
import { Anchor, ArrowRight, BookOpen, CheckCircle2, Compass, Fish, HelpCircle, Layers, ShieldCheck, Waves, Wind } from 'lucide-react';
import { METHODOLOGY_EXPLANATION } from '../data/batamMarineData';

export const MethodologyExplainer: React.FC = () => {
  return (
    <div id="metodologi-section" className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden mb-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <BookOpen className="h-3.5 w-3.5" />
          <span>PANDUAN & METODOLOGI OSEANOGRAFI BATAM</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          {METHODOLOGY_EXPLANATION.title}
        </h2>

        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
          <CheckCircle2 className="h-4 w-4" />
          <span>{METHODOLOGY_EXPLANATION.canItBeDone}</span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {METHODOLOGY_EXPLANATION.summary}
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
        {METHODOLOGY_EXPLANATION.pillars.map((pillar, idx) => {
          const icons = [Waves, Anchor, Wind, Fish];
          const IconComponent = icons[idx] || Waves;
          const colors = ['text-cyan-400', 'text-blue-400', 'text-emerald-400', 'text-amber-400'];

          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${colors[idx]}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {pillar.title}
                  </h3>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                      Dasar Teori Sains & Maritim:
                    </span>
                    <p className="text-slate-400">
                      {pillar.science}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 font-mono text-[11px] text-cyan-200">
                    <span className="text-cyan-400 font-semibold block mb-0.5">Rumus / Parameter Algoritma:</span>
                    {pillar.formula}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-amber-300 font-semibold block mb-0.5">
                  Penerapan Praktis untuk Nelayan & Pemancing:
                </span>
                <p className="text-slate-400">
                  {pillar.localImpact}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Local Wisdom: Istilah Tradisional Maritim Nelayan Batam */}
      <div className="p-6 sm:p-8 bg-slate-950/40 border-t border-slate-800">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-cyan-400" />
          <span>Kamus & Kearifan Lokal Nelayan Batam / Kepulauan Riau</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="font-bold text-cyan-300 mb-1">Air Mati (Perbani)</div>
            <p className="text-slate-400 leading-relaxed">
              Kondisi saat bulan separuh. Pasang dan surut tidak jauh beda (arus pelan). Waktu terbaik mancing dasaran di Selat Riau dan Jembatan 1 Barelang karena umpan tidak terbawa arus.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="font-bold text-cyan-300 mb-1">Air Hidup (Purnama / Gelap)</div>
            <p className="text-slate-400 leading-relaxed">
              Terjadi saat bulan purnama atau bulan baru. Pasang sangat tinggi dan surut sangat jauh. Arus di selat sangat kencang (2-3.5 knot). Waktu terbaik berburu Tenggiri dan Talang-talang dengan teknik hanyut (drifting).
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="font-bold text-cyan-300 mb-1">Arus Makan (Arus Baru Jalan)</div>
            <p className="text-slate-400 leading-relaxed">
              Jeda waktu 1 jam setelah air tenang ketika air mulai bergerak pasang atau surut. Saat arus mulai bergerak, kawanan ikan kecil terseret arus dan memicu insting memangsa ikan predator secara serentak.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="font-bold text-cyan-300 mb-1">Lubuk & Palung Karang</div>
            <p className="text-slate-400 leading-relaxed">
              Cekungan dasar laut yang lebih dalam dari rata-rata sekelilingnya (drop-off). Tempat ikan kakap merah, siakap, dan kerapu berlindung dari derasnya arus sambil menyergap mangsa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
