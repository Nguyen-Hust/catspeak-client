import { Box, Typography, TextField } from "@mui/material"
import { colors } from "@/shared/utils/colors"

const inputColorSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "50px",
    "& fieldset": {
      borderColor: colors.border,
    },
    "&:hover fieldset": {
      borderColor: colors.red[700],
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.red[700],
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: colors.red[700],
  },
}

const FormTextField = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  type = "text",
  InputProps,
}) => {
  return (
    <Box>
      <Typography
        display="block"
        gutterBottom
        sx={{ fontWeight: 700, fontSize: "0.875rem" }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        sx={inputColorSx}
        InputProps={InputProps}
      />
    </Box>
  )
}

export default FormTextField
