import { CssBaseline, ThemeProvider } from "@mui/material";
import AppRoute from "./routes";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoute />
    </ThemeProvider>
  );
};

export default App;
