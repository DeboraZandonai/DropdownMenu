import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './Assets/styles/theme';
import MenuScreen from './Screens/MenuScreen';

function App() {
  return (
    <ThemeProvider theme={theme}>
     <MenuScreen />
    </ThemeProvider>
  );
}

export default App;
