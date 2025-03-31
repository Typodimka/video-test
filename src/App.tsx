import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";
import {General} from "src/General/General";

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <General/>
    </ThemeProvider>
  );
}

export default App;
