import React from "react";
import AuthForm from "../../components/AuthForm";
import { Box } from "@mui/material";

const SignUp = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
      }}
    >
      {/* Left side for AuthForm */}
      <Box
        sx={{
          flex: "0 0 50%", // Ensure it takes exactly 50% width and does not grow/shrink
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
          // padding: 3, // Padding is now controlled by AuthForm
        }}
      >
        <AuthForm type="sign-up" />
      </Box>

      {/* Right side for Dashboard Screenshot Placeholder */}
      <Box
        sx={{
          flex: "1 1 50%", // Allow to grow and shrink, but maintain 50% base
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f2f5", // A light gray, similar to default background
          backgroundImage: "url(https://source.unsplash.com/random?dashboard)", // Placeholder image
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderLeft: "1px solid #e0e0e0",
        }}
      >
        {/* You can add text or other elements here */}
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          Your Dashboard Preview
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
