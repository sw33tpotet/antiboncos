/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { BatamRigSimulator } from './components/BatamRigSimulator';
import { FishPredictionPanel } from './components/FishPredictionPanel';
import { InteractiveMarineMap } from './components/InteractiveMarineMap';
import { MarineHero } from './components/MarineHero';
import { MethodologyExplainer } from './components/MethodologyExplainer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SafetyBarometer } from './components/SafetyBarometer';
import { SatelliteSSTChlorophyll } from './components/SatelliteSSTChlorophyll';
import { SinkerCalculator } from './components/SinkerCalculator';
import { TidalWisdomCalendar } from './components/TidalWisdomCalendar';
import { TideCurrentTimeline } from './components/TideCurrentTimeline';
import { TopBar } from './components/TopBar';
import { WeeklyForecastCalendar } from './components/WeeklyForecastCalendar';
import { BATAM_FISHING_SPOTS } from './data/batamMarineData';
import { FishingSpot } from './types/marine';
import { generateBatamDayForecast } from './utils/tideMath';

export default function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentHour, setCurrentHour] = useState<number>(() => {
    const now = new Date();
    return now.getHours();
  });
  const [selectedSpot, setSelectedSpot] = useState<FishingSpot | null>(BATAM_FISHING_SPOTS[0]);
  const [activeTab, setActiveTab] = useState<string>('radar');

  // Compute daily forecast using astronomical math engine
  const forecast = useMemo(() => {
    return generateBatamDayForecast(selectedDate);
  }, [selectedDate]);

  const currentPoint = forecast.hourly[currentHour] || forecast.hourly[0];

  // Handler to jump to real-world current hour & today
  const handleJumpToNow = () => {
    setSelectedDate(new Date());
    setCurrentHour(new Date().getHours());
    const el = document.getElementById('beranda');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'radar') {
      const el = document.getElementById('radar-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'pasang-surut') {
      const el = document.getElementById('timeline-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'petua-bulan') {
      const el = document.getElementById('petua-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'sst') {
      const el = document.getElementById('sst-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'rig-simulator') {
      const el = document.getElementById('rig-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'safety') {
      const el = document.getElementById('safety-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'prediksi-ikan') {
      const el = document.getElementById('ikan-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'sinker') {
      const el = document.getElementById('sinker-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreMap = () => {
    setActiveTab('radar');
    const el = document.getElementById('radar-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReadMethodology = () => {
    const el = document.getElementById('metodologi-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <div id="beranda" />
      
      {/* 3-Zone Top Navigation Contract with In-App PWA Install */}
      <TopBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onJumpToNow={handleJumpToNow}
      />

      {/* Offline Status & Cached Indicator */}
      <OfflineIndicator />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Section */}
        <MarineHero
          currentPoint={currentPoint}
          solunar={forecast.solunar}
          weather={forecast.weather}
          selectedDate={selectedDate}
          onExploreMap={handleExploreMap}
          onReadMethodology={handleReadMethodology}
        />

        {/* Section 1: Interactive Marine Radar & Fishing Hotspots Map */}
        <div id="radar-section">
          <InteractiveMarineMap
            currentPoint={currentPoint}
            selectedSpot={selectedSpot}
            onSelectSpot={setSelectedSpot}
          />
        </div>

        {/* Section 2: 24-Hour Tidal Curve & Current/Wind Gauges */}
        <div id="timeline-section">
          <TideCurrentTimeline
            hourlyData={forecast.hourly}
            currentHour={currentHour}
            onHourChange={setCurrentHour}
            solunar={forecast.solunar}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            highTideTimes={forecast.highTideTimes}
            lowTideTimes={forecast.lowTideTimes}
          />
        </div>

        {/* Section 3: Kalender Pasang Kancing / Air Mati vs Air Hidup (Kearifan Lokal Melayu Batam) */}
        <div id="petua-section">
          <TidalWisdomCalendar />
        </div>

        {/* Section 4: Satellite SST & Chlorophyll-a Thermal Front Map */}
        <div id="sst-section">
          <SatelliteSSTChlorophyll />
        </div>

        {/* Section 5: Fish Feeding Prediction & Species Catalog */}
        <div id="ikan-section">
          <FishPredictionPanel
            currentPoint={currentPoint}
            solunar={forecast.solunar}
            hourlyData={forecast.hourly}
            onSelectHour={setCurrentHour}
          />
        </div>

        {/* Section 6: Simulator Rangkaian Pancing Laut & Panduan Simpul (Batam Rig Guide) */}
        <div id="rig-section">
          <BatamRigSimulator />
        </div>

        {/* Section 7: Sinker & Hydrodynamic Rig Calculator */}
        <div id="sinker-section">
          <SinkerCalculator
            currentPoint={currentPoint}
          />
        </div>

        {/* Section 8: Maritime Safety Barometer */}
        <div id="safety-section">
          <SafetyBarometer
            currentPoint={currentPoint}
            weather={forecast.weather}
          />
        </div>

        {/* Section 9: Weekly 7-Day Outlook */}
        <div id="mingguan-section">
          <WeeklyForecastCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>

        {/* Section 10: Methodology & Local Wisdom Explainer */}
        <MethodologyExplainer />
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Batam OceanCast PWA</span>
            <span aria-hidden="true">·</span>
            <span>Platform Oseanografi, Rigging & Navigasi Bahari Kepulauan Riau</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Petua Melayu & Model Harmonik Pasang Surut Batam</span>
            <span aria-hidden="true">·</span>
            <span>Mode PWA Offline Aktif</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
