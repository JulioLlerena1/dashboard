import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({

      id: index,
      date: label.split("T")[0],
      label: label.split("T")[1],
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Fecha",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "label",
    headerName: "Hora",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "value1",
    headerName: "Temp °C",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "value2",
    headerName: "Velocidad de viento",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
];


 interface ChartInfo {
     temp: number[];
     wind: number[];
     time:  string[]
 }

export default function TableUI(obj:ChartInfo) {

   const rows = combineArrays(obj.time, obj.temp, obj.wind);

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