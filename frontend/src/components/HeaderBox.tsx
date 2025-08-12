import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { motion } from "framer-motion"; // Optional, for animation (npm install framer-motion)

interface HeaderBoxProps {
  type?: "title" | "greeting";
  title?: string;
  subtext?: string;
  user?: string;
}

const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb={4}>
      {/* Title */}
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          color: colors.grey[100],
          display: "inline-block",
          position: "relative",
          pb: 0.5,
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "60%",
            height: "3px",
            background: `linear-gradient(90deg, ${colors.greenAccent[500]}, ${colors.blueAccent[500]})`,
            borderRadius: "2px",
          },
        }}
      >
        {title}
        {type === "greeting" && (
          <Typography
            component={motion.span}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              color: colors.greenAccent[400],
              fontWeight: "inherit",
              ml: 1,
              fontSize: "1.2rem",
            }}
          >
            {user}
          </Typography>
        )}
      </Typography>

      {/* Subtext */}
      {subtext && (
        <Typography
          variant="body1"
          sx={{
            color: colors.grey[300],
            mt: 1,
            fontSize: "1rem",
          }}
        >
          {subtext}
        </Typography>
      )}
    </Box>
  );
};

export default HeaderBox;
