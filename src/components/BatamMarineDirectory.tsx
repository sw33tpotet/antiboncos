import React from 'react';
import { Anchor, Compass, MapPin, Phone, Radio, Shield, ShoppingBag, Store } from 'lucide-react';

export const BatamMarineDirectory: React.FC = () => {
  const piers = [
    {
      name: 'Dermaga Pompong Jembatan 1 Barelang',
      location: 'Sisi Bawah Jembatan Fisabilillah (Tembesi)',
      contact: 'Sewa Pompong Nelayan & Kelong Harian',
      notes: 'Titik kumpul utama perahu sewaan ke pilar jembatan 1-3 dan pulau-pulau dalam.'
    },
    {
      name: 'Dermaga Teluk Mata Ikan & Nongsa Pantai',
      location: 'Nongsa, Batam Timur',
      contact: 'Pompong Selat Singapura & Karang Galang',
      notes: 'Pintu gerbang pemburu Tenggiri dan Alu-alu menuju Selat Singapura luar.'
    },
    {
      name: 'Pelabuhan Rakyat Teluk Nipah (Punggur)',
      location: 'Punggur, Dekat Pelabuhan Roro',
      contact: 'Sewa Speedboat & Pompong Selat Riau',
      notes: 'Akses tercepat menuju Karang Heluput dan jalur pelagis Selat Riau.'
    },
    {
      name: 'Dermaga Kampung Laut Piayu Laut',
      location: 'Sei Beduk, Batam',
      contact: 'Pompong Kelong & Teluk Lengung',
      notes: 'Spot ramah keluarga, dekat restoran seafood terapung dan puluhan kelong apung.'
    }
  ];

  const baitShops = [
    {
      name: 'Umpan Udang Hidup Pak Buyung Barelang',
      type: 'Udang Sungut & Udang Lipan',
      location: 'Jl. Trans Barelang Km 2 (Sebelum Jembatan 1)',
      price: 'Rp 1.000 - Rp 1.500 / ekor'
    },
    {
      name: 'Kios Umpan Pumpun (Cacing Laut) Sekupang',
      type: 'Pumpun Segar & Cacing Bakau',
      location: 'Dekat Pelabuhan Domestik Sekupang',
      price: 'Rp 15.000 / bungkus'
    },
    {
      name: 'Kios Ikan Tamban & Selar Segar Punggur',
      type: 'Ikan Umpan Hanyut (Live Drift)',
      location: 'Pasar Ikan Punggur',
      price: 'Tersedia pagi subuh jam 05:00'
    }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden mb-8">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Anchor className="h-3.5 w-3.5" />
            <span>DIREKTORI NELAYAN & LOGISTIK MANCING BATAM</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Dermaga Pompong, Penjual Umpan Hidup & Kontak Darurat SAR
          </h2>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          PANDUAN LAPANGAN KEPULAUAN RIAU
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Section 1: Emergency Contacts Bar */}
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs">
          <div className="flex items-center gap-2 text-rose-400 font-bold mb-2">
            <Radio className="h-4 w-4" />
            <span>KONTAK RADIO MARITIM & PENYELAMATAN DARURAT (EMERGENCY SAR)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-slate-300">
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px]">RADIO VHF MARITIM</div>
              <div className="text-white font-bold text-sm">Channel 16 (156.8 MHz)</div>
              <div className="text-slate-400 text-[10px]">Kanal Bahaya Internasional</div>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px]">BASARNAS KEPRI (BATAM)</div>
              <div className="text-cyan-300 font-bold text-sm">115 / (0778) 463399</div>
              <div className="text-slate-400 text-[10px]">Operasional Siaga 24 Jam</div>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px]">DITPOLAIRUD POLDA KEPRI</div>
              <div className="text-amber-300 font-bold text-sm">(0778) 321855</div>
              <div className="text-slate-400 text-[10px]">Patroli Perairan Batam</div>
            </div>
          </div>
        </div>

        {/* Section 2: Piers & Rental Boats Grid */}
        <div>
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <span>Pangkalan Dermaga Pompong & Titik Berangkat Mancing</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {piers.map((pier, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="font-bold text-white mb-1">{pier.name}</div>
                <div className="text-cyan-400 font-mono text-[11px] mb-1.5">{pier.location}</div>
                <p className="text-slate-400 leading-relaxed">{pier.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Live Bait Suppliers */}
        <div>
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-amber-400" />
            <span>Sentra Umpan Hidup (Udang Sungut, Pumpun & Ikan Umpan)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {baitShops.map((shop, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-white mb-1">{shop.name}</div>
                <div className="text-amber-400 font-mono text-[11px] mb-1">{shop.type}</div>
                <div className="text-slate-400 text-[11px] mb-1">{shop.location}</div>
                <div className="text-slate-300 font-semibold text-[11px] bg-slate-900 p-1.5 rounded text-center">
                  {shop.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
