import { amber, blue, pink, red } from '@mui/material/colors';
import createTheme from '@mui/material/styles/createTheme';

export const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blue[500],
    },
    secondary: {
      main: pink[500],
    },
    error: {
      main: red[500],
    },
    info: {
      main: amber[500],
    },
  },
});
