import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: `"Inter", "Poppins", "Roboto", sans-serif`,
    h6: {
      fontWeight: 600,
      letterSpacing: 0.3,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: "#8b78f2", // match hero gradient
    },
    background: {
      default: "#f7f6fb",
    },
    components: {
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
}

  },
});

export default theme;
