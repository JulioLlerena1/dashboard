import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';


export default function useFetchData()  {

    const  URL = "https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m";

    const [data, setData] = useState<OpenMeteoResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(URL);
                const json: OpenMeteoResponse = await response.json();
                setData(json);
            } finally {
                setLoading(false);
            }
        }

    fetchData();
    }, []);

    return { data, loading };

}
