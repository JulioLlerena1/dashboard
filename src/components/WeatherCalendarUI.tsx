import { Box, Card, CardMedia, Grid, Typography } from '@mui/material';
import soleado from '../assets/clima/soleado.png';
import nublado from '../assets/clima/nublado.png';
import lluvia from '../assets/clima/lluvia.png';
import nieve from '../assets/clima/nieve.png';
import tormenta from '../assets/clima/tormenta.png';

interface WeatherCalendarInfo {
  time: string[];
  temperature?: number[];
  weatherCode?: number[];
}

function getWeatherIcon(code?: number) {
  if (code === undefined) {
    return nublado;
  }

  if ([0, 1, 2].includes(code)) {
    return soleado;
  }

  if ([3, 45, 48].includes(code)) {
    return nublado;
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return lluvia;
  }

  if ([71, 73, 75, 77].includes(code)) {
    return nieve;
  }

  if ([95, 96, 99].includes(code)) {
    return tormenta;
  }

  return nublado;
}

function getWeatherName(code?: number) {
  if (code === undefined) return 'Desconocido';
  if ([0, 1, 2].includes(code)) return 'Soleado';
  if ([3, 45, 48].includes(code)) return 'Nublado';
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'Lluvia';
  if ([71, 73, 75, 77].includes(code)) return 'Nieve';
  if ([95, 96, 99].includes(code)) return 'Tormenta';
  return 'Desconocido';
}

export default function WeatherCalendarUI({ time, weatherCode }: WeatherCalendarInfo) {
  if (!time.length) {
    return null;
  }

  const today = new Date(time[0]).toISOString().split('T')[0];

  const allEntries = time
    .map((value, index) => ({
      originalTime: value,
      dateIso: value.split('T')[0],
      // Extract hour:minute directly from ISO string to avoid timezone shifts
      timeLabel: value.includes('T') ? value.split('T')[1].slice(0,5) : new Date(value).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' }),
      dateLabel: new Date(value).toLocaleDateString('es-EC', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
      }),
      weatherCode: weatherCode?.[index],
    }));

  const todayEntries = allEntries.filter((entry) => entry.dateIso === today);

  const entriesForDay = todayEntries.length ? todayEntries : allEntries;

  // Select hours starting at 06:00, step 3h until 21:00 -> [6,9,12,15,18,21]
  const desiredHours = [6, 9, 12, 15, 18, 21];

  const selected = entriesForDay
    .filter((entry) => {
      const hourStr = entry.originalTime.includes('T') ? entry.originalTime.split('T')[1].slice(0,2) : String(new Date(entry.originalTime).getHours()).padStart(2, '0');
      const hour = Number(hourStr);
      return desiredHours.includes(hour);
    })
    .sort((a, b) => new Date(a.originalTime).getTime() - new Date(b.originalTime).getTime());

  // Fallback: if no matching hours found, pick first two entries
  if (selected.length === 0) {
    const fallback = entriesForDay.slice(0, 2);
    selected.push(...fallback);
  }

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Clima de hoy
      </Typography>

      <Grid container spacing={2} sx={{ alignItems: 'stretch', justifyContent: 'center' }}>
        {selected.map((entry) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={entry.originalTime}>
            <Card
              variant="outlined"
              sx={{
                width: '100%',
                minHeight: 180,
                borderRadius: 3,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
              }}
            >
                <CardMedia
                  component="img"
                  image={getWeatherIcon(entry.weatherCode)}
                  alt="Icono del clima"
                  sx={{ width: 72, height: 72, objectFit: 'contain', mb: 1 }}
                />

                <Typography variant="h6" sx={{ fontWeight: 600, mt: 0.5, textAlign: 'center' }}>
                  {getWeatherName(entry.weatherCode)}
                </Typography>

                <Box sx={{ mt: 1, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {entry.dateLabel}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {entry.timeLabel}
                  </Typography>
                </Box>

            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
