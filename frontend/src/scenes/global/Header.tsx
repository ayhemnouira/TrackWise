import { useTheme } from "@mui/material/styles";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import { Box, IconButton } from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box display={"flex"} justifyContent={"space-between"} p={2}>
      <IconButton></IconButton>
    </Box>
  );
};
export default Header;
