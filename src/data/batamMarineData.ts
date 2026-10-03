import { FishSpecies, FishingSpot } from '../types/marine';

// Batam Island authentic fishing spots & oceanographic stations
export const BATAM_FISHING_SPOTS: FishingSpot[] = [
  {
    id: 'spot-barelang-1',
    name: 'Jembatan 1 Barelang (Pilar Tengku Fisabilillah)',
    subDistrict: 'Sagulung - Tembesi',
    category: 'Jembatan & Pilar',
    lat: 0.9818,
    lng: 104.0417,
    mapX: 47,
    mapY: 53,
    depthMeters: '18 - 32 m',
    targetFish: ['Kakap Putih (Siakap)', 'Kerapu Lumpur', 'Ikan Mayung', 'Ikan Senangin'],
    bestBait: ['Udang Hidup', 'Ikan Belanak Potong', 'Umpan Tiruan Minnow'],
    recommendedTechnique: 'Dasaran Glosor Timah Berat & Slow Jigging dekat pilar',
    currentProfile: 'Sangat deras saat air pasang puncak. Waktu terbaik adalah 40 menit saat air tenang (slack water).',
    safetyRating: 'Waspada',
    description: 'Pusat pertemuan arus Selat Riau dan pulau-pulau dalam Barelang. Memiliki palung dalam di sekitar pilar jembatan yang menjadi rumah ikan predator raksasa penunggu arus.'
  },
  {
    id: 'spot-selat-riau',
    name: 'Selat Riau & Karang Heluput (Punggur)',
    subDistrict: 'Nongsa - Teluk Punggur',
    category: 'Selat Terbuka',
    lat: 1.0543,
    lng: 104.1482,
    mapX: 68,
    mapY: 42,
    depthMeters: '22 - 45 m',
    targetFish: ['Tenggiri (Spanish Mackerel)', 'Ikan Talang-talang', 'Ikan Tongkol', 'Cumi Torak'],
    bestBait: ['Ikan Tamban Hidup', 'Metal Jig 60-100g', 'Umpan Tonda'],
    recommendedTechnique: 'Speed Jigging & Trolling / Hanyut Ikan Hidup (Live Drift)',
    currentProfile: 'Arus laminer konstan 1.8 - 2.8 knot. Arus jalan menuju timur membawa gerombolan ikan umpan.',
    safetyRating: 'Waspada',
    description: 'Jalur pelagis utama antara Pulau Batam dan Bintan. Spot nomor satu bagi para pemburu Tenggiri dan Talang-talang saat air hidup.'
  },
  {
    id: 'spot-pulau-abang',
    name: 'Pulau Abang & Karang Dedap (Barelang Ujung)',
    subDistrict: 'Galang Baru',
    category: 'Karang Dangkal',
    lat: 0.5752,
    lng: 104.2251,
    mapX: 74,
    mapY: 88,
    depthMeters: '8 - 25 m',
    targetFish: ['Kerapu Macan', 'Kakap Merah', 'Kuwe / GT (Giant Trevally)', 'Ikan Kaci'],
    bestBait: ['Udang Lipan', 'Cumi Segar', 'Micro Jig 30-40g', 'Popper'],
    recommendedTechnique: 'Casting Popper di pinggir reef break & Light Jigging',
    currentProfile: 'Arus jernih berkarang. Kecepatan 0.8 - 1.5 knot. Sangat optimal saat arus perbani.',
    safetyRating: 'Aman',
    description: 'Kawasan konservasi terumbu karang terjernih di Batam. Populer untuk sportfishing GT dan kakap karang dengan air jernih seperti kristal.'
  },
  {
    id: 'spot-nongsa-nipah',
    name: 'Perairan Nongsa & Karang Nipah (Selat Singapura)',
    subDistrict: 'Nongsa Pantai',
    category: 'Selat Terbuka',
    lat: 1.1925,
    lng: 104.0950,
    mapX: 60,
    mapY: 20,
    depthMeters: '25 - 55 m',
    targetFish: ['Tenggiri Batang', 'Alu-alu (Barracuda)', 'Ikan Lemadang (Mahi-mahi)', 'Ikan Cencaru'],
    bestBait: ['Kembung/Tamban Segar', 'Metal Jig Glow in the dark 80-120g'],
    recommendedTechnique: 'Vertical Jigging malam/pagi & Fast Retrieve Casting',
    currentProfile: 'Dipengaruhi langsung arus Selat Singapura. Sangat kuat mencapai 3.2 knot saat air purnama.',
    safetyRating: 'Ekstrem (Arus Deras)',
    description: 'Batas langsung perairan internasional Selat Singapura. Terdapat drop-off curam dari kedalaman 10 meter ke palung 50 meter yang menjadi feeding ground pelagis besar.'
  },
  {
    id: 'spot-sekupang-sambu',
    name: 'Selat Sambu & Perairan Belakang Padang',
    subDistrict: 'Belakang Padang - Sekupang',
    category: 'Pulau Luar',
    lat: 1.1492,
    lng: 103.9015,
    mapX: 25,
    mapY: 28,
    depthMeters: '15 - 35 m',
    targetFish: ['Ikan Mayung Super', 'Ikan Gerut-gerut', 'Kerapu Batu', 'Pari Karang'],
    bestBait: ['Udang Kupas', 'Cacing Laut (Pumpun)', 'Ikan Duri Potong'],
    recommendedTechnique: 'Dasaran / Bottom Fishing menggunakan timah J2 - J4',
    currentProfile: 'Arus bolak-balik antara Batam dan gugusan pulau Sambu. Banyak lubuk berbatu karang.',
    safetyRating: 'Waspada',
    description: 'Spot tradisional nelayan Belakang Padang yang terkenal dengan sensasi tarikan Ikan Mayung babon dan Gerut-gerut saat pasang malam.'
  },
  {
    id: 'spot-barelang-4',
    name: 'Jembatan 4 & Selat Rempang (Sultan Zainal Abidin)',
    subDistrict: 'Galang - Rempang Cate',
    category: 'Jembatan & Pilar',
    lat: 0.8845,
    lng: 104.1480,
    mapX: 58,
    mapY: 68,
    depthMeters: '14 - 26 m',
    targetFish: ['Siakap Bakau', 'Kerapu Sunu', 'Ikan Ketang-ketang', 'Ketambak'],
    bestBait: ['Udang Hidup Sedang', 'Anak Ikan Mujair / Belanak', 'Soft Plastic Lure'],
    recommendedTechnique: 'Casting pinggiran tiang beton saat air mulai pasang',
    currentProfile: 'Arus moderat 1.0 - 2.0 knot. Sering terbentuk eddy (pusaran air tenang) di belakang tiang.',
    safetyRating: 'Aman',
    description: 'Menghubungkan Pulau Setokok dan Pulau Rempang. Arus di sela pilar jembatan ini menjadi perangkap alami ikan teri yang mengundang Siakap dan Kerapu memburu mangsa.'
  },
  {
    id: 'spot-teluk-tering',
    name: 'Teluk Tering & Ocarina Waters (Batam Center)',
    subDistrict: 'Batam Kota',
    category: 'Estuari & Bakau',
    lat: 1.1390,
    lng: 104.0530,
    mapX: 50,
    mapY: 34,
    depthMeters: '4 - 12 m',
    targetFish: ['Ikan Sembilang', 'Ikan Belanak', 'Ikan Pari Pasir', 'Kepiting Bakau'],
    bestBait: ['Pumpun (Cacing Laut)', 'Udang Kupas', 'Roti Bakar (Belanak)'],
    recommendedTechnique: 'Pelampung gantung & Mancing pinggiran dermaga/batu karang',
    currentProfile: 'Perairan teluk tenang, gelombang rendah 0.2 - 0.4 m.',
    safetyRating: 'Aman',
    description: 'Area perairan tenang terlindung di jantung kota Batam. Cocok untuk mancing santai keluarga, pemancing pinggiran, maupun perahu kecil di tepian hutan mangrove.'
  },
  {
    id: 'spot-tanjung-piayu',
    name: 'Perairan Tanjung Piayu Laut & Teluk Lengung',
    subDistrict: 'Sei Beduk',
    category: 'Estuari & Bakau',
    lat: 1.0180,
    lng: 104.0880,
    mapX: 56,
    mapY: 48,
    depthMeters: '6 - 16 m',
    targetFish: ['Ikan Kakap Merah Tambak', 'Kerapu Tikus', 'Ikan Kiper / Ketang', 'Udang Galah Muara'],
    bestBait: ['Udang Hidup', 'Ikan Bilis Segar', 'Ulat Bakau'],
    recommendedTechnique: 'Mancing di sekitar keramba apung (Kelong) & jig head cacing sintetis',
    currentProfile: 'Arus lambat ke sedang (0.5 - 1.2 knot), sangat nyaman untuk pompong sewaan.',
    safetyRating: 'Aman',
    description: 'Dikelilingi puluhan kelong budidaya ikan dan restoran seafood terapung. Sisa pakan alami dari kelong menarik ribuan ikan liar berkumpul di dasar perairan.'
  }
];

// Target fish species in Batam waters with biological habits
export const BATAM_FISH_SPECIES: FishSpecies[] = [
  {
    id: 'tenggiri',
    localName: 'Ikan Tenggiri',
    indonesianName: 'Tenggiri Melayu / Batang',
    scientificName: 'Scomberomorus commerson',
    habitat: 'Perairan terbuka, selat berarus kencang, pinggir karang drop-off (Selat Riau & Nongsa)',
    optimalCurrent: '1.2 - 2.2 knot (Arus jalan, baik pasang maupun surut)',
    optimalTide: 'Air Hidup (Purnama / H-2 sampai H+3)',
    bestBaits: ['Tamban hidup', 'Selar', 'Metal jig perak/biru', 'Minnow sinking'],
    technique: 'Drifting dengan balon/pelampung atau Fast jigging kedalaman 15-30m',
    activityRatingToday: 88,
    tip: 'Gunakan leader kawat (wire leader no 3 atau fluorocarbon 40lb) karena gigi tenggiri sangat tajam mampu memutuskan senar monofilamen dalam sekali sambar.'
  },
  {
    id: 'kakap-putih',
    localName: 'Ikan Kakap Putih (Siakap)',
    indonesianName: 'Kakap Putih / Barramundi',
    scientificName: 'Lates calcarifer',
    habitat: 'Muara estuari, bawah pilar jembatan Barelang, pintu air bakau, selat tenang berbatu',
    optimalCurrent: '0.4 - 1.2 knot (Arus mulai bergerak perlahan)',
    optimalTide: 'Pergantian air pasang ke surut (Air perbani atau awal air pasang)',
    bestBaits: ['Udang hidup sungut panjang', 'Anak belanak', 'Soft lure shad'],
    technique: 'Casting dekat pilar jembatan atau dasaran tanpa timah (free-lining live shrimp)',
    activityRatingToday: 92,
    tip: 'Siakap sangat menyukai posisi berlindung di balik tiang jembatan untuk menunggu udang atau belanak yang tersapu arus. Lempar umpan tepat di batas pusaran air tenang.'
  },
  {
    id: 'kerapu',
    localName: 'Ikan Kerapu (Lumpur & Macan)',
    indonesianName: 'Kerapu Karang / Estuary Grouper',
    scientificName: 'Epinephelus coioides / fuscoguttatus',
    habitat: 'Lubuk karang dalam, reruntuhan batu pilar, tubiran karang Pulau Abang & Barelang',
    optimalCurrent: '0.2 - 0.8 knot (Air tenang sampai arus lambat)',
    optimalTide: 'Air Mati / Perbani (saat arus bawah tidak kencang)',
    bestBaits: ['Cumi utuh', 'Ikan kurisi potong', 'Udang lipan', 'Slow fall jig'],
    technique: 'Dasaran glosor timah piramida & Slow pitch jigging tepat 1 meter di atas karang',
    activityRatingToday: 76,
    tip: 'Kerapu akan langsung menyentak umpan masuk ke dalam celah karang. Begitu joran melengkung, segera pompa gulung reel 3-5 putaran cepat untuk menjauhkan ikan dari sarangnya.'
  },
  {
    id: 'mayung',
    localName: 'Ikan Mayung (Lundu Babon)',
    indonesianName: 'Mayung / Lele Laut',
    scientificName: 'Arius thalassinus',
    habitat: 'Dasar berlumpur pasir, alur pelayaran Selat Sambu, Sekupang, dan palung Barelang',
    optimalCurrent: '0.5 - 1.5 knot',
    optimalTide: 'Pasang malam hari (Malam hari lebih agresif)',
    bestBaits: ['Cumi busuk/segar berbau amis kuat', 'Usus ayam', 'Cacing pumpun', 'Daging ikan selar'],
    technique: 'Dasaran paten timah gantung 2 mata kail',
    activityRatingToday: 84,
    tip: 'Hati-hati dengan 3 patil tajam beracun di sirip punggung dan dada mayung. Gunakan capit bibir ikan (lip grip) saat mengangkatnya ke atas perahu.'
  },
  {
    id: 'talang-talang',
    localName: 'Ikan Talang-talang (Queenfish)',
    indonesianName: 'Talang-talang',
    scientificName: 'Scomberoides commersonnianus',
    habitat: 'Permukaan air selat, pusaran arus jembatan, perairan Nongsa',
    optimalCurrent: '1.5 - 2.5 knot (Suka arus kencang yang berbuih)',
    optimalTide: 'Air pasang deras di pagi dan sore hari',
    bestBaits: ['Popper mini', 'Spoon perak kilap', 'Live bait tamban'],
    technique: 'Topwater popping cepat & casting spoon di atas permukaan arus',
    activityRatingToday: 80,
    tip: 'Sensasi lompatan akrobatik talang-talang di atas air sangat memacu adrenalin. Jangan biarkan senar kendor saat ikan melompat agar mata kail tidak terlepas.'
  },
  {
    id: 'cumi-torak',
    localName: 'Cumi-cumi (Torak & Sotong)',
    indonesianName: 'Cumi-cumi Jarum / Torak',
    scientificName: 'Loligo chinensis',
    habitat: 'Perairan jernih Pulau Abang, Karas, Selat Riau, dermaga berlampu terang',
    optimalCurrent: '0.2 - 0.7 knot (Arus tenang)',
    optimalTide: 'Malam hari saat air mati atau bulan baru (gelap)',
    bestBaits: ['Squid jig / Kapela glow in the dark ukuran 2.0 - 3.0'],
    technique: 'Eging (sentakan halus lalu biarkan melayang turun perlahan)',
    activityRatingToday: 94,
    tip: 'Nyalakan lampu penerangan hijau atau putih di lambung perahu untuk mengumpulkan plankton dan anak ikan, cumi-cumi akan berkumpul dalam radius cahaya.'
  }
];

// Scientific methodology explanation to answer "bisa ga dan gimana"
export const METHODOLOGY_EXPLANATION = {
  title: 'Bagaimana Cara Sistem Memprediksi Ikan, Arus, Angin, dan Pasang Surut?',
  canItBeDone: 'Sangat Bisa dan Sudah Digunakan oleh Nelayan Modern serta Ahli Oseanografi',
  summary: 'Prediksi ini menggabungkan 4 pilar sains maritim: model harmonik astronomis pasang surut, hidrodinamika arus selat, meteorologi angin permukaan maritim, serta bio-ekologi rantai makanan ikan (Teori Solunar & Batimetri).',
  pillars: [
    {
      title: '1. Prediksi Pasang Surut (Tidal Harmonics)',
      science: 'Gaya gravitasi Bulan & Matahari terhadap massa air laut menghasilkan kurva pasang surut periodik. Di Kepulauan Riau dan Batam, tipe pasang surutnya adalah Semidiurnal Campuran (dua kali pasang dan dua kali surut dalam 24 jam dengan ketinggian berbeda).',
      formula: 'Menggunakan konstituen astronomis M2 (lunar utama ~12.42 jam), S2 (solar utama ~12.0 jam), K1, dan O1 untuk memproyeksikan ketinggian muka air laut (meter) setiap jam secara presisi hingga hitungan hari ke depan.',
      localImpact: 'Menentukan kapan terjadinya "Air Mati / Perbani" (saat selisih pasang surut kecil ~1.0m, arus tenang) dan "Air Hidup / Purnama" (selisih pasang surut besar hingga ~3.5m, arus selat sangat deras).'
    },
    {
      title: '2. Prediksi Arus Laut (Singapore & Riau Strait Hydrodynamics)',
      science: 'Perairan Batam diapit oleh Selat Singapura di utara dan Selat Riau di timur. Arus laut di selat sempit ini 85% digerakkan oleh perbedaan elevasi pasang surut (Tidal Current) dan topografi dasar laut (Batimetri).',
      formula: 'Saat air pasang mengalir (Flood Current), massa air dari Laut Cina Selatan terdorong masuk ke arah Barat Daya - Barat (~280°-295°) atau Tenggara (~105°) sesuai koridor selat dengan kecepatan 1.5 - 3.2 knot. Saat air surut (Ebb Current), aliran berbalik arah.',
      localImpact: 'Mengetahui waktu "Air Tenang / Slack Water" (30-45 menit saat peralihan pasang ke surut) adalah kunci utama bagi nelayan dasaran agar timah pancing tidak hanyut melayang terbawa arus.'
    },
    {
      title: '3. Arah & Kecepatan Angin (Monsoon & Wind-Waves)',
      science: 'Angin permukaan di Batam dipengaruhi sistem Monsun Asia-Australia. Musim Barat (November - Maret) membawa angin kencang dan gelombang dari arah Barat Laut - Utara, sedangkan Musim Timur (Mei - September) membawa angin dari Tenggara - Selatan.',
      formula: 'Kecepatan angin (knot) dan arah (derajat) dikonversi menjadi tinggi gelombang signifikan (Significant Wave Height / Hs) menggunakan model empirical SMB (Sverdrup-Munk-Bretschneider) yang memperhitungkan panjang fetch selat.',
      localImpact: 'Memberikan indeks keselamatan melaut bagi perahu pompong nelayan tradisional (<5 GT) agar tidak terjebak angin badai mendadak (Sumatra Squall) di perairan terbuka.'
    },
    {
      title: '4. Prediksi Potensi & Keaktifan Ikan (Fish Feeding Index)',
      science: 'Ikan laut tidak makan sembarang waktu. Keaktifan ikan berburu mangsa dipicu oleh 3 pemicu biologis: "Arus Makan", Fase Bulan (Solunar), dan Perubahan Suhu/Cahaya.',
      formula: 'Kombinasi parameter: Arus Sedang (0.8 - 1.8 knot) menggerakkan plankton & ikan kecil keluar dari karang -> memicu predator (Tenggiri, Kakap, GT) menyerang. Ditambah jam Solunar (Major: saat bulan berada di meridian atas/bawah; Minor: saat bulan terbit/terbenam).',
      localImpact: 'Memberikan persentase probabilitas strike (0-100%) dan merekomendasikan spot terbaik di Batam sesuai kondisi perairan saat itu.'
    }
  ]
};
