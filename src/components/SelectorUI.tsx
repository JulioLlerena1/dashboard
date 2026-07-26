import { Box, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, Typography } from '@mui/material';
import { useState } from 'react';

interface SelectorProps {
   onOptionSelect: (option: string) => void;
}


export default function SelectorUI({ onOptionSelect }: SelectorProps) {

   const [cityInput, setCityInput] = useState('guayaquil');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCityInput(event.target.value);
        onOptionSelect(event.target.value);
    };

   return (
      <Box sx={{ p: { xs: 2, md: 2.5 } }}>
         <Typography
            variant="subtitle1"
            sx={{
               fontWeight: 700,
               color: '#1e293b',
               mb: 1.2,
               letterSpacing: '-0.01em',
            }}
         >
            Selecciona una ciudad
         </Typography>

         <FormControl fullWidth size="small">
            <InputLabel id="city-select-label">Ciudad</InputLabel>
            <Select
               labelId="city-select-label"
               id="city-simple-select"
               label="Ciudad"
               onChange={handleChange}
               value={cityInput}
               sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgba(148, 163, 184, 0.45)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#2563eb',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#2563eb',
                  },
               }}>

               <MenuItem value="" disabled><em>Seleccione una ciudad</em></MenuItem>
               <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
               <MenuItem value={"quito"}>Quito</MenuItem>
               <MenuItem value={"manta"}>Manta</MenuItem>
               <MenuItem value={"cuenca"}>Cuenca</MenuItem>
            </Select>
         </FormControl>

         {cityInput && (
            <Typography
               variant="caption"
               sx={{
                  mt: 1.5,
                  color: '#334155',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
               }}
            >
               Información del clima en <Box component="span" sx={{ textTransform: 'capitalize', fontWeight: 700, color: '#1d4ed8' }}>{cityInput}</Box>
            </Typography>
         )}
      </Box>
   )
}