import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Link as MuiLink,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomInput from "./CustomInput";
import { authFormSchema } from "../utils";
import { signIn, signUp } from "../lib/actions/user.actions";
import { useNavigate, Link } from "react-router-dom";

const PlaidLink = () => (
  <Button
    variant="contained"
    color="primary"
    sx={{
      borderRadius: "8px",
      padding: "12px 24px",
      fontWeight: 600,
      textTransform: "none",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      "&:hover": { boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)" },
    }}
  >
    Link Plaid Account
  </Button>
);

const AuthForm = ({ type }: { type: string }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // New state for error messages

  const formSchema = authFormSchema(type);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(type === "sign-up"
        ? {
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
          }
        : {}),
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(""); // Clear previous errors
    try {
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };
        const newUser = await signUp(userData);
        if (newUser) {
          setUser(newUser);
        } else {
          setError("Sign-up failed. Please try again.");
        }
      } else {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) {
          // Assuming a successful login response is truthy and contains necessary data
          // For instance, if response is a JWT or user object
          navigate("/Dashboard");
        } else {
          setError("Invalid email or password. Please try again.");
        }
      }
    } catch (error: any) {
      console.error(error);
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 450,
        padding: 4,
        background: "linear-gradient(145deg, #ffffff, #f9fafb)",
        borderRadius: "16px",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <MuiLink
          component={Link}
          to="/"
          underline="none"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary.main"
            sx={{ letterSpacing: "-0.5px" }}
          >
            TrackWise
          </Typography>
        </MuiLink>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            {user
              ? "Link Account"
              : type === "sign-in"
              ? "Welcome Back"
              : "Create Account"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, mb: 2 }}
          >
            {user
              ? "Connect your account to start tracking"
              : type === "sign-in"
              ? "Sign in to access your account"
              : "Join TrackWise to manage your finances"}
          </Typography>
        </Box>
      </Box>
      {user ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <PlaidLink />
        </Box>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            {type === "sign-up" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <CustomInput
                    control={control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                  <CustomInput
                    control={control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Box>
                <CustomInput
                  control={control}
                  name="address1"
                  label="Address"
                  placeholder="Enter your address"
                  error={!!errors.address1}
                  helperText={errors.address1?.message}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <CustomInput
                    control={control}
                    name="state"
                    label="State"
                    placeholder="NY"
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />{" "}
                  <CustomInput
                    control={control}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="11101"
                    error={!!errors.postalCode}
                    helperText={errors.postalCode?.message}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                    flexWrap: "wrap",
                  }}
                >
                  <CustomInput
                    control={control}
                    name="dateOfBirth"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth?.message}
                  />
                  <CustomInput
                    control={control}
                    name="ssn"
                    label="SSN"
                    placeholder="1234"
                    error={!!errors.ssn}
                    helperText={errors.ssn?.message}
                  />
                </Box>
              </>
            )}
            <CustomInput
              control={control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <CustomInput
              control={control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            {type === "sign-up" && (
              <CustomInput
                control={control}
                name="retypePassword"
                label="Retype Password"
                placeholder="Retype your password"
                type="password"
                error={!!errors.retypePassword}
                helperText={errors.retypePassword?.message}
              />
            )}
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                padding: "14px",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": { boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)" },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : type === "sign-in" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}
          >
            <Typography variant="body2" color="text.secondary">
              {type === "sign-in"
                ? "New to TrackWise?"
                : "Already have an account?"}
            </Typography>
            <MuiLink
              component={Link}
              to={type === "sign-in" ? "/sign-up" : "/sign-in"}
              underline="hover"
              sx={{
                fontWeight: 600,
                color: "primary.main",
                "&:hover": { color: "primary.dark" },
              }}
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </MuiLink>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default AuthForm;
