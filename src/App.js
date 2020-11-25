import React from 'react';
import { StylesProvider } from '@material-ui/core';
import MyRoutes from './routes/Routes';

function App() {

  return (
    <StylesProvider injectFirst>
        <MyRoutes />
    </StylesProvider>
  );
}

export default App;
