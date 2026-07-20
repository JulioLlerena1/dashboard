import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

const CITYCOORDS: Record<string, { latitude: number; longitude: number }> = {
    'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
    'Quito': { latitude: -0.1807, longitude: -78.4678 },
    'Manta': { latitude: -0.9471, longitude: -80.7089 },
    'Cuenca': { latitude: -2.9006, longitude: -79.0045 }
};

export default function useFetchData(selectedOption: string | null) : OpenMeteoResponse {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);

    const cityConfig = selectedOption != null? CITYCOORDS[selectedOption] : CITYCOORDS['Guayaquil'];

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;

    useEffect(() => {
        const fetchData = async () => {

            try {

                const response = await fetch(url);
                const jsonData: OpenMeteoResponse = await response.json();

                setData(jsonData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedOption]);

    return data as OpenMeteoResponse;

}
