import { Box } from "@mui/material";
import { useState } from "react";
import MainContainer from "../../components/maincontainer";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const SharedLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  return (
    <Box>
      <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <Sidebar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <MainContainer isDrawerOpen={isDrawerOpen} />
    </Box>
  );
};

export default SharedLayout;
