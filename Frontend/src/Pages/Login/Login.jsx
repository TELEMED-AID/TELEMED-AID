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
import DropdownBox from "../../Components/DropDown/DropdownBox";
import LogoTitle from "../../Components/LogoTitle/LogoTitle";
import LoginPageStyles from "./LoginPageStyle";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import usePostItem  from "../../Hooks/usePost";
import useGet from "../../Hooks/useGet";
import {USER_LOGIN_URL, GET_CURRENT_USER } from "../../API/APIRoutes";
import { home } from "../../AppRoutes/DefaultRoutes";
const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [error, setError] = useState(false);

  const { loading, postItem } = usePostItem();
  const { loading: getUserLoading, getItem } = useGet();



  const NationalIdField = useRef(null);
  const inputPassword = useRef(null);


  const getCurrentUSerCallBack = () => {
    //  set user slice
    // navigate(home);
  }


  useEffect(() => {
   getItem(GET_CURRENT_USER, getCurrentUSerCallBack);
  }, []);


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

  const loginRequestCallBack = (responseData, originalData) => {
    console.log("Success response from server:", responseData);
    console.log("Original data sent:", originalData);
    setError(false);
  };

  const loginRequestErrorCallBack = (error) => {
    console.log("Error response from server:", error);
    setError(true);
  };
  const onLoginSubmit = (data) => {

    let userRequest = {
      nationalId: data.nationalId,
      password: data.password,
    }
    postItem(USER_LOGIN_URL,userRequest,loginRequestCallBack,"Login Success","Login Failed",loginRequestErrorCallBack,true,"post");
    console.log("Login data", data);
  };

  const toggelRole = (state) => {
    setIsDoctor(state);
  };

  return (
    <LoginPageStyles  sx={{mt:12}}>
      <LogoTitle />
      <form onSubmit={handleSubmit(onLoginSubmit)} className="formWrapper">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            bgcolor: "#fff",
          }}
        >
          <Box sx={{ width: 400 }}>
            <Grid sx={{ mb: 3 }}>
              <Typography variant="h3" className="loginTitle">
                Login Page
              </Typography>
            </Grid>

            <Grid>
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
                helperText={errors.nationalId?.message}
              />
            </Grid>
            <Grid sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }} align="left">
                Password
              </Typography>
              <TextField
                sx={{ mb: 2 }}
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
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
            <Grid>
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
              <IconButton onClick={() => toggelRole(!isDoctor)}>
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
              disabled={loading}
              sx={{

                py: 1.5,
                fontSize: "1.1rem",
                textTransform: "none",
                bgcolor: "#33b4d4",
                "&:hover": {
                  bgcolor: "#FFFFFF",
                  color: "#33b4d4",
                  border: "1px solid #33b4d4",
                },

              }}
            >
              {!loading ? (
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
