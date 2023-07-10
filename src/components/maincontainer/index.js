import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router";
import { DrawerHeader } from "../sidebar";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  marginLeft: drawerWidth,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  marginLeft: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    marginLeft: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const OutletContainer = styled(Box)(({ theme, isDrawerOpen }) => ({
  marginLeft: drawerWidth,
  whiteSpace: "nowrap",
  ...(isDrawerOpen && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!isDrawerOpen && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MainContainer = ({ isDrawerOpen }) => {
  return (
    <OutletContainer isDrawerOpen={isDrawerOpen}>
      <DrawerHeader />
      <Box sx={{ flex: 1, p: 3 }}>
        <Outlet />
      </Box>
    </OutletContainer>
  );
};

export default MainContainer;
