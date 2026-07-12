import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

export default function SelectorUI() {
   // 1. Declaramos la variable de estado inicializada en string vacío
   const [ciudad, setCiudad] = useState('');

   // 2. Creamos la función para actualizar el estado cuando el usuario elige una opción
   const handleChange = (event: SelectChangeEvent) => {
      setCiudad(event.target.value);
   };

   return (
      <FormControl fullWidth>
         <InputLabel id="city-select-label">Ciudad</InputLabel>
         <Select
            labelId="city-select-label"
            id="city-simple-select"
            label="Ciudad"
            value={ciudad} // <-- Pasamos el estado
            onChange={handleChange} // <-- Pasamos la función de cambio
         >
            {/* 3. Agregamos value="" al placeholder para que empate con el estado inicial */}
            <MenuItem value="" disabled><em>Seleccione una ciudad</em></MenuItem>
            <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
            <MenuItem value={"quito"}>Quito</MenuItem>
            <MenuItem value={"manta"}>Manta</MenuItem>
            <MenuItem value={"cuenca"}>Cuenca</MenuItem>
         </Select>
      </FormControl>
   )
}