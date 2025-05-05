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
} from "@mui/material";
import LogoTitle from "../../Components/LogoTitle/LogoTitle";
import LoginPageStyles from "./LoginPageStyle";
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
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  // const { error, loading } = useLogin(userData ? userData : null);
  const onLoginSubmit = (data) => {
    console.log("Login data", data);
    setUserData(data);
  };

  const toggelVisabiltyForPlannerEmail = async (state) => {
    setIsDoctor(state);
  };

  return (
    <LoginPageStyles>
      <form onSubmit={handleSubmit(onLoginSubmit)} className="formWrapper">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fff",
          }}
        >
          <Box sx={{ width: 400, p: 3 }}>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Typography variant="h3" className="loginTitle">
                Login Page
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{ mt: 2, mb: 1, fontSize: "1.1rem" }}
              >
                National ID
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                size="medium"
                placeholder="National ID"
                {...register("nationalId", {
                  required: "National ID is required",
                })}
                inputRef={NationalIdField}
                error={error}
                helperText={errors.nationalId?.message}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mb: 1, fontSize: "1.1rem" }}>
                Country
              </Typography>
              <SearchableDropDown
                state={userCountry}
                setState={(value) => {
                  value = value !== "" ? value : null;
                  setUserCountry(value);
                }}
                {...register("country", {
                  required: "Country is required",
                })}
                name="country"
                placeholder="Select Your Country"
                items={countries}
                dropDownError={errors.country}
                helperText={errors.country?.message}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }} align="left">
                Password
              </Typography>
              <TextField
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                helperText={errors.password?.message}
                inputRef={inputPassword}
                error={error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {error && (
                <Typography variant="p1" color="red.main">
                  Wrong National ID or Password
                </Typography>
              )}
            </Grid>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "103%", // Ensures full row space is used
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontSize: "1rem", fontWeight: "bold" }}
              >
                Are You a Doctor?
              </Typography>
              <IconButton
                sx={{ pl: 5 }}
                onClick={() => toggelVisabiltyForPlannerEmail(!isDoctor)}
              >
                {isDoctor ? (
                  <ToggleOnIcon color="primary" sx={{ fontSize: 50 }} />
                ) : (
                  <ToggleOffIcon color="disabled" sx={{ fontSize: 50 }} />
                )}
              </IconButton>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                fontSize: "1.1rem",
                textTransform: "none",
                bgcolor: "#56c2b3",
                "&:hover": {
                  bgcolor: "#48a89d",
                },
              }}
            >
              {!false ? (
                "Login"
              ) : (
                <LoadingComponent size="2em" thickness={5} color="white" />
              )}{" "}
            </Button>

            <Typography
              variant="body1"
              align="center"
              sx={{ mt: 4, fontSize: "1rem" }}
            >
              Don’t have an account?{" "}
              <Link
                component="button"
                underline="hover"
                sx={{ fontSize: "1rem" }}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </LoginPageStyles>
  );
};

export default Login;
