import React, { useState } from 'react';
import { Anchor, Award, CheckCircle2, ChevronRight, Compass, HelpCircle, Layers, Sparkles, Wrench } from 'lucide-react';

interface RigPreset {
  id: string;
  name: string;
  subName: string;
  targetFish: string;
  bestSpot: string;
  currentTolerance: string;
  mainline: string;
  leader: string;
  sinker: string;
  hook: string;
  bait: string;
  proTips: string;
  diagramSvg: React.ReactNode;
}

interface KnotPreset {
  id: string;
  name: string;
  alias: string;
  strengthPercent: number;
  difficulty: 'Mudah' | 'Sedang' | 'Mahir';
  purpose: string;
  steps: string[];
  batamApplication: string;
}

export const BatamRigSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rangkaian' | 'simpul'>('rangkaian');
  const [selectedRigId, setSelectedRigId] = useState<string>('glosor-barelang');
  const [selectedKnotId, setSelectedKnotId] = useState<string>('fg-knot');

  const rigPresets: RigPreset[] = [
    {
      id: 'glosor-barelang',
      name: 'Rangkaian Dasaran Glosor Barelang (Sliding Sinker)',
      subName: 'Spesialis Tiang Jembatan 1-6 Barelang & Karang Teritip',
      targetFish: 'Kakap Putih (Siakap), Kerapu Macan, Pari Pasir',
      bestSpot: 'Pilar Jembatan Barelang, Tubiran Pulau Dedap, Teluk Piayu',
      currentTolerance: 'Arus 1.0 - 2.5 Knot (Timah J3 - J6)',
      mainline: 'PE Braid 2.0 - 3.0 (30 - 40 Lbs)',
      leader: 'Fluorocarbon 40 - 50 Lbs (Panjang 80 - 120 cm tahan gesek teritip)',
      sinker: 'Timah Lubang / Timah Melinjo (Sliding bebas pada tali utama)',
      hook: 'Chinu No. 6-8 atau Live Bait Hook 2/0 - 3/0',
      bait: 'Udang hidup sungut (dikaitkan di ruas ekor terakhir atau tanduk kepala)',
      proTips: 'Gunakan manik-manik karet (rubber bead) di antara timah dan kili-kili agar simpul tidak remuk saat timah membentur dasar karang tiang jembatan.',
      diagramSvg: (
        <svg viewBox="0 0 420 180" className="w-full h-auto">
          {/* Mainline */}
          <line x1="20" y1="90" x2="110" y2="90" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="25" y="80" fill="#38bdf8" fontSize="10" fontFamily="monospace">Tali PE Utama</text>
          
          {/* Sliding Sinker */}
          <ellipse cx="120" cy="90" rx="14" ry="18" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="120" y="125" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontFamily="monospace">Timah Bolong</text>

          {/* Rubber Bead */}
          <circle cx="145" cy="90" r="5" fill="#f43f5e" />
          <text x="145" y="78" fill="#f43f5e" fontSize="8" textAnchor="middle">Bead</text>

          {/* Swivel */}
          <rect x="158" y="86" width="16" height="8" rx="2" fill="#d97706" />
          <circle cx="158" cy="90" r="3" fill="none" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="174" cy="90" r="3" fill="none" stroke="#d97706" strokeWidth="1.5" />
          <text x="166" y="125" fill="#fbbf24" fontSize="9" textAnchor="middle" fontFamily="monospace">Kili-kili</text>

          {/* Leader Fluorocarbon */}
          <line x1="178" y1="90" x2="330" y2="90" stroke="#10b981" strokeWidth="2" strokeDasharray="6 2" />
          <text x="250" y="80" fill="#34d399" fontSize="10" textAnchor="middle" fontFamily="monospace">Leader Fluorocarbon 40 Lbs (100 cm)</text>

          {/* Hook & Live Shrimp Bait */}
          <path d="M 330,90 Q 355,90 355,108 Q 355,122 342,122 Q 332,122 334,112" fill="none" stroke="#f1f5f9" strokeWidth="2" />
          <text x="365" y="105" fill="#ffffff" fontSize="10" fontWeight="bold">Kail 2/0</text>
          <text x="365" y="120" fill="#a7f3d0" fontSize="9">Udang Hidup</text>
        </svg>
      )
    },
    {
      id: 'hanyut-tenggiri',
      name: 'Rangkaian Live Drift Tenggiri (Balon & Wire Leader)',
      subName: 'Spesialis Jalur Pelagis Selat Riau (Punggur) & Karang Heluput',
      targetFish: 'Tenggiri Batang Melayu, Talang-talang, Alu-alu / Barracuda',
      bestSpot: 'Jalur Arus Selat Punggur, Tubiran Nongsa, Karang Galang',
      currentTolerance: 'Arus 1.5 - 3.5 Knot (Hanyut bebas mengikuti arus)',
      mainline: 'PE Braid 2.5 - 4.0 (40 - 50 Lbs)',
      leader: 'Neklin / Kawat Baja (Steel Wire 7-Strand) No. 4 - 6 (Panjang 30 cm) + Shock Leader 50 Lbs',
      sinker: 'Tanpa timah (Bebas) atau timah lipat kecil 10 gram jika arus sangat deras',
      hook: 'Tandem Hook (Kail Depan No. 1/0 di hidung + Kail Belakang Treble No. 4 di punggung/ekor)',
      bait: 'Ikan Tamban segar hidup atau Ikan Selar hidup',
      proTips: 'Gigi tenggiri berbentuk pisau segitiga yang memotong benang nilon dalam sekejap. Selalu pasang kawat neklin minimal 25 cm sebelum kail.',
      diagramSvg: (
        <svg viewBox="0 0 420 180" className="w-full h-auto">
          {/* Mainline */}
          <line x1="20" y1="90" x2="100" y2="90" stroke="#38bdf8" strokeWidth="2.5" />
          
          {/* Balloon Float */}
          <circle cx="110" cy="50" r="18" fill="#ec4899" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="110" y1="68" x2="110" y2="90" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
          <text x="110" y="30" fill="#f472b6" fontSize="9" textAnchor="middle" fontFamily="monospace">Pelampung Balon</text>

          {/* Swivel */}
          <rect x="150" y="86" width="16" height="8" rx="2" fill="#d97706" />
          <text x="158" y="120" fill="#fbbf24" fontSize="9" textAnchor="middle">Swivel</text>

          {/* Shock Leader */}
          <line x1="168" y1="90" x2="260" y2="90" stroke="#10b981" strokeWidth="2" />
          <text x="210" y="80" fill="#34d399" fontSize="9" textAnchor="middle">Mono 50 Lb</text>

          {/* Wire Leader */}
          <line x1="262" y1="90" x2="340" y2="90" stroke="#94a3b8" strokeWidth="2.5" />
          <text x="300" y="80" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontWeight="bold">Kawat Neklin 30cm</text>

          {/* Tandem Hook & Tamban Bait */}
          <circle cx="345" cy="90" r="3" fill="#f59e0b" />
          <path d="M 345,90 Q 360,90 360,102 Q 360,112 352,112" fill="none" stroke="#f1f5f9" strokeWidth="1.8" />
          <line x1="345" y1="90" x2="385" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M 385,90 Q 395,90 395,102 Q 395,110 390,110" fill="none" stroke="#f43f5e" strokeWidth="2" />
          <text x="370" y="130" fill="#fecdd3" fontSize="9" textAnchor="middle" fontWeight="bold">Tandem Hook Umpan Tamban</text>
        </svg>
      )
    },
    {
      id: 't-knot-ganda',
      name: 'Rangkaian Kumis Ganda Dasaran (Double Dropper T-Knot)',
      subName: 'Spesialis Ikan Karang Dasar & Karang Piring',
      targetFish: 'Kakap Merah (Jenahak), Kerapu Lumpur, Baronang, Tebal Pipi',
      bestSpot: 'Karang Pulau Karas, Pulau Abang, Teluk Senimba, Perairan Sekupang',
      currentTolerance: 'Arus 0.5 - 2.0 Knot (Timah Bawah Gantung)',
      mainline: 'PE Braid 1.5 - 2.5',
      leader: 'Hard Mono / Fluorocarbon 30 - 40 Lbs (Panjang 150 cm)',
      sinker: 'Timah Gantung Peniti di Ujung Paling Bawah (J4 - J8)',
      hook: 'Kail Marusode No. 12-14 atau Chinu No. 4-5 (2 cabang)',
      bait: 'Irisan cumi segar, umpan pumpun (cacing laut), atau udang kupas',
      proTips: 'Simpul T-knot harus dipilin kaku agar cabang tali kail tidak melilit ke tali leader utama saat dihantam arus laut selat yang berputar.',
      diagramSvg: (
        <svg viewBox="0 0 420 180" className="w-full h-auto">
          {/* Main vertical leader line */}
          <line x1="120" y1="20" x2="120" y2="160" stroke="#10b981" strokeWidth="2.5" />
          <text x="70" y="30" fill="#38bdf8" fontSize="9" fontFamily="monospace">Dari Tali PE</text>

          {/* Swivel Top */}
          <rect x="116" y="25" width="8" height="12" rx="2" fill="#d97706" />

          {/* Branch 1 (T-Knot Top) */}
          <line x1="120" y1="65" x2="260" y2="65" stroke="#34d399" strokeWidth="2" />
          <path d="M 260,65 Q 275,65 275,76 Q 275,84 268,84" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <text x="285" y="72" fill="#ffffff" fontSize="9">Kail Atas (Umpan Cumi)</text>

          {/* Branch 2 (T-Knot Bottom) */}
          <line x1="120" y1="115" x2="260" y2="115" stroke="#34d399" strokeWidth="2" />
          <path d="M 260,115 Q 275,115 275,126 Q 275,134 268,134" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <text x="285" y="122" fill="#ffffff" fontSize="9">Kail Bawah (Umpan Pumpun)</text>

          {/* Sinker at Bottom */}
          <ellipse cx="120" cy="155" rx="10" ry="14" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="145" y="158" fill="#cbd5e1" fontSize="9" fontFamily="monospace">Timah Peniti Bawah</text>
        </svg>
      )
    },
    {
      id: 'sabiki-tamban',
      name: 'Rangkaian Apollo Sabiki (Pencari Umpan Hidup Tamban)',
      subName: 'Wajib Siap Sebelum Berlayar Mencari Umpan di Dermaga & Kelong',
      targetFish: 'Ikan Tamban, Ikan Selar, Kembung, Como',
      bestSpot: 'Bawah Dermaga Nongsa, Jembatan Barelang, Lampu Kelong Malam',
      currentTolerance: 'Arus 0.2 - 1.5 Knot',
      mainline: 'PE Braid 0.8 - 1.5 (Tackle Ringan)',
      leader: 'Monofilament Halus 10 - 15 Lbs (5 - 6 Kail Bulu Flasher)',
      sinker: 'Timah Kerucut Kecil 20 - 40 gram di ujung bawah',
      hook: 'Kail Sabiki Emas No. 4 - 8 dengan rumbai sutra hijau/merah muda',
      bait: 'Tanpa umpan (cukup kilauan bulu) atau ujung kail dicolek udang rebon kecil',
      proTips: 'Turunkan rangkaian perlahan lalu hentak-hentakkan joran secara berirama (*jigging halus*) di dekat bayangan tiang dermaga tempat kawanan tamban berteduh.',
      diagramSvg: (
        <svg viewBox="0 0 420 180" className="w-full h-auto">
          <line x1="100" y1="20" x2="100" y2="155" stroke="#38bdf8" strokeWidth="1.5" />
          {[40, 65, 90, 115, 140].map((y, i) => (
            <g key={i}>
              <line x1="100" y1={y} x2="160" y2={y} stroke="#34d399" strokeWidth="1.2" />
              <circle cx="165" cy={y} r="2" fill="#fbbf24" />
              <path d={`M 165,${y} Q 175,${y} 175,${y+6} Q 175,${y+12} 170,${y+12}`} fill="none" stroke="#fbbf24" strokeWidth="1.5" />
              <line x1="165" y1={y} x2="185" y2={y-3} stroke="#ec4899" strokeWidth="1.5" />
            </g>
          ))}
          <ellipse cx="100" cy="165" rx="8" ry="10" fill="#64748b" stroke="#94a3b8" />
          <text x="210" y="90" fill="#cbd5e1" fontSize="10" fontFamily="monospace">5x Kail Bulu Flasher Emas</text>
          <text x="210" y="110" fill="#38bdf8" fontSize="9">Sensitif getaran kawanan tamban</text>
        </svg>
      )
    }
  ];

  const knotPresets: KnotPreset[] = [
    {
      id: 'fg-knot',
      name: 'Simpul FG (FG Knot / Fine Grip)',
      alias: 'Simpul Raja Sambungan PE ke Shock Leader',
      strengthPercent: 100,
      difficulty: 'Mahir',
      purpose: 'Menyambungkan tali utama benang PE (braided line) ke perambut tebal Fluorocarbon tanpa ganjalan di ring joran.',
      batamApplication: 'Wajib untuk casting Siakap di muara bakau Barelang dan popping/jigging Tenggiri agar ikatan tidak putus saat hentakan strike keras.',
      steps: [
        'Kaitkan tali PE di jari atau tahan tegang dengan reel untuk menjaga tensi.',
        'Lilitkan benang PE menyilang bolak-balik di atas tali fluorocarbon minimal 18-22 kali silangan rapat.',
        'Kunci lilitan dengan 1 kali simpul half-hitch di atas leader.',
        'Tarik kencang kedua ujung sampai warna lilitan berubah menjadi gelap dan menggigit bening ke fluorocarbon.',
        'Tutup dengan 6-8 kali half-hitch bergantian arah dan bakar sedikit sisa ujung fluorocarbon dengan korek api membentuk pentol kecil penahan.'
      ]
    },
    {
      id: 'palomar-knot',
      name: 'Simpul Palomar (Palomar Knot)',
      alias: 'Simpul Tercepat & Terkuat untuk Kail & Kili-kili',
      strengthPercent: 95,
      difficulty: 'Mudah',
      purpose: 'Menghubungkan tali leader ke lubang kili-kili (swivel), snap peniti, atau solid ring jigging.',
      batamApplication: 'Simpul paling handal saat berada di atas perahu bergoyang ombak, dapat diikat dalam waktu 15 detik tanpa resiko melorot.',
      steps: [
        'Lipat tali leader menjadi dua (double line) sepanjang 10-15 cm.',
        'Masukkan lipatan tali melewati lubang cincin kail atau kili-kili.',
        'Ikat simpul biasa (overhand knot) longgar dengan tali ganda tersebut.',
        'Buka lingkaran ujung lipatan tali, lalu lewati kail atau kili-kili masuk menembus lingkaran tersebut.',
        'Basahi tali dengan air laut, lalu tarik kedua tali secara bersamaan hingga simpul terkunci rapat dan rapi.'
      ]
    },
    {
      id: 'snell-knot',
      name: 'Simpul Snell (Snell Knot Batam)',
      alias: 'Simpul Lilit Batang Kail untuk Umpan Udang Hidup',
      strengthPercent: 90,
      difficulty: 'Sedang',
      purpose: 'Mengikat tali langsung mengelilingi tangkai batang kail sehingga tarikan joran langsung mengarahkan ujung kail menancap ke rahang ikan.',
      batamApplication: 'Sangat disukai pemancing Siakap & Kakap Merah Barelang karena posisi umpan udang hidup tetap seimbang di dalam arus.',
      steps: [
        'Masukkan ujung leader melewati mata kail dari arah depan menuju ke batang kail.',
        'Bentuk lingkaran melengkung di sepanjang batang kail.',
        'Lilitkan ujung tali mengelilingi batang kail dan tali leader sebanyak 7-9 lilitan rapat menuju ke arah mata kail.',
        'Masukkan ujung tali melewati lingkaran di pangkal.',
        'Basahi dengan air dan tarik kencang tali utama sampai lilitan tersusun rapi di batang kail.'
      ]
    },
    {
      id: 't-knot',
      name: 'Simpul T-Knot (Dropper Loop Kumis Ganda)',
      alias: 'Simpul Cabang 90° Kaku Anti Melilit',
      strengthPercent: 88,
      difficulty: 'Sedang',
      purpose: 'Membuat cabang lengan kail 90 derajat yang berdiri kaku keluar dari leader utama untuk mancing dasaran bertingkat.',
      batamApplication: 'Kunci sukses mancing ikan karang (Kerapu/Jenahak/Baronang) agar umpan tidak berputar melilit tali utama akibat arus pusaran selat.',
      steps: [
        'Bentuk lingkaran besar pada tali monofilament di titik cabang yang diinginkan.',
        'Putar sisi lingkaran melilit bagian tengah sebanyak 5-6 kali putaran.',
        'Buka celah di tengah-tengah putaran tersebut, lalu tarik keluar satu sisi lingkaran menembus celah tersebut menjadi tangkai kumis.',
        'Tahan tangkai kumis dengan gigi atau jari, lalu tarik perlahan kedua ujung tali utama hingga simpul T terkunci kaku 90 derajat.'
      ]
    }
  ];

  const activeRig = rigPresets.find(r => r.id === selectedRigId) || rigPresets[0];
  const activeKnot = knotPresets.find(k => k.id === selectedKnotId) || knotPresets[0];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden mb-8 shadow-xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Wrench className="h-3.5 w-3.5" />
            <span>PANDUAN TEKNIS & RIGGING TERMINAL TACKLE KEPRI</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>Simulator Rangkaian Pancing Laut & Panduan Simpul</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Skema visual rangkaian pancing spesifik perairan Batam (karang teritip, arus selat deras, gigi tajam tenggiri) & teknik simpul laut teruji.
          </p>
        </div>

        {/* Tab Toggle: Rangkaian vs Simpul */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('rangkaian')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'rangkaian'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Rangkaian Pancing
          </button>
          <button
            onClick={() => setActiveTab('simpul')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'simpul'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Panduan Simpul Laut
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {activeTab === 'rangkaian' ? (
          <div>
            {/* Rig Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-6">
              {rigPresets.map((rig) => {
                const isSelected = rig.id === selectedRigId;
                return (
                  <button
                    key={rig.id}
                    onClick={() => setSelectedRigId(rig.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400/40 text-white'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold mb-1 text-slate-200">
                      {rig.name.split('(')[0]}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono">
                      Target: {rig.targetFish.split(',')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Rig Detail & Visual Schematic */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-mono text-cyan-400 mb-0.5">
                    {activeRig.subName}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {activeRig.name}
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300">
                  {activeRig.currentTolerance}
                </div>
              </div>

              {/* Schematic Diagram Canvas */}
              <div className="p-6 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-center">
                <div className="w-full max-w-2xl bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="h-3 w-3 text-cyan-400" />
                    <span>SKEMA RANGKAIAN TERMINAL TACKLE:</span>
                  </div>
                  {activeRig.diagramSvg}
                </div>
              </div>

              {/* Rig Technical Specifications Table */}
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="text-slate-400 text-[10px] font-mono uppercase">TALI UTAMA & PERAMBUT (LEADER)</div>
                  <div className="text-white font-bold mt-1">{activeRig.mainline}</div>
                  <div className="text-emerald-400 font-mono text-[11px] mt-0.5">{activeRig.leader}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="text-slate-400 text-[10px] font-mono uppercase">PEMBERAT (TIMAH) & KAIL</div>
                  <div className="text-white font-bold mt-1">{activeRig.sinker}</div>
                  <div className="text-amber-400 font-mono text-[11px] mt-0.5">{activeRig.hook}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 sm:col-span-2 lg:col-span-1">
                  <div className="text-slate-400 text-[10px] font-mono uppercase">UMPAN REKOMENDASI</div>
                  <div className="text-cyan-300 font-medium mt-1">{activeRig.bait}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Spot: {activeRig.bestSpot}</div>
                </div>
              </div>

              {/* Master Angler Pro-Tip Box */}
              <div className="mx-5 mb-5 p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs">
                <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                  <Sparkles className="h-4 w-4 flex-shrink-0" />
                  <span>KUNCI SUKSES PERIKANAN LAUT BATAM:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {activeRig.proTips}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Knot Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-6">
              {knotPresets.map((knot) => {
                const isSelected = knot.id === selectedKnotId;
                return (
                  <button
                    key={knot.id}
                    onClick={() => setSelectedKnotId(knot.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400/40 text-white'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold mb-1 text-slate-200">
                      {knot.name.split('(')[0]}
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-emerald-400">{knot.strengthPercent}% Kuat</span>
                      <span className="text-slate-400">{knot.difficulty}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Knot Detail Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="text-xs font-mono text-cyan-400 mb-0.5">
                    {activeKnot.alias}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {activeKnot.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {activeKnot.purpose}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 font-mono">KEKUATAN TARIK</div>
                    <div className="text-base font-bold text-emerald-400 font-mono">{activeKnot.strengthPercent}%</div>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 font-mono">TINGKAT KESULITAN</div>
                    <div className="text-xs font-bold text-cyan-300 mt-0.5">{activeKnot.difficulty}</div>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  <span>LANGKAH-LANGKAH MENGIKAT DI ATAS PERAHU:</span>
                </h4>
                <div className="space-y-2.5">
                  {activeKnot.steps.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-3 text-xs">
                      <div className="h-5 w-5 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-400 flex items-center justify-center font-mono font-bold text-[11px] flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="text-slate-300 leading-relaxed">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Application Box */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div className="text-slate-400 text-[10px] font-mono uppercase mb-1">PENGGUNAAN KHUSUS PERAIRAN BATAM:</div>
                <div className="text-slate-200 leading-relaxed font-medium">
                  {activeKnot.batamApplication}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
