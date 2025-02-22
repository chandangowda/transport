import { Add, ArrowDropDown } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Chip, ListItem, Menu, MenuItem, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  CreateButton,
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

export const TripsList = () => {
  const { dataGridProps } = useDataGrid({});
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route?: string) => {
    setAnchorEl(null);
    if (route) navigate(route);
  };


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
    <List
      title="List "
      breadcrumb={<Breadcrumbs aria-label="breadcrumbs">
        {['Home', 'TV Shows', 'Futurama', 'Characters'].map((item: string) => (
          <Link key={item} color="neutral" to="#basics">
            {item}
          </Link>
        ))}
        <Typography>Dr. Zoidberg</Typography>
      </Breadcrumbs>}
      headerButtons={
        <div style={{ display: "flex", gap: "8px" }}>
          {/* Create Button */}
          <CreateButton />

          {/* Dropdown Button */}
          <Button
            variant="contained"
            onClick={handleClick}
            endIcon={<ArrowDropDown />}
          >
            More
          </Button>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
          >
            <MenuItem onClick={() => handleClose("/create-option1")}>
              Create Option 1
            </MenuItem>
            <MenuItem onClick={() => handleClose("/create-option2")}>
              Create Option 2
            </MenuItem>
          </Menu>
        </div>
      }
    >

      <DataGrid
        {...dataGridProps}
        autosizeOptions={{ columns: ["vehicleNumbers"], expand: true }}
        columns={columns}
      />
    </List>
  );
};
