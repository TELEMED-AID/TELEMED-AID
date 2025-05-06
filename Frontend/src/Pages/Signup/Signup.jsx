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
import SignupPageStyle from "./SignupPageStyle"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import SearchableDropDown from "../../Components/DropDown/SearchableDropDown";
import { countries } from "../../Utils/HelperObjects";
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
  const [userGender, setUserGender] = useState(null);
  const [userSpecialization, setUserSpecialization] = useState(null);
  const [userCareer, setUserCareer] = useState(null);
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
    <SignupPageStyle>
      <LogoTitle/>
      <form onSubmit={handleSubmit(onSignupSubmit)} className="formWrapper">
        <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Box 
              sx={{ width: { xs: "400px", sm: "800px" } }}
              >
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Typography variant="h3" className="loginTitle">
                  Signup Page
                </Typography>
              </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on desktop
                gap: 2, // Consistent spacing between items
                justifyContent: "space-evenly",
              }}
            >
              <Box 
                sx={{
                  width: { xs: "100%", sm: "45%" } // Full width on mobile, 45% on desktop
                }}
              >
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Full Name
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Full Name"
                    {...register("fullName", { required: "Full Name is required" })}
                    helperText={errors.fullName?.message}
                    sx={{ width:"100%"}}
                />
              </Box>
                
              <Box
                sx={{
                  width: { xs: "100%", sm: "45%" } // Full width on mobile, 45% on desktop
                }}
              >
                <Typography variant="body1" sx={{ mb: 1 }}>National ID</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="National ID"
                    {...register("nationalId", { required: "National ID is required" })}
                    helperText={errors.nationalId?.message}
                    sx={{ mb: 2, width:"100%"}}
                />
              </Box>
                
            </Box>
            
{/* ***************************** */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on desktop
                gap: 2, // Consistent spacing between items
                justifyContent: "space-evenly",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: "45%" } // Full width on mobile, 45% on desktop
                }}
              >
                <Typography variant="body1" sx={{ mb: 1 }}>Country {userCountry}</Typography>
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
              </Box>
            
              <Box
                sx={{
                  width: { xs: "100%", sm: "45%" } // Full width on mobile, 45% on desktop
                }}
              >
                <Typography variant="body1" sx={{ mb: 1 }}>Phone Number</Typography>
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
              </Box>
            </Box>
{/* ***************************** */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on desktop
                gap: 2, // Consistent spacing between items
                justifyContent: "space-evenly",
              }}
            >

              <Box
                sx={{
                  width: { xs: "100%", sm: "45%" } // Full width on mobile, 45% on desktop
                }}
              >
                <Typography variant="body1" sx={{ mb: 1 }}>Date of Birth</Typography>
                <TextField
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register("dob", { required: "Date of Birth is required" })}
                  helperText={errors.dob?.message}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", sm: "45%" } // Full width on mobile, 45% on desktop
                }}
              >
                <Typography variant="body1" sx={{ mb: 1 }}>Gender</Typography>
                <SearchableDropDown
                  state={userGender}
                  setState={(value) => setUserGender(value || null)}
                  {...register("gender", { required: "Gender is required" })}
                  name="gender"
                  placeholder="Select Gender"
                  items={[
                    { id: 'male', name: 'Male' },
                    { id: 'female', name: 'Female' },
                    // Add more options if needed, like:
                    // { id: 'other', name: 'Other' },
                    // { id: 'prefer-not-to-say', name: 'Prefer not to say' }
                  ]}
                  dropDownError={errors.gender}
                  helperText={errors.gender?.message}
                  sx={{ mb: 2 }}
                />
              </Box>
            </Box>
{/* ***************************** */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on desktop
                gap: 2, // Consistent spacing between items
                justifyContent: "space-evenly",
                mt:2
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: "45%" } // Full width on mobile, 45% on desktop
                }}
              >
                <Typography variant="body1" sx={{ mb: 1 }}>Password</Typography>
                <TextField
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  placeholder="Password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
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
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", sm: "45%" } // Full width on mobile, 45% on desktop
                }}
              >
                <Typography variant="body1" sx={{ mb: 1 }}>Confirm Password</Typography>
                <TextField
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => {
                      if (watch('password') !== value) {
                        return "Passwords do not match";
                      }
                    }
                  })}
                  helperText={errors.confirmPassword?.message}
                />
              </Box>
            </Box>
{/* ********************* */}
            <Box
              sx={{
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.1rem",
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontSize: "1rem", fontWeight: "bold" }}
              >
                Are You a Doctor?
              </Typography>
              <IconButton
                
                onClick={() => toggelVisabiltyForPlannerEmail(!isDoctor)}
              >
                {isDoctor ? (
                  <ToggleOnIcon color="primary" sx={{ fontSize: 50 }} />
                ) : (
                  <ToggleOffIcon color="disabled" sx={{ fontSize: 50 }} />
                )}
              </IconButton>
            </Box>

            {isDoctor && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on desktop
                    gap: 2, // Consistent spacing between items
                    justifyContent: "space-evenly",
                    mb:2
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "45%" } // Full width on mobile, 45% on desktop
                    }}
                  >
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Specialization
                    </Typography>
                    <SearchableDropDown
                      state={userSpecialization}
                      setState={(value) => setUserSpecialization(value || null)}
                      {...register("specialization", { required: "Specialization is required" })}
                      name="specialization"
                      placeholder="Select Specialization"
                      // items={countries}  Adjust this 
                      dropDownError={errors.specialization}
                      helperText={errors.specialization?.message}
                      sx={{ mb: 2 }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "45%" } // Full width on mobile, 45% on desktop
                    }}
                  >
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Career Level
                    </Typography>
                    <SearchableDropDown
                      state={userCareer}
                      setState={(value) => setUserCareer(value || null)}
                      {...register("career", { required: "career level is required" })}
                      name="career"
                      placeholder="Select Career Level"
                      // items={countries}  Adjust this 
                      dropDownError={errors.career}
                      helperText={errors.career?.message}
                      sx={{ mb: 2 }}
                    />
                  </Box>
                </Box>
              </>
            )}
{/* ************************ */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on desktop
                gap: 2, // Consistent spacing between items
                justifyContent: "space-evenly",
                mt:2
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: "45%" } // Full width on mobile, 45% on desktop
                }}
              >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  py: 1.5,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  bgcolor: "#c2185b",
                  "&:hover": { bgcolor: "#880e4f" },
                  display: 'block',  // Required for margin auto to work
                  mx: 'auto',       // Horizontal margin auto
                  mb: 2             // Optional bottom margin
                }}
              >
                Validate Your Identity
            </Button>
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", sm: "45%" } // Full width on mobile, 45% on desktop
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    py: 1.5,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    bgcolor: "#33b4d4",
                    "&:hover": { bgcolor: "#48a89d" },
                    display: 'block',  // Required for margin auto to work
                    mx: 'auto',       // Horizontal margin auto
                    mb: 2             // Optional bottom margin
                  }}
                >
                  Sign up
                </Button>
              </Box>

            </Box>
            
            <Typography
              variant="body1"
              align="center"
              sx={{ mt: 4, fontSize: "1rem" }}
            >
              Do you have an account?{" "}
              <Link
                component="button"
                underline="hover"
                sx={{ fontSize: "1rem" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </SignupPageStyle>
  );
};

export default Signup;
