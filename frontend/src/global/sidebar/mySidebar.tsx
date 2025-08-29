import { useState, type ReactNode, useEffect } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddCardIcon from "@mui/icons-material/AddCard";
import {
  useTheme,
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material"; // Import Button
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import Logout Icon
import { tokens } from "../../theme";
import { signOut } from "../../lib/actions/user.actions"; // Import signOut action
import { getLoggedInUser } from "../../lib/actions/user.actions"; // Import getLoggedInUser action
import type { UserProfile } from "../../types"; // Import UserProfile type

interface ItemProps {
  title: string;
  to: string;
  icon: ReactNode;
  selected: string;
  setSelected: (title: string) => void;
}
interface MyProSidebarProps {
  userName: string;
}

const Item: React.FC<ItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

// Rest of the MyProSidebar component remains unchanged
const MyProSidebar: React.FC<MyProSidebarProps> = ({ userName }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState<string>("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const navigate = useNavigate(); // Initialize useNavigate
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getLoggedInUser();
      if (loggedInUser) {
        // Assuming that if firstName/lastName are not directly in JWT, they might be fetched separately
        // For now, using sub as a fallback for display
        setUser({
          firstName: loggedInUser.firstName || "",
          lastName: loggedInUser.lastName || "",
          email: loggedInUser.email,
          id: loggedInUser.id,
        });
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/sign-in"); // Redirect to sign-in page after logout
  };

  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .ps-sidebar-root": {
          border: "none",
        },
        "& .ps-menuitem-root": {
          color: `${colors.grey[100]} !important`,
        },
        "& .ps-menuitem-root:hover, & .ps-menuitem-root:hover .ps-menu-button":
          {
            color: `${colors.blueAccent[500]} !important`,
            backgroundColor: "transparent !important",
          },
        "& .ps-active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
      >
        <Menu>
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : sidebarRTL ? (
                <SwitchLeftOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              ) : (
                <SwitchRightOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Track Wise
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  src={"../../assets/user.png"}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user ? `${user.firstName} ${user.lastName}` : "Guest"}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "5%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Transactions"
              to="/transactions"
              icon={<ReceiptLongIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Budgets"
              to="/budgets"
              icon={<AccountBalanceWalletIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Documents"
              to="/documents"
              icon={<UploadFileIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Connect Banks"
              to="/invoices"
              icon={<AddCardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Box sx={{ mt: "auto" }}>
              {" "}
              {/* push it to the bottom */}
              <Divider /> {/* border on top */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                  py: 1.5,
                }}
              >
                {/* Left: Avatar */}
                <Avatar
                  src="https://i.pravatar.cc/40"
                  alt="User"
                  sx={{ width: 36, height: 36 }}
                />

                {/* Middle: Username */}
                <Typography variant="body1" sx={{ flexGrow: 1, mx: 1 }}>
                  {userName}
                </Typography>

                {/* Right: Exit Icon */}
                <IconButton size="small" color="error" onClick={handleLogout}>
                  <ExitToAppIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
