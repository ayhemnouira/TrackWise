import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const drawerWidth = 600;

const RightSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Drawer
      open={isSidebarOpen}
      onClose={toggleSidebar}
      sx={{
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          bgcolor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Sidebar</Typography>
        <IconButton onClick={toggleSidebar}></IconButton>
      </Box>
      <List>
        {["Item 1", "Item 2", "Item 3"].map((text) => (
          <ListItem key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default RightSidebar;
