import { MoonPhaseName, SolunarInfo, TideConditionType, TidePoint, WeatherCondition } from '../types/marine';

// Calculate moon phase and illumination for a given date
export function getMoonData(date: Date): { phase: MoonPhaseName; illumination: number; ageDays: number } {
  // Approximate astronomical calculation
  const knownNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
  const synodicMonth = 29.53058867 * 24 * 60 * 60 * 1000;
  const diff = date.getTime() - knownNewMoon;
  const cycles = (diff / synodicMonth) % 1;
  const normalizedCycle = cycles < 0 ? cycles + 1 : cycles;
  const ageDays = normalizedCycle * 29.53;

  let phase: MoonPhaseName = 'Bulan Baru (Mati)';
  let illumination = 0;

  if (ageDays < 1.5 || ageDays >= 28) {
    phase = 'Bulan Baru (Mati)';
    illumination = Math.round((1 - Math.abs(ageDays - (ageDays >= 28 ? 29.53 : 0)) / 1.5) * 5);
  } else if (ageDays < 6.5) {
    phase = 'Sabit Awal';
    illumination = Math.round(10 + ((ageDays - 1.5) / 5) * 35);
  } else if (ageDays < 8.5) {
    phase = 'Perbani Awal';
    illumination = 50;
  } else if (ageDays < 13.5) {
    phase = 'Cembung Awal';
    illumination = Math.round(55 + ((ageDays - 8.5) / 5) * 40);
  } else if (ageDays < 16.5) {
    phase = 'Purnama Penuh';
    illumination = Math.round(95 + (1 - Math.abs(ageDays - 14.76) / 1.74) * 5);
  } else if (ageDays < 21.5) {
    phase = 'Cembung Akhir';
    illumination = Math.round(90 - ((ageDays - 16.5) / 5) * 35);
  } else if (ageDays < 23.5) {
    phase = 'Perbani Akhir';
    illumination = 50;
  } else {
    phase = 'Sabit Akhir';
    illumination = Math.round(45 - ((ageDays - 23.5) / 4.5) * 40);
  }

  return { phase, illumination: Math.min(100, Math.max(0, illumination)), ageDays };
}

// Convert degree to 16-point wind compass
export function degToCompass(deg: number): string {
  const directions = [
    'Utara (U)', 'U-TL', 'Timur Laut (TL)', 'T-TL',
    'Timur (T)', 'T-TG', 'Tenggara (TG)', 'S-TG',
    'Selatan (S)', 'S-BD', 'Barat Daya (BD)', 'B-BD',
    'Barat (B)', 'B-BL', 'Barat Laut (BL)', 'U-BL'
  ];
  const idx = Math.round(deg / 22.5) % 16;
  return directions[idx];
}

// Generate Batam hourly marine & tide model for a specific day
export function generateBatamDayForecast(date: Date): {
  hourly: TidePoint[];
  solunar: SolunarInfo;
  weather: WeatherCondition;
  highTideTimes: string[];
  lowTideTimes: string[];
} {
  const moon = getMoonData(date);
  const daySeed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  
  // Phase effect: Spring tide occurs near New Moon (0/29.5) and Full Moon (~14.8)
  const isSpring = moon.ageDays < 3 || moon.ageDays > 26.5 || (moon.ageDays > 12.5 && moon.ageDays < 17.5);
  const isNeap = (moon.ageDays >= 6 && moon.ageDays <= 9) || (moon.ageDays >= 21 && moon.ageDays <= 24);
  
  const tideType: TideConditionType = isSpring 
    ? 'Air Hidup (Purnama)' 
    : isNeap 
    ? 'Air Mati (Perbani)' 
    : 'Air Sedang';

  // Batam Tide Harmonic Simulation (M2 period: 12.42 hrs, S2: 12.0 hrs, diurnal component)
  // Base astronomical mean sea level (MSL) = 1.95 meters
  const msl = 1.95;
  const amplitudeSpring = 1.45; // Spring range up to 2.9m
  const amplitudeNeap = 0.65;   // Neap range around 1.3m
  const currentAmp = isSpring ? amplitudeSpring : isNeap ? amplitudeNeap : 1.05;

  // Tidal phase offset shifted slightly day to day by ~50 mins (lunar day)
  const dayOffsetHours = ((date.getDate() * 0.84) % 12);

  const hourly: TidePoint[] = [];
  const rawHeights: number[] = [];

  for (let h = 0; h < 24; h++) {
    const t = h + dayOffsetHours;
    // Semi-diurnal principal constituent M2 (~12.42h)
    const m2 = Math.cos((2 * Math.PI * t) / 12.42);
    // Solar semi-diurnal S2 (~12.0h)
    const s2 = 0.35 * Math.cos((2 * Math.PI * t) / 12.0);
    // Diurnal K1 (~24.0h)
    const k1 = 0.25 * Math.sin((2 * Math.PI * t) / 23.93);

    const waterLevel = msl + currentAmp * (m2 * 0.75 + s2 * 0.15 + k1 * 0.1);
    rawHeights.push(Math.round(waterLevel * 100) / 100);
  }

  // Find local peaks (high tides) and troughs (low tides)
  const highTideIndices = new Set<number>();
  const lowTideIndices = new Set<number>();

  for (let h = 0; h < 24; h++) {
    const prev = rawHeights[(h - 1 + 24) % 24];
    const curr = rawHeights[h];
    const next = rawHeights[(h + 1) % 24];

    if (curr >= prev && curr >= next && curr > msl + 0.3) {
      highTideIndices.add(h);
    }
    if (curr <= prev && curr <= next && curr < msl - 0.2) {
      lowTideIndices.add(h);
    }
  }

  // Base wind pattern for Batam (Monsoon influence)
  // Around October/November: peralihan ke Musim Barat Laut
  const baseWindDeg = (270 + (daySeed % 50) - 25 + 360) % 360; // Barat - Barat Laut
  const baseWindSpeed = 7 + (daySeed % 7); // 7 - 14 knot

  const highTideTimes: string[] = [];
  const lowTideTimes: string[] = [];

  for (let h = 0; h < 24; h++) {
    const timeStr = `${String(h).padStart(2, '0')}:00`;
    const waterLevel = rawHeights[h];
    const isHigh = highTideIndices.has(h);
    const isLow = lowTideIndices.has(h);

    if (isHigh) highTideTimes.push(timeStr);
    if (isLow) lowTideTimes.push(timeStr);

    // Current calculation:
    // Derivatif air (rate of change of water level):
    // Jika air sedang naik deras -> Arus Pasang (Flood) ke Timur/Tenggara (~105°)
    // Jika air sedang turun deras -> Arus Surut (Ebb) ke Barat/Barat Laut (~285°)
    // Jika di puncak atau lembah (air mati/tenang) -> Arus sangat pelan (<0.4 knot)
    const nextH = rawHeights[(h + 1) % 24];
    const prevH = rawHeights[(h - 1 + 24) % 24];
    const rateOfChange = (nextH - prevH) / 2; // meter per hour

    let currentSpeedKnots = 0;
    let currentDirectionDeg = 105;
    let currentDirectionName = 'Timur-Tenggara (Arus Pasang)';

    if (rateOfChange > 0.05) {
      // Arus pasang menuju timur (ke arah Selat Riau / Natuna)
      currentSpeedKnots = Math.min(3.4, Math.max(0.4, Math.abs(rateOfChange) * (isSpring ? 5.2 : 3.8)));
      currentDirectionDeg = 105;
      currentDirectionName = 'Arus Pasang (Ke Timur)';
    } else if (rateOfChange < -0.05) {
      // Arus surut menuju barat (ke arah Selat Malaka / Karimun)
      currentSpeedKnots = Math.min(3.0, Math.max(0.4, Math.abs(rateOfChange) * (isSpring ? 4.8 : 3.4)));
      currentDirectionDeg = 285;
      currentDirectionName = 'Arus Surut (Ke Barat)';
    } else {
      // Slack water (Air Tenang)
      currentSpeedKnots = 0.2 + ((daySeed + h) % 3) * 0.1;
      currentDirectionDeg = rateOfChange >= 0 ? 105 : 285;
      currentDirectionName = 'Air Tenang (Peralihan)';
    }

    currentSpeedKnots = Math.round(currentSpeedKnots * 10) / 10;

    // Wind variation throughout day (thermals: stronger at 11:00 - 16:00)
    const thermalBoost = (h >= 11 && h <= 16) ? 3.5 : (h >= 1 && h <= 6 ? -2 : 0);
    const windSpeedKnots = Math.max(3, Math.round((baseWindSpeed + thermalBoost + Math.sin(h * 0.5) * 1.5) * 10) / 10);
    const windDirectionDeg = Math.round((baseWindDeg + Math.sin(h) * 15 + 360) % 360);

    // Wave height (gelombang perairan Batam rata-rata 0.3m - 1.2m di selat)
    const waveHeightMeters = Math.round((0.3 + (windSpeedKnots / 25) * 0.7 + (currentSpeedKnots > 2.0 ? 0.25 : 0)) * 10) / 10;

    // Solunar & Fish Activity Calculation (0 - 100)
    // 1. Arus makan: Arus sedang (0.8 - 1.8 knot) adalah yang paling optimal bagi predator makan!
    let currentScore = 0;
    if (currentSpeedKnots >= 0.7 && currentSpeedKnots <= 1.9) {
      currentScore = 40; // Sweet spot arus jalan
    } else if (currentSpeedKnots > 1.9 && currentSpeedKnots <= 2.5) {
      currentScore = 25; // Agak deras
    } else if (currentSpeedKnots > 2.5) {
      currentScore = 15; // Terlalu deras, ikan sembunyi di balik karang
    } else {
      currentScore = 20; // Arus tenang (bagus untuk dasaran ikan karang, tapi pelagis kurang aktif)
    }

    // 2. Waktu fajar/senja (Golden hours 05:00-07:00 dan 17:00-19:00)
    let timeBonus = 0;
    if ((h >= 5 && h <= 7) || (h >= 17 && h <= 19)) {
      timeBonus = 30;
    } else if (h >= 20 && h <= 23) {
      timeBonus = 18; // Malam hari (cumi-cumi & mayung)
    } else if (h >= 11 && h <= 14) {
      timeBonus = 5; // Terik siang
    } else {
      timeBonus = 12;
    }

    // 3. Moon phase bonus
    const moonBonus = isSpring ? 20 : isNeap ? 8 : 14;

    // 4. Wave & weather penalty
    const weatherScore = windSpeedKnots > 18 ? -15 : windSpeedKnots < 12 ? 10 : 5;

    const rawScore = currentScore + timeBonus + moonBonus + weatherScore;
    const fishActivityScore = Math.min(98, Math.max(15, rawScore));

    hourly.push({
      hour: h,
      timeStr,
      waterLevelMeters: waterLevel,
      currentSpeedKnots,
      currentDirectionDeg,
      currentDirectionName,
      windSpeedKnots,
      windDirectionDeg,
      waveHeightMeters,
      fishActivityScore,
      isHighTide: isHigh,
      isLowTide: isLow
    });
  }

  // Solunar Major and Minor periods for Batam
  // Major periods: ~2 hours around moon transit and underfoot
  const transitHour = Math.floor((12 + (moon.ageDays * 0.8)) % 24);
  const underfootHour = (transitHour + 12) % 24;
  const riseHour = (transitHour - 6 + 24) % 24;
  const setHour = (transitHour + 6) % 24;

  const formatPeriod = (hr: number) => {
    const start = `${String(hr).padStart(2, '0')}:00`;
    const end = `${String((hr + 2) % 24).padStart(2, '0')}:00`;
    return `${start} - ${end}`;
  };

  const majorPeriods = [formatPeriod(transitHour), formatPeriod(underfootHour)];
  const minorPeriods = [formatPeriod(riseHour), formatPeriod(setHour)];

  const maxScore = Math.max(...hourly.map(p => p.fishActivityScore));
  const overallRating = maxScore > 85 ? 'Luar Biasa' : maxScore > 72 ? 'Sangat Baik' : maxScore > 55 ? 'Sedang' : 'Kurang Aktif';

  const avgWind = Math.round(hourly.reduce((acc, h) => acc + h.windSpeedKnots, 0) / 24 * 10) / 10;
  const maxWave = Math.max(...hourly.map(h => h.waveHeightMeters));

  const weather: WeatherCondition = {
    windSpeedKnots: avgWind,
    windGustKnots: Math.round((avgWind * 1.45) * 10) / 10,
    windDirectionDeg: baseWindDeg,
    windDirectionName: degToCompass(baseWindDeg),
    monsoonPeriod: 'Musim Barat Laut (Peralihan)',
    waveHeightMeters: maxWave,
    waterTempCelsius: 29.6,
    visibilityKm: 9.5,
    seaStateDescription: maxWave <= 0.6 ? 'Laut Tenang (Smooth/Slight)' : maxWave <= 1.2 ? 'Sedikit Berombak (Moderate)' : 'Berombak Kasar (Rough)',
    safetyStatus: {
      pompong: maxWave > 1.2 || avgWind > 16 ? 'Tunda Berlayar' : maxWave > 0.8 ? 'Waspada Arus/Gelombang' : 'Aman Melaut',
      speedboat: maxWave > 1.5 || avgWind > 20 ? 'Bahaya' : maxWave > 1.0 ? 'Waspada' : 'Aman',
      ship: 'Normal'
    }
  };

  const solunar: SolunarInfo = {
    moonPhase: moon.phase,
    moonIllumination: moon.illumination,
    majorPeriods,
    minorPeriods,
    tideType,
    overallRating
  };

  return { hourly, solunar, weather, highTideTimes, lowTideTimes };
}
