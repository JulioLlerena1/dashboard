import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData() : OpenMeteoResponse | null {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);

    const url = 'https://api.open-meteo.com/v1/forecast?latitude=-1.25&longitude=-78.25&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FNew_York';

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
    }, []);

    return data;

}
