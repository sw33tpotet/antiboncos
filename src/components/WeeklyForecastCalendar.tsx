import React from 'react';
import { Calendar, CheckCircle2, ChevronRight, Gauge, Moon, Waves, Wind } from 'lucide-react';
import { generateBatamDayForecast } from '../utils/tideMath';

interface WeeklyForecastCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export const WeeklyForecastCalendar: React.FC<WeeklyForecastCalendarProps> = ({
  selectedDate,
  onSelectDate
}) => {
  // Generate 7 consecutive days starting from today
  const weekDays = React.useMemo(() => {
    const days = [];
    const base = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const data = generateBatamDayForecast(d);
      days.push({
        date: d,
        forecast: data
      });
    }
    return days;
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden mb-8">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>OUTLOOK MINGGUAN KELAUTAN BATAM</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Kalender Pasang Surut, Fase Bulan & Potensi Ikan 7 Hari ke Depan
          </h2>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          PERENCANAAN TRIP AKHIR PEKAN & HARIAN
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {weekDays.map(({ date, forecast }, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const dayName = date.toLocaleDateString('id-ID', { weekday: 'short' });
          const dateStr = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

          const maxScore = Math.max(...forecast.hourly.map(h => h.fishActivityScore));
          const maxHigh = Math.max(...forecast.hourly.map(h => h.waterLevelMeters));
          const minLow = Math.min(...forecast.hourly.map(h => h.waterLevelMeters));

          return (
            <div
              key={index}
              onClick={() => onSelectDate(date)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-950/70 border-cyan-400 ring-2 ring-cyan-500/20 shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div>
                {/* Date & Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white uppercase">{dayName}</span>
                  <span className="text-[11px] font-mono text-cyan-400">{dateStr}</span>
                </div>

                {/* Moon Phase & Tide Type */}
                <div className="mb-3 text-[11px]">
                  <div className="text-slate-300 font-semibold truncate flex items-center gap-1">
                    <Moon className="h-3 w-3 text-amber-400 flex-shrink-0" />
                    <span>{forecast.solunar.moonPhase.split(' ')[0]}</span>
                  </div>
                  <div className="text-[10px] text-cyan-300 truncate mt-0.5">
                    {forecast.solunar.tideType}
                  </div>
                </div>

                {/* Tide Levels */}
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80 text-[10px] font-mono mb-3 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">PASANG:</span>
                    <span className="text-cyan-300 font-bold">{maxHigh.toFixed(2)}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">SURUT:</span>
                    <span className="text-slate-300 font-bold">{minLow.toFixed(2)}m</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-0.5">
                    <span className="text-slate-400">RENTANG:</span>
                    <span className="text-amber-400 font-bold">{(maxHigh - minLow).toFixed(2)}m</span>
                  </div>
                </div>

                {/* Weather snippet */}
                <div className="text-[10px] text-slate-400 font-mono space-y-0.5 mb-3">
                  <div>Angin: ~{forecast.weather.windSpeedKnots} kt</div>
                  <div>Gelombang: ~{forecast.weather.waveHeightMeters}m</div>
                </div>
              </div>

              {/* Fish Score Indicator */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono text-[9px]">POTENSI IKAN</span>
                  <span className="font-mono font-bold text-amber-400">{maxScore}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-cyan-400 h-full rounded-full"
                    style={{ width: `${maxScore}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
