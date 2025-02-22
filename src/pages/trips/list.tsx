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
    >

      <DataGrid
        {...dataGridProps}
        columns={columns}
      />
    </List>
  );
};
