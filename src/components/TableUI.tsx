import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({

      id: index,
      date: label.split('T')[0],
      hour: label.split('T')[1],
      value1: arrValues1[index],
      value2: arrValues2[index]

   }));
}

const columns: GridColDef[] = [
   { field: 'date',
     headerName: 'Fecha',
     flex: 1,
   },
   {
      field: 'hour',
      headerName: 'Hora',
      flex:1,
   },
   {
      field: 'value1',
      headerName: 'Temperatura',
      flex:1,
   },
   {
      field: 'value2',
      headerName: 'Velocidad',
      flex:1,
   },
];



interface TableInfo{

    date: string[];
    temp: number[];
    windSpeed: number[];

}

export default function TableUI(obj: TableInfo) {

   const rows = combineArrays(obj.date, obj.temp, obj.windSpeed);

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 24,
                  },
               },
            }}
            pageSizeOptions={[24]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}