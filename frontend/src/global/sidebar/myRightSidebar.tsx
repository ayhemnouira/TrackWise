import React from "react";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../theme";
import BankCard from "../../components/BankCard";
import type { Account } from "../../types";

interface RightSidebarProps {
  imageUrl?: string;
  banks?: Account[];
  userName?: string;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  imageUrl,
  banks = [],
  userName,
}) => {
  const loggedIn = {
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
  }; // Example user
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const headerImageUrl =
    imageUrl ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60";

  return (
    <Box
      sx={{
        height: "100vh",
        mr: isMobile ? 1 : 0,
      }}
    >
      {/* Top image header */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
          height: 200,
          overflow: "hidden",
          backgroundImage: `url("${headerImageUrl}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      ></Box>

      {/* Profile + Actions */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
        sx={{
          bgcolor: colors.primary[400],
          color: colors.grey[100],
          borderRadius: 2,
          border: `1px solid ${colors.grey[700]}`,
          mt: -4,
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: "primary.main",
            mb: 1,
            border: "2px solid white",
          }}
        >
          <img
            src="https://mui.com/static/images/avatar/1.jpg"
            alt="Profile"
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        </Avatar>

        {/* Full name */}
        <Typography
          fontWeight="bold"
          sx={{ fontSize: isMobile ? "16px" : "20px" }}
        >
          {loggedIn.firstName} {loggedIn.lastName}
        </Typography>

        {/* Email */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: isMobile ? "12px" : "14px" }}
        >
          {loggedIn.email}
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            px: 1,
            py: 1,
            borderTop: `1px solid ${colors.grey[700]}`,
          }}
        >
          {/* Left: My Banks text */}
          <Typography
            fontWeight="bold"
            sx={{ fontSize: isMobile ? "16px" : "18px" }}
          >
            My Banks
          </Typography>

          {/* Right: + button */}
          <IconButton
            size={isMobile ? "small" : "medium"}
            sx={{ ml: 1, color: `${colors.grey[100]} !important` }}
          >
            <AddIcon />{" "}
            <Typography sx={{ fontSize: isMobile ? "16px" : "18px" }}>
              Add Banks
            </Typography>
          </IconButton>
        </Box>

        {/* My Banks - Bank Cards (inside the same box) */}
        {banks?.length > 0 && (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mt: 2,
              width: "100%",
            }}
          >
            <Box sx={{ position: "relative", zIndex: 10 }}>
              <BankCard
                key={banks[0].id}
                account={banks[0]}
                userName={
                  userName || `${loggedIn.firstName} ${loggedIn.lastName}`
                }
                showBalance={false}
              />
            </Box>

            {banks[1] && (
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 16,
                  zIndex: 0,
                  width: "90%",
                }}
              >
                <BankCard
                  key={banks[1].id}
                  account={banks[1]}
                  userName={
                    userName || `${loggedIn.firstName} ${loggedIn.lastName}`
                  }
                  showBalance={false}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RightSidebar;
