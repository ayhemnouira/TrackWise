import React from "react";
import { TextField, Typography, Box } from "@mui/material";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  type?: string;
  error?: boolean;
  helperText?: string;
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  error,
  helperText,
}: CustomInputProps<T>) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="body2"
        sx={{
          marginBottom: 0.5,
          fontWeight: 500,
          color: "text.primary",
          letterSpacing: "0.2px",
        }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        size="medium"
        placeholder={placeholder}
        type={type}
        {...control.register(name)}
        error={error}
        helperText={helperText}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "#fff",
            "& fieldset": { borderColor: "#e5e7eb" },
            "&:hover fieldset": { borderColor: "#9ca3af" },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: "2px",
            },
          },
          "& .MuiInputBase-input": {
            padding: "12px 16px",
            fontSize: "15px",
            color: "text.primary",
          },
          "& .MuiFormHelperText-root": { fontSize: "12px", marginLeft: "14px" },
        }}
      />
    </Box>
  );
};

export default CustomInput;
