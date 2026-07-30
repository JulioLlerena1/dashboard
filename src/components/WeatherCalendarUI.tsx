import { Box, Card, CardMedia, Grid, Typography } from '@mui/material';
import soleado from '../assets/clima/soleado.png';
import nublado from '../assets/clima/nublado.png';
import lluvia from '../assets/clima/lluvia.png';
import nieve from '../assets/clima/nieve.png';
import tormenta from '../assets/clima/tormenta.png';

interface WeatherCalendarInfo {
  time: string[];
  temperature: number[];
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

export default function WeatherCalendarUI({ time, temperature, weatherCode }: WeatherCalendarInfo) {
  if (!time.length) {
    return null;
  }

  const today = new Date(time[0]).toISOString().split('T')[0];

  const entries = time
    .map((value, index) => ({
      originalTime: value,
      hourLabel: new Date(value).toLocaleTimeString('es-EC', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      temperature: temperature[index],
      weatherCode: weatherCode?.[index],
    }))
    .filter((entry) => entry.originalTime.startsWith(today));

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Clima de hoy
      </Typography>

      <Grid container spacing={2}>
        {entries.map((entry) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={entry.originalTime}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                borderRadius: 3,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <Typography variant="caption" color="text.secondary">
                  {entry.hourLabel}
                </Typography>

                <CardMedia
                  component="img"
                  image={getWeatherIcon(entry.weatherCode)}
                  alt="Icono del clima"
                  sx={{ width: 64, height: 64, objectFit: 'contain' }}
                />

                <Typography variant="body1" >
                  {entry.temperature.toFixed(1)} °C
                </Typography>

            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
