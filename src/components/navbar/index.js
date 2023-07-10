import { Toolbar, Typography, AppBar, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;
const TopBar = styled(AppBar)(({ theme, isDrawerOpen }) => ({
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isDrawerOpen && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Navbar = ({ isDrawerOpen, setIsDrawerOpen }) => {
  return (
    <TopBar position="fixed" isDrawerOpen={isDrawerOpen}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            sx={{
              color: "inherit",
              marginRight: 5,
              ...(isDrawerOpen && { display: "none" }),
            }}
            onClick={() => {
              setIsDrawerOpen((prevState) => !prevState);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            Quorum Dashboard
          </Typography>
        </Box>
      </Toolbar>
    </TopBar>
  );
};

export default Navbar;
