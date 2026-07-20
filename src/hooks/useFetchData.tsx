import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'guayaquil': { latitude: -2.1962, longitude: -79.8862 },
  'quito': { latitude: -0.2298, longitude: -78.525 },
  'manta': { latitude: -0.9494, longitude: -80.7314 },
  'cuenca': { latitude: -2.8953, longitude: -78.9963 },
};


export default function useFetchData(selectedOption: string | null)  {


    const [data, setData] = useState<OpenMeteoResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const cityConfig = selectedOption != null? CITY_COORDS[selectedOption] : CITY_COORDS["guayaquil"];
            
            const  URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;
            try {
                const response = await fetch(URL);
                const json: OpenMeteoResponse = await response.json();
                setData(json);
            } finally {
                setLoading(false);
            }
        }

    fetchData();
    }, [selectedOption]);

    return { data, loading };

}
