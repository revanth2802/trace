'use client';

import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: { main: '#237764', dark: '#1c6756', light: '#edf5f1' },
    secondary: { main: '#687780' },
    background: { default: '#f6f7f9', paper: '#ffffff' },
    text: { primary: '#202c35', secondary: '#7a858e' },
    divider: '#e7ebee',
    success: { main: '#237764' },
    warning: { main: '#aa6a24' },
    error: { main: '#ad6049' },
  },
  shape: { borderRadius: 7 },
  typography: {
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: 13,
    button: { textTransform: 'none', fontWeight: 600 },
    h1: { fontFamily: '"Manrope", sans-serif', fontWeight: 750 },
    h2: { fontFamily: '"Manrope", sans-serif', fontWeight: 750 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true, size: 'small' },
      styleOverrides: { root: { minWidth: 0, gap: 8, lineHeight: 1.5 } },
    },
    MuiIconButton: { defaultProps: { size: 'small' } },
    MuiTextField: { defaultProps: { size: 'small', variant: 'outlined' } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { fontSize: 12, backgroundColor: '#fff' },
        input: { padding: '10px 12px' },
        notchedOutline: { borderColor: '#dde4e7' },
      },
    },
    MuiCheckbox: { defaultProps: { size: 'small' } },
    MuiChip: { defaultProps: { size: 'small' } },
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiTableCell: { styleOverrides: { root: { borderColor: '#edf0f1' } } },
    MuiDialog: {
      styleOverrides: {
        paper: { width: 520, margin: 16, borderRadius: 11 },
      },
    },
    MuiDrawer: {
      styleOverrides: { paper: { width: 550, maxWidth: '100vw' } },
    },
    MuiAlert: { styleOverrides: { root: { fontSize: 12, alignItems: 'center' } } },
    MuiLinearProgress: { styleOverrides: { root: { height: 4, borderRadius: 3 } } },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: 'trace', enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
