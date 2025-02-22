import { Box, Chip, Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  MarkdownField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export const TripsShow = () => {
  const { query } = useShow({});

  const { data, isLoading } = query;

  const record = data?.data;


  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="bold">
          {"Name"}
        </Typography>
        <TextField value={record?.name} />

        <Typography variant="body1" fontWeight="bold">
          {"Phone num"}
        </Typography>
        <TextField value={record?.phone} />

        <Typography variant="body1" fontWeight="bold">
          {"State"}
        </Typography>
        <TextField value={record?.state} />

        <Typography variant="body1" fontWeight="bold">
          {"Location Address"}
        </Typography>
        <TextField value={record?.locationAddress} />
        <Typography variant="body1" fontWeight="bold">
          {"Vehicle Number"}
        </Typography>
        <Box style={{ display: 'flex', gap: "10px", flexWrap:'wrap' }}>
          {
            record?.vehicleNumbers.map((eachValue: string) => 
              (<Chip variant="outlined" label={eachValue} color="info" size="small" />))
          }
        </Box>
      </Stack>
    </Show>
  );
};
