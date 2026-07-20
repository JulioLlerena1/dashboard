import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { Skeleton } from "@mui/material";
import {useState } from 'react';


function App() {
   
   const [selectedOption, setSelectedOption] = useState<string | null>(null);
   const { data, loading } = useFetchData(selectedOption);


   return (
      <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center" }}>

         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}>
            <HeaderUI></HeaderUI>
         </Grid>

         {/* Alertas */}
         <Grid  container sx={{ justifyContent: "right", alignItems: "center" }} size={{ xs: 12, md: 12 }}>
            <AlertUI description="No se preveen lluvias"></AlertUI>
         </Grid>

         {/* Selector */}
         <Grid size={{ xs: 12, md: 3 }}><SelectorUI onOptionSelect={setSelectedOption} /></Grid>

         {/* Indicadores */}
         <Grid container size={{ xs: 12, md: 9 }}>
            
            <Grid size={{ xs: 12, md: 3 }}>

               {loading ? (
                     <Skeleton
                        variant="rounded"
                        width="97%"
                        height={100}
                        animation="wave"
                     />
                  ) : 
                  (data &&
                     (<IndicatorUI
                     title='Temperatura'
                     description={ `${data.current.temperature_2m} ${data.current_units.temperature_2m}` } />)
               )}

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
               {loading ? (
                     <Skeleton
                        variant="rounded"
                        width="97%"
                        height={100}
                        animation="wave"
                     />
                  ) :  data &&
                  (<IndicatorUI
                        title='Temp. aparente'
                        description={ `${data.current.apparent_temperature} ${data.current_units.apparent_temperature}` } />)
               }
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
               {data &&
                  (<IndicatorUI
                        title='Velocidad del viento'
                        description={ `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}` } />)
               }
               
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
               {data &&
                  (<IndicatorUI
                        title='Humedad relativa'
                        description={ `${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}` } />)
               }

            </Grid>
            
         </Grid>

         {/* Gráfico */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block"} }}>

            {data &&
                  (<ChartUI time={data.hourly.time} temp={data.hourly.temperature_2m} wind={data.hourly.wind_speed_10m}/>)
            }

            
         </Grid>

         {/* Tabla */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block"} }}>
            {data &&
                  (<TableUI time={data.hourly.time} temp={data.hourly.temperature_2m} wind={data.hourly.wind_speed_10m}  />)
            }
            
         </Grid>

         {/* Información adicional */}
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

      </Grid>
   );
}

export default App
