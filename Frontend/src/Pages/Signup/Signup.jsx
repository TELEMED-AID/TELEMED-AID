import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import LogoTitle from "../../Components/LogoTitle/LogoTitle";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import SearchableDropDown from "../../Components/DropDown/SearchableDropDown";
import { countries } from "../../Utils/HelpingObjects";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState();
  const [userCountry, setUserCountry] = useState(null);
  // const {loading: pageLoading, getUser} = useGetUser();
  const [showPassword, setShowPassword] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const NationalIdField = useRef(null);
  const inputPassword = useRef(null);
  const { error } = {};

  useEffect(() => {
    if (error) {
      if (NationalIdField.current) {
        NationalIdField.current.focus();
        NationalIdField.current.value = "";
      }
      if (inputPassword.current) {
        inputPassword.current.value = "";
      }
    }
  }, [error]);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // const { error, loading } = useSignup(userData ? userData : null);
  const onSignupSubmit = (data) => {
    console.log("Signup data", data);
    setUserData(data);
  };

  const toggelVisabiltyForPlannerEmail = async (state) => {
    setIsDoctor(state);
  };

  return (
    <form onSubmit={handleSubmit(onSignupSubmit)} className="formWrapper">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#fff",
        }}
      >
        <Box
          spacing={2}
          justifyContent="flex-end"
          xs={12}
        >
          <Typography variant="h3" className="SignupTitle" sx={{ mb: 3 }}>
            Signup Page
          </Typography>

          <Grid item xs={6}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Full Name
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Full Name"
              {...register("fullName", { required: "Full Name is required" })}
              helperText={errors.fullName?.message}
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* National ID */}
          <Typography variant="body1">National ID</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="National ID"
            {...register("nationalId", { required: "National ID is required" })}
            helperText={errors.nationalId?.message}
            sx={{ mb: 2 }}
          />

          {/* Country */}
          <Typography variant="body1">Country</Typography>
          <SearchableDropDown
            state={userCountry}
            setState={(value) => setUserCountry(value || null)}
            {...register("country", { required: "Country is required" })}
            name="country"
            placeholder="Select Country"
            items={countries}
            dropDownError={errors.country}
            helperText={errors.country?.message}
            sx={{ mb: 2 }}
          />

          {/* Phone Number */}
          <Typography variant="body1">Phone Number</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Phone Number"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            helperText={errors.phoneNumber?.message}
            sx={{ mb: 2 }}
          />

          {/* Date of Birth */}
          <Typography variant="body1">Date of Birth</Typography>
          <TextField
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register("dob", { required: "Date of Birth is required" })}
            helperText={errors.dob?.message}
            sx={{ mb: 2 }}
          />

          {/* Password */}
          <Typography variant="body1">Password</Typography>
          <TextField
            type={showPassword ? "text" : "password"}
            fullWidth
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* Confirm Password */}
          <Typography variant="body1">Confirm Password</Typography>
          <TextField
            type={showPassword ? "text" : "password"}
            fullWidth
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            helperText={errors.confirmPassword?.message}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              textTransform: "none",
              bgcolor: "#56c2b3",
              "&:hover": { bgcolor: "#48a89d" },
            }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default Signup;
