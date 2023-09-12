import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.tsx'
import { BrowserRouter } from 'react-router-dom'
import './static/style.scss'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
            <Router />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
