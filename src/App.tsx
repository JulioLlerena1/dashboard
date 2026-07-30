import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import WeatherCalendarUI from './components/WeatherCalendarUI';
import { useState } from 'react';

import './App.css'

function App() {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { data, loading, error } = useFetchData(selectedOption);

  if (loading) {

    return (
      <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center" }}>

        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12, md: 12 }} container sx={{ justifyContent: "right", alignItems: "center" }}><AlertUI description="Esta es una alerta de éxito" /></Grid>

        {/* Selector */}
        <Grid size={{ xs: 12, md: 3 }}><SelectorUI onOptionSelect={setSelectedOption} /></Grid>

        {/* Indicadores */}
        <Grid container size={{ xs: 12, md: 9 }} >

          <Grid size={{ xs: 12, md: 3 }}>
            <img src="/workspaces/dashboard/src/assets/loading-2.gif" alt="Mi gif animado" />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <img src="/workspaces/dashboard/src/assets/loading-2.gif" alt="Mi gif animado" />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <img src="/workspaces/dashboard/src/assets/loading-2.gif" alt="Mi gif animado" />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <img src="/workspaces/dashboard/src/assets/loading-2.gif" alt="Mi gif animado" />
          </Grid>

        </Grid>

        {/* Gráfico */}
        <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
          <img src="/workspaces/dashboard/src/assets/loading-2.gif" alt="Mi gif animado" />
        </Grid>

        {/* Tabla */}
        <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
          <img src="/workspaces/dashboard/src/assets/loading-2.gif" alt="Mi gif animado" />
        </Grid>

        {/* Información adicional */}
        <Grid size={{ xs: 12, md: 12 }} >
          <img src="/workspaces/dashboard/src/assets/loading-2.gif" alt="Mi gif animado" />
        </Grid>

      </Grid>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center" }}>

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }} container sx={{ justifyContent: "right", alignItems: "center" }}><AlertUI description="Esta es una alerta de éxito" /></Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}><SelectorUI onOptionSelect={setSelectedOption} /></Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} >

        <Grid size={{ xs: 12, md: 3 }}>
          {data &&
            (<IndicatorUI
              title='Temperatura (2m)'
              description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`} />)
          }
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {data &&
            (<IndicatorUI
              title='Temperatura Aparente (2m)'
              description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`} />)
          }
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {data &&
            (<IndicatorUI
              title='Velocidad del Viento'
              description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`} />)
          }
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {data &&
            (<IndicatorUI
              title='Humedad Relativa'
              description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`} />)
          }
        </Grid>

      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        {data && 
        
        (<ChartUI time={data.hourly.time} temp={data.hourly.temperature_2m} windSpeed={data.hourly.wind_speed_10m} />)

        }
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        {data &&

        <TableUI date={data.hourly.time} temp={data.hourly.temperature_2m} windSpeed={data.hourly.wind_speed_10m} />
        }
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>
        {data && (
          <WeatherCalendarUI
            time={data.hourly.time}
            temperature={data.hourly.temperature_2m}
            weatherCode={data.hourly.weather_code}
          />
        )}
      </Grid>

    </Grid>

  )
}

export default App;
