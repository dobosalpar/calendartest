import React from 'react';
import {Button, MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import muiTheme from './Theme/theme.json';

const theme = createMuiTheme(muiTheme);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Button variant="contained" color="primary">
        Button
      </Button>
    </MuiThemeProvider>
  );
}

export default App;
