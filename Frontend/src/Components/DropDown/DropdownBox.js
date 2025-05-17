import React from "react";
import { Autocomplete,TextField } from "@mui/material";

const DropdownBox = ({
    label,
    name,
    register,
    setValue,
    error,
    helperText,
    options,
}) => {
    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.name}
            onChange={(_, selectedOption) => {
                setValue(name, selectedOption ? selectedOption.name : "", {
                    shouldValidate: true,
                });
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={label}
                    fullWidth
                    error={!!error}
                    helperText={helperText}
                />
            )}
        />
    );
};

export default DropdownBox;
