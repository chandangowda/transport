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

  const selectedCustomerId: string = watch("customer", '');

  const dieselAmount: number = watch("dieselAmount", 0);
  const amountPaid: number = watch("amountPaid", 0);
  const tripAmount: number = watch("tripAmount", 0);

  const { data: customersData, isLoading: customersIsLoading } = useList<Customer>({
    resource: "customers"
  });

  const { data: partyData, isLoading: partyIsLoading } = useList<Party>({
    resource: "party"
  });

  console.log("customersData", customersData?.data);


  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("tripName", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.tripName}
          helperText={(errors as any)?.tripName?.message}
          margin="normal"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          type="text"
          label={"Trip Name"}
          name="tripName"
        />

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
                />
              </LocalizationProvider>
            );
          }}
        />

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
        />

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
          {...register("customer", {
            required: "This field is required",
          })}
          render={({ field }) => {
            return (
              <>
                <InputLabel variant="standard" htmlFor="customer-select">
                  Select Customer
                </InputLabel>

                <Select
                  {...field}
                  value={field?.value || ""}
                  id="customer-select"
                >
                  {customersData?.data?.map((party, index) => (
                    <MenuItem key={index} value={party.id}>
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
          {...register("vehicleNum", {
            required: "This field is required",
          })}
          render={({ field }) => {
            return (
              <>
                <InputLabel variant="standard" htmlFor="vehicle-select">
                  Select Vehicle
                </InputLabel>

                <Select
                  {...field}
                  value={field?.value || ""}
                  id="vehicle-select"
                >
                  {customersData?.data?.filter(eachCustomer => selectedCustomerId &&
                    selectedCustomerId.length > 0 && eachCustomer.id == selectedCustomerId)
                    .at(0)
                    ?.vehicleNumbers
                    .map((eachData, index) => (
                      <MenuItem key={index} value={eachData}>
                        {eachData}
                      </MenuItem>
                    ))}
                </Select>
              </>
            );
          }}
        />

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

        />

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

        />

        <TextField
          {...register("dieselAmount", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.tripQuantity}
          helperText={(errors as any)?.tripQuantity?.message}
          margin="normal"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          type="number"
          label={"Diesel Amount Paid"}
          name="dieselAmount"
        />

        <TextField
          {...register("amountPaid", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.tripQuantity}
          helperText={(errors as any)?.tripQuantity?.message}
          margin="normal"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          type="number"
          label={"Amount Paid"}
          name="amountPaid"
        />

        <Typography variant="body1" fontWeight="bold">
          {"Remaining Amount"}
        </Typography>
        <TextField value={tripAmount - dieselAmount - amountPaid} />



        {/* <TextField
          {...register("phone", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.phone}
          helperText={(errors as any)?.phone?.message}
          margin="normal"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          type="text"
          label={"Phone num"}
          name="phone"
        />


        <Controller
          control={control}
          {...register("state", {
            required: "This field is required",
          })}
          render={({ field }) => {
            return (
              <>
                <InputLabel variant="standard" htmlFor="state-select">
                  Select State
                </InputLabel>

                <Select
                  {...field}
                  value={field?.value || "Karnataka"}
                  id="state-select"
                >
                  {indianStates.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </>
            );
          }}
        />

        <TextField
          {...register("locationAddress", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.locationAddress}
          helperText={(errors as any)?.locationAddress?.message}
          margin="normal"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          type="text"
          label={"Location Address"}
          name="locationAddress"
          multiline
          rows={2}
        /> */}

      </Box>
    </Create>
  );
};
