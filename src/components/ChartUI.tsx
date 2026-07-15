import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

 interface ChartInfo {
     temp: number[];
     wind: number[];
     time:  string[]
 }

export default function ChartUI(obj:ChartInfo) {
   return (
      <>
         <Typography variant="h5" component="div">
            Temperature & Wind speed
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: obj.temp.slice(0,25), label: 'temperature_2m'},
               { data: obj.wind.slice(0,25), label: 'wind_speed_10m'},
            ]}
            xAxis={[{ scaleType: 'point', data: obj.time.slice(0,25) }]}
         />
      </>
   );
}