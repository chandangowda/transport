import { Autocomplete, Box, InputLabel, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { MuiChipsInput } from "mui-chips-input";
import { Controller } from "react-hook-form";


const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep",
  "Puducherry"
];

export const CustomersEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading },
    register,
    control,
    formState: { errors },
    setValue,
    trigger,
    watch
  } = useForm({});

  const blogPostsData = queryResult?.data?.data;

  const vehicleNumbers: string[] = watch("vehicleNumbers", []);

  const handleAddVehicle = (value: string[]) => {
    if (value) {
      let updatedValue = [...value];
      setValue("vehicleNumbers", updatedValue);
      trigger("vehicleNumbers");
    }
  };

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          type="text"
          label={"Name"}
          name="name"
          size='small'
        />
        <TextField
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
          size='small'
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
                  size='small'
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
          size='small'
        />

        <Controller
          control={control}
          {...register("vehicleNumbers", {
            required: "This field is required",
          })}
          render={({ field }) => {
            return (
              <>
                <MuiChipsInput

                  label="Enter vehicle num"
                  placeholder='Enter vehicle num'
                  value={vehicleNumbers}
                  error={!!(errors as any)?.vehicleNumbers}
                  helperText={(errors as any)?.vehicleNumbers?.message}
                  margin="normal"
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                  name="vehicleNumbers"
                  size='small'
                  onChange={handleAddVehicle}
                />
              </>
            );
          }}
        />

      </Box>
    </Edit>
  );
};
