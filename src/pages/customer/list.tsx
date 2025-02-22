import { Box, Chip, ListItem, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export const CustomersList = () => {
  const { dataGridProps } = useDataGrid({});


  console.log("dataGridProps", dataGridProps);

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "phone",
        headerName: "Phone num",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "state",
        headerName: "State",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "vehicleNumbers",
        headerName: "Vehicle Numbers",
        display: "flex",
        minWidth: 200,
        flexWrap: "wrap",
        renderCell: function render({ row }) {
          console.log('row', row);
          return (
            <Box style={{ display: 'flex', gap: "10px", flexWrap: "wrap" }}>
              {
                row.vehicleNumbers.map((eachValue: string) => (<Chip variant="outlined" label={eachValue} color="info" size="small" />))

              }
            </Box>
          )


        }
      },
      {
        field: "actions",
        headerName: "Actions",
        align: "right",
        headerAlign: "right",
        minWidth: 120,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        autosizeOptions={{ columns: ["vehicleNumbers"], expand: true }}
        columns={columns}
      />
    </List>
  );
};
