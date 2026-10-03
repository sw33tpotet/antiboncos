export type MoonPhaseName = 
  | 'Bulan Baru (Mati)' 
  | 'Sabit Awal' 
  | 'Perbani Awal' 
  | 'Cembung Awal' 
  | 'Purnama Penuh' 
  | 'Cembung Akhir' 
  | 'Perbani Akhir' 
  | 'Sabit Akhir';

export type TideConditionType = 'Air Hidup (Purnama)' | 'Air Sedang' | 'Air Mati (Perbani)';

export interface FishingSpot {
  id: string;
  name: string;
  subDistrict: string;
  category: 'Selat Terbuka' | 'Jembatan & Pilar' | 'Karang Dangkal' | 'Estuari & Bakau' | 'Pulau Luar';
  lat: number;
  lng: number;
  mapX: number; // Percentage for SVG map 0-100
  mapY: number; // Percentage for SVG map 0-100
  depthMeters: string;
  targetFish: string[];
  bestBait: string[];
  recommendedTechnique: string;
  currentProfile: string;
  safetyRating: 'Aman' | 'Waspada' | 'Ekstrem (Arus Deras)';
  description: string;
}

export interface FishSpecies {
  id: string;
  localName: string;
  indonesianName: string;
  scientificName: string;
  habitat: string;
  optimalCurrent: string;
  optimalTide: string;
  bestBaits: string[];
  technique: string;
  activityRatingToday: number; // 0 - 100%
  tip: string;
}

export interface TidePoint {
  hour: number;
  timeStr: string;
  waterLevelMeters: number; // e.g. 0.8m to 3.4m
  currentSpeedKnots: number;
  currentDirectionDeg: number;
  currentDirectionName: string;
  windSpeedKnots: number;
  windDirectionDeg: number;
  waveHeightMeters: number;
  fishActivityScore: number; // 0 - 100
  isHighTide?: boolean;
  isLowTide?: boolean;
}

export interface SolunarInfo {
  moonPhase: MoonPhaseName;
  moonIllumination: number; // 0 - 100%
  majorPeriods: string[];
  minorPeriods: string[];
  tideType: TideConditionType;
  overallRating: 'Luar Biasa' | 'Sangat Baik' | 'Sedang' | 'Kurang Aktif';
}

export interface WeatherCondition {
  windSpeedKnots: number;
  windGustKnots: number;
  windDirectionDeg: number;
  windDirectionName: string;
  monsoonPeriod: string;
  waveHeightMeters: number;
  waterTempCelsius: number;
  visibilityKm: number;
  seaStateDescription: string;
  safetyStatus: {
    pompong: 'Aman Melaut' | 'Waspada Arus/Gelombang' | 'Tunda Berlayar';
    speedboat: 'Aman' | 'Waspada' | 'Bahaya';
    ship: 'Normal';
  };
}
