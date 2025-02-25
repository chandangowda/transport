import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Autocomplete, Box, Button, Chip, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { MuiChipsInput } from 'mui-chips-input';
import { BaseRecord, useList, useMany } from '@refinedev/core';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid2';
import { useEffect } from "react";
import { useImmer } from "use-immer";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { ClearSharp } from "@mui/icons-material";



const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep",
  "Puducherry"
];

type FormValues = {
  name: string;
  phone: string;
  state: string;
  locationAddress: string;
  vehicleNumbers: string[];
};

interface Party extends BaseRecord {
  name: string;
}

interface Customer extends BaseRecord {
  name: string;
  id: string;
  locationAddress: string;
  phone: string;
  state: string;
  vehicleNumbers: string[];
}

interface TripCreateState {
  vehicleToCustomer: {
    value: string;
    label: string;
  }[],
  advanceData: { name: string, value: number, remark: string }[],
  additionalData: { name: string, value: number, remark: string }[]

}

export const TripsCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    setValue,
    watch,
    trigger,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      state: "Karnataka",
      locationAddress: "",
      vehicleNumbers: [],
    }
  });

  const [state, setState] = useImmer<TripCreateState>({
    vehicleToCustomer: [],
    advanceData: [],
    additionalData: [],
  });

  const vehicleNum: string = watch("vehicleNum", '');

  const lorryHire: number = watch("lorryHire", 0);

  const { data: customersData, isLoading: customersIsLoading } = useList<Customer>({
    resource: "customers"
  });

  const { data: partyData, isLoading: partyIsLoading } = useList<Party>({
    resource: "party"
  });

  useEffect(() => {
    if (customersData && customersData.data) {
      const formattedData = customersData?.data?.flatMap((eachCustomer) =>
        eachCustomer.vehicleNumbers.map((eachVehicle) => ({
          value: eachCustomer.id,
          label: eachVehicle
        }))
      );
      setState(draft => {
        draft.vehicleToCustomer = formattedData;
      })
    }
  }, [customersData])

  const handleAdvanceRow = () => {
    setState(draft => {
      draft.advanceData.push({ name: '', value: 0, remark: '' });
    })
  }

  const handleInputChange = (id: number, field: string, value: string) => {
    isNaN(Number(value));
    setState(draft => {
      draft.advanceData = draft.advanceData.map((row, index) => (index === id ? { ...row, [field]: isNaN(Number(value)) ? value : Number(value) } : row))
    })
  };

  const handleRemoveRow = (rowIndex: number) => {
    setState(draft => {
      draft.advanceData = draft.advanceData.filter((_, index) => rowIndex !== index)
    })
  };


  const handleAdvanceRowAdditional = () => {
    setState(draft => {
      draft.additionalData.push({ name: '', value: 0, remark: '' });
    })
  }

  const handleInputChangeAdditional = (id: number, field: string, value: string) => {
    setState(draft => {
      draft.additionalData = draft.additionalData.map((row, index) => (index === id ? { ...row, [field]: isNaN(Number(value)) ? value : Number(value) } : row))
    })
  };

  const handleRemoveRowAdditional = (rowIndex: number) => {
    setState(draft => {
      draft.additionalData = draft.additionalData.filter((_, index) => rowIndex !== index)
    })
  };

  const calculateRemainingBalance = () => {
    if (lorryHire == 0) {
      return 0
    }
    const totalValue = state.advanceData.reduce((sum, item) => sum + (item.value || 0), 0);
    return lorryHire - totalValue;
  }

  const calculateAdditionalAmount = () => {
    return state.additionalData.reduce((sum, item) => sum + (item.value || 0), 0);
  }


  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <TextField
              {...register("tripSource", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.tripName}
              helperText={(errors as any)?.tripName?.message}
              margin="normal"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              type="text"
              label={"Trip Source"}
              name="tripSource"
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <TextField
              {...register("tripDestination", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.tripName}
              helperText={(errors as any)?.tripName?.message}
              margin="normal"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              type="text"
              label={"Trip Destination"}
              name="tripDestination"
              size="small"
            />
          </Grid>

        </Grid>

        <Controller
          control={control}
          {...register("tripDate", {
            required: "This field is required",
          })}
          render={({ field }) => {
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Trip Data"
                  defaultValue={dayjs()}
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            );
          }}
        />

        <Controller
          control={control}
          {...register("party", {
            required: "This field is required",
          })}
          render={({ field }) => {
            return (
              <>
                <InputLabel variant="standard" htmlFor="party-select">
                  Select Party
                </InputLabel>

                <Select
                  {...field}
                  value={field?.value || "Wood Picker"}
                  id="party-select"
                  size="small"
                >
                  {partyData?.data?.map((party: { name: string }, index) => (
                    <MenuItem key={index} value={party.name}>
                      {party.name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            );
          }}
        />

        <Controller
          control={control}
          name={"vehicleNum"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              options={state.vehicleToCustomer}
              onChange={(_, value) => {
                field.onChange(value?.label);
              }}
              getOptionLabel={(item) => {
                return (
                  state.vehicleToCustomer?.find((p) => {
                    return item.label.toLowerCase() === p.label.toLowerCase();
                  })?.label ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                return value === undefined || option.label.toLowerCase() === value.label.toLowerCase();
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Vehicle Number"}
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.vehicleNum}
                  helperText={(errors as any)?.vehicleNum?.message}
                  required
                  size="small"
                />
              )}
            />
          )}
        />

        <Typography variant="body1" fontWeight="bold">
          {"Customer Name"}
        </Typography>
        <TextField size="small" value={customersData?.data.find(eachCustomer => {
          const vehicleInfo = state.vehicleToCustomer.find(eachVehicle => eachVehicle.label === vehicleNum);
          return eachCustomer.id === vehicleInfo?.value;
        })?.name || ""} />


        <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <TextField
              {...register("tripQuantity", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.tripQuantity}
              helperText={(errors as any)?.tripQuantity?.message}
              margin="normal"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              type="number"
              label={"Trip Quantity"}
              name="tripQuantity"
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <TextField
              {...register("tripQuantityUnit", {
                required: "This field is required",
              })}
              error={!!(errors as any)?.tripQuantityUnit}
              helperText={(errors as any)?.tripQuantityUnit?.message}
              margin="normal"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              type="text"
              label={"Unit"}
              name="tripQuantityUnit"
              size="small"
            />
          </Grid>

        </Grid>

        <TextField
          {...register("tripAmount", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.tripQuantity}
          helperText={(errors as any)?.tripQuantity?.message}
          margin="normal"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          type="number"
          label={"Trip Amount"}
          name="tripAmount"
          size="small"
        />


        <TextField
          {...register("lorryHire", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.lorryHire}
          helperText={(errors as any)?.lorryHire?.message}
          margin="normal"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          type="number"
          label={"Lorry Hire"}
          name="lorryHire"
          size="small"
        />

        <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }} marginTop={5}>
          <Typography variant="body1" fontWeight="bold">
            {"Advance"}
          </Typography>

          <AddSharpIcon
            color="primary"
            sx={{
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.2)",
                color: "secondary.main"
              },
              "&:active": {
                transform: "scale(0.9)"
              }
            }}
            onClick={handleAdvanceRow}
          />

        </Grid>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          {
            state.advanceData.map((eachData, index) => (
              <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                <Grid size={{ xs: 4, sm: 4, md: 4 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                    type="text"
                    label={"Name"}
                    value={eachData.name}
                    size="small"
                    onChange={(value => {
                      handleInputChange(index, 'name', value.target.value)

                    })}
                  />
                </Grid>
                <Grid size={{ xs: 3, sm: 3, md: 2 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                    type="number"
                    label={"Value"}
                    size="small"
                    value={eachData.value}
                    onChange={(value => {
                      console.log('value.target.value', value.target.value);
                      handleInputChange(index, 'value', value.target.value)
                    })}
                  />
                </Grid>
                <Grid size={{ xs: 4, sm: 4, md: 5 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                    type="text"
                    label={"Remarks"}
                    name="tripDestination"
                    size="small"
                    value={eachData.remark}
                    onChange={(value => {
                      handleInputChange(index, 'remark', value.target.value)
                    })}
                  />
                </Grid>
                <Grid size={{ xs: 1, sm: 1, md: 1 }} sx={{ display: "flex", marginTop: "5px", alignItems: "center", justifyContent: "flex-start" }}
                >
                  <ClearSharp color="primary"
                    onClick={() => {
                      handleRemoveRow(index);
                    }}
                    sx={{
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.2)",
                        color: "secondary.main"
                      },
                      "&:active": {
                        transform: "scale(0.9)"
                      }
                    }} />
                </Grid>

              </Grid>
            ))
          }
        </Box>

        <Typography variant="body1" fontWeight="bold" margin="normal">
          {"Remaining Amount"}
        </Typography>
        <TextField size="small"
          value={calculateRemainingBalance()} />



        <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }} marginTop={5}>
          <Typography variant="body1" fontWeight="bold" >
            {"Additional Charges"}
          </Typography>

          <AddSharpIcon
            color="primary"
            sx={{
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.2)",
                color: "secondary.main"
              },
              "&:active": {
                transform: "scale(0.9)"
              }
            }}
            onClick={handleAdvanceRowAdditional}
          />

        </Grid>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          {
            state.additionalData.map((eachData, index) => (
              <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                <Grid size={{ xs: 4, sm: 4, md: 4 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                    type="text"
                    label={"Name"}
                    value={eachData.name}
                    size="small"
                    onChange={(value => {
                      handleInputChangeAdditional(index, 'name', value.target.value)
                    })}
                  />
                </Grid>
                <Grid size={{ xs: 3, sm: 3, md: 2 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                    type="number"
                    label={"Value"}
                    size="small"
                    value={eachData.value}
                    onChange={(value => {
                      console.log('value.target.value', value.target.value);
                      handleInputChangeAdditional(index, 'value', value.target.value)
                    })}
                  />
                </Grid>
                <Grid size={{ xs: 4, sm: 4, md: 5 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                    type="text"
                    label={"Remarks"}
                    name="tripDestination"
                    size="small"
                    value={eachData.remark}
                    onChange={(value => {
                      handleInputChangeAdditional(index, 'remark', value.target.value)
                    })}
                  />
                </Grid>
                <Grid size={{ xs: 1, sm: 1, md: 1 }} sx={{ display: "flex", marginTop: "5px", alignItems: "center", justifyContent: "flex-start" }}
                >
                  <ClearSharp color="primary"
                    onClick={() => {
                      handleRemoveRowAdditional(index);
                    }}
                    sx={{
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.2)",
                        color: "secondary.main"
                      },
                      "&:active": {
                        transform: "scale(0.9)"
                      }
                    }} />
                </Grid>

              </Grid>
            ))
          }
        </Box>

        <Typography variant="body1" fontWeight="bold" margin="normal">
          {"Additional Amount"}
        </Typography>
        <TextField size="small"
          value={calculateAdditionalAmount()} />
      </Box>




    </Create>
  );
};
