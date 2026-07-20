import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartInfo{

    temp: number[];
    windSpeed: number[];
    time: string[];

}


export default function ChartUI(obj:ChartInfo) {
   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura y Velocidad de Viento
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: obj.temp, label: 'temperature_2m'},
               { data: obj.windSpeed, label: 'wind_speed_10m'},
            ]}
            xAxis={[{ 
                scaleType: 'point',
                data: obj.time,
                valueFormatter: (value) => {

                    return value.endsWith('T00:00') ? value.split('T')[0].split('-')[2] : "";


                },

                tickInterval: (_,index) => index % 24 === 0,
            
            }]}
         />
      </>
   );
}