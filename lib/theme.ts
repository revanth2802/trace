'use client';

import type { CSSProperties } from 'react';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants { financial: CSSProperties; label: CSSProperties; }
  interface TypographyVariantsOptions { financial?: CSSProperties; label?: CSSProperties; }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides { financial: true; label: true; }
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides { evidence: true; row: true; tile: true; }
}

const fontFamily = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';
const focusRing = { outline: '2px solid #237A67', outlineOffset: 2 };
const border = '#E2E7EC';

export const theme = createTheme({
  spacing: 8,
  cssVariables: true,
  palette: {
    primary: { main: '#237A67', dark: '#1B6253', light: '#EDF5F1', contrastText: '#FFFFFF' },
    secondary: { main: '#596773' },
    text: { primary: '#24313A', secondary: '#596773', disabled: '#77838C' },
    background: { default: '#F6F7F9', paper: '#FFFFFF' },
    grey: { 50: '#F7F9FA', 100: '#F0F3F5' },
    divider: border,
    success: { main: '#237A67', light: '#EDF5F1', dark: '#1B6253' },
    warning: { main: '#80551B', light: '#FBF4E7', dark: '#654313' },
    error: { main: '#9B413C', light: '#FAEFED', dark: '#7D312D' },
    info: { main: '#48637C', light: '#EFF3F8', dark: '#344D65' },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily, fontSize: 14,
    h1: { fontSize: 28, fontWeight: 600, lineHeight: 1.25, letterSpacing: 0 },
    h2: { fontSize: 18, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0 },
    h3: { fontSize: 16, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0 },
    h4: { fontSize: 16, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0 },
    h5: { fontSize: 14, fontWeight: 600, lineHeight: 1.5, letterSpacing: 0 },
    h6: { fontSize: 14, fontWeight: 600, lineHeight: 1.5, letterSpacing: 0 },
    body1: { fontSize: 14, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 },
    body2: { fontSize: 13, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 },
    subtitle1: { fontSize: 14, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0 },
    subtitle2: { fontSize: 13, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0 },
    caption: { fontSize: 12, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 },
    overline: { fontSize: 12, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0, textTransform: 'none' },
    label: { fontSize: 13, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0 },
    button: { fontSize: 14, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0, textTransform: 'none' },
    financial: { fontSize: 32, fontWeight: 600, lineHeight: 1.25, letterSpacing: 0, fontVariantNumeric: 'tabular-nums' },
  },
  components: {
    MuiCssBaseline: { styleOverrides: {
      body: { fontFamily, color: '#24313A', backgroundColor: '#F6F7F9' },
      'input[type="file"]': { width: '100%', minHeight: 40, fontSize: 14, color: '#596773', '&::file-selector-button': { minHeight: 40, borderRadius: 6, border: `1px solid ${border}`, padding: '8px 16px', marginRight: 16, fontFamily, fontSize: 14, backgroundColor: '#FFFFFF', color: '#24313A', cursor: 'pointer' } },
      'small': { fontSize: 12, lineHeight: 1.5, color: '#596773' },
      'a': { color: '#237A67', textUnderlineOffset: 3 },
      'strong': { fontWeight: 600 },
      'button, input, select, textarea': { fontFamily },
      'a:focus-visible, input[type="range"]:focus-visible, summary:focus-visible, pre:focus-visible': focusRing,
      '.numeric, .mono, time': { fontVariantNumeric: 'tabular-nums' },
    } },
    MuiTypography: { styleOverrides: { root: {
      overflowWrap: 'anywhere',
      '&.eyebrow, &.muted': { color: '#596773' },
      '&.financial-value': { fontVariantNumeric: 'tabular-nums' },
    } } },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: {
      defaultProps: { disableElevation: true, size: 'medium' },
      styleOverrides: { root: {
        borderRadius: 6, minHeight: 40, minWidth: 0, padding: '8px 16px', gap: 8,
        textTransform: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 0, boxShadow: 'none',
        whiteSpace: 'normal', overflowWrap: 'anywhere',
        '&:hover': { boxShadow: 'none' },
        '&.Mui-focusVisible': focusRing,
        '&.Mui-disabled': { color: '#77838C', backgroundColor: '#F0F2F4', borderColor: border },
        '&.small': { minHeight: 32, padding: '4px 12px', fontSize: 13 },
        '&.full': { width: '100%', justifyContent: 'space-between' },
        '&.text-button': { minHeight: 32, padding: '4px 0', fontSize: 13, fontWeight: 500 },
        variants: [
          { props: { variant: 'contained' }, style: { backgroundColor: '#237A67', color: '#FFFFFF', '&:hover': { backgroundColor: '#1B6253' } } },
          { props: { variant: 'outlined' }, style: { color: '#24313A', borderColor: border, backgroundColor: '#FFFFFF', '&:hover': { borderColor: '#A6BDB3', backgroundColor: '#F5F8F6' } } },
          { props: { variant: 'text' }, style: { color: '#237A67', '&:hover': { backgroundColor: '#EDF5F1' } } },
          { props: { variant: 'evidence' }, style: { minHeight: 28, fontSize: 13, padding: '4px 8px', color: '#596773', backgroundColor: '#F7F9FA', border: `1px solid ${border}`, textAlign: 'left', borderRadius: 4, '&:hover': { color: '#1B6253', backgroundColor: '#EDF5F1', borderColor: '#A6BDB3' } } },
          { props: { variant: 'row' }, style: {
            color: '#24313A', borderRadius: 0, padding: '8px 0', textAlign: 'left', justifyContent: 'flex-start', width: '100%',
            '&:hover': { backgroundColor: '#F5F8F6', color: '#1B6253' },
            '&.field-row': { border: `1px solid ${border}`, padding: 16, borderRadius: 6, justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginTop: 8 },
            '&.field-row.focused': { backgroundColor: '#FFF9E8', borderColor: '#D6B762' },
            '&.field-row > span': { minWidth: 0, whiteSpace: 'normal', overflowWrap: 'anywhere' },
            '&.field-row > span:first-child': { flex: '1 1 45%' },
            '&.field-row > span:nth-child(2)': { flex: '0 1 50%', textAlign: 'right', fontVariantNumeric: 'tabular-nums' },
            '&.field-row small': { display: 'block', color: '#596773', marginTop: 4, fontSize: 12 },
            '&.input-row': { borderBottom: `1px solid ${border}`, justifyContent: 'space-between' },
            '&.input-row > span': { flex: 1, minWidth: 0 },
            '&.input-row small': { display: 'block', marginTop: 4 },
            '&.line-button': { display: 'block', minWidth: 200, fontWeight: 400 },
            '&.document-title': { display: 'block', padding: 0 },
            '@media (max-width:600px)': { '&.field-row': { flexDirection: 'column', alignItems: 'stretch', gap: 8 }, '&.field-row > span:nth-child(2)': { textAlign: 'left' } },
          } },
          { props: { variant: 'tile' }, style: { border: `1px solid ${border}`, borderRadius: 8, backgroundColor: '#FFFFFF', padding: 16, color: '#24313A', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', gap: 8, '&:hover': { borderColor: '#A6BDB3', backgroundColor: '#F5F8F6' } } },
        ],
      } },
    },
    MuiIconButton: { defaultProps: { size: 'small' }, styleOverrides: { root: {
      width: 32, height: 32, color: '#596773', borderRadius: 6,
      '&:hover': { color: '#237A67', backgroundColor: '#EDF5F1' },
      '&.Mui-focusVisible': focusRing,
      '&.Mui-disabled': { color: '#77838C' },
    } } },
    MuiListItemButton: { styleOverrides: { root: {
      minHeight: 40, borderRadius: 6, padding: '8px 16px', gap: 12, fontSize: 14, fontWeight: 400, color: '#596773', position: 'relative',
      '&:hover': { backgroundColor: '#F4F6F7' },
      '&.Mui-selected': { backgroundColor: '#EDF5F1', color: '#1B6253', fontWeight: 500,
        '&:hover': { backgroundColor: '#E4F0EA' },
        '&::before': { content: '""', position: 'absolute', left: 0, top: 10, bottom: 10, width: 3, borderRadius: 2, backgroundColor: '#237A67' },
      },
      '&.Mui-focusVisible': { ...focusRing, backgroundColor: '#F3F6F8' },
    } } },
    MuiTextField: { defaultProps: { size: 'small', variant: 'outlined' } },
    MuiOutlinedInput: { styleOverrides: {
      root: { borderRadius: 6, fontSize: 14, lineHeight: 1.5, minHeight: 40, backgroundColor: '#FFFFFF', '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#A1ABA5' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderWidth: 2, borderColor: '#237A67' }, '&.Mui-disabled': { backgroundColor: '#F0F2F4' } },
      input: { padding: '8px 12px', boxSizing: 'border-box', height: 'auto', minWidth: 0, '&::placeholder': { color: '#596773', opacity: 1 } },
      notchedOutline: { borderColor: border },
      multiline: { padding: 12, '& textarea': { padding: 0 } },
    } },
    MuiNativeSelect: { styleOverrides: { select: { height: 'auto', minHeight: 40, boxSizing: 'border-box', fontSize: 14, padding: '8px 32px 8px 12px', margin: 0, backgroundColor: 'transparent', '&:focus': { backgroundColor: 'transparent' } } } },
    MuiInputLabel: { styleOverrides: { root: { fontSize: 13, color: '#596773' } } },
    MuiCheckbox: { defaultProps: { size: 'small' }, styleOverrides: { root: { padding: 0, width: 24, height: 24, flexShrink: 0, color: '#77838C', '&.Mui-focusVisible': focusRing, '& .MuiSvgIcon-root': { fontSize: 20 } } } },
    MuiChip: { defaultProps: { size: 'small' }, styleOverrides: { root: {
      height: 24, borderRadius: 4, fontSize: 12, fontWeight: 500, color: '#596773', backgroundColor: '#F0F3F5', border: 'none',
      variants: [
        { props: { color: 'success' }, style: { color: '#1B6253', backgroundColor: '#EDF5F1' } },
        { props: { color: 'warning' }, style: { color: '#80551B', backgroundColor: '#FBF4E7' } },
        { props: { color: 'error' }, style: { color: '#9B413C', backgroundColor: '#FAEFED' } },
        { props: { color: 'info' }, style: { color: '#48637C', backgroundColor: '#EFF3F8' } },
      ],
    }, label: { padding: '0 8px', lineHeight: 1.5 } } },
    MuiPaper: { defaultProps: { elevation: 0, variant: 'outlined' }, styleOverrides: { root: { borderRadius: 8, borderColor: border, boxShadow: 'none', backgroundImage: 'none', '&.panel': { overflow: 'hidden' } } } },
    MuiCard: { defaultProps: { elevation: 0, variant: 'outlined' }, styleOverrides: { root: { borderRadius: 8, borderColor: border, boxShadow: 'none', '&.chosen': { backgroundColor: '#EDF5F1' } } } },
    MuiCardContent: { styleOverrides: { root: { padding: 24, '&:last-child': { paddingBottom: 24 } } } },
    MuiTable: { defaultProps: { size: 'small' }, styleOverrides: { root: { minWidth: 720 } } },
    MuiTableCell: { styleOverrides: {
      root: { padding: '8px 16px', fontSize: 14, lineHeight: 1.5, borderColor: border, color: '#24313A', verticalAlign: 'middle', '&.numeric': { textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }, '&.mono': { fontSize: 12, color: '#596773' } },
      head: { backgroundColor: '#F7F9FA', fontSize: 12, fontWeight: 600, color: '#596773', whiteSpace: 'nowrap', letterSpacing: 0, textTransform: 'none', borderTop: `1px solid ${border}` },
    } },
    MuiTableRow: { styleOverrides: { root: { '&:hover td': { backgroundColor: '#FAFCFB' } } } },
    MuiDialog: { styleOverrides: { paper: { width: 560, maxWidth: 'calc(100vw - 32px)', margin: 16, borderRadius: 8, display: 'block', overflowY: 'auto', '&.modal': { maxHeight: 'calc(100% - 32px)' } }, container: { '& .MuiBackdrop-root': { backgroundColor: 'rgba(36,49,58,.35)' } } } },
    MuiDrawer: { styleOverrides: { paper: { width: 600, maxWidth: '100vw', display: 'block', overflowY: 'auto', overflowX: 'hidden', borderRadius: 0 } } },
    MuiBackdrop: { styleOverrides: { root: { backgroundColor: 'rgba(36,49,58,.24)' } } },
    MuiAlert: { styleOverrides: { root: { fontSize: 14, borderRadius: 6, alignItems: 'center' } } },
    MuiSnackbar: { styleOverrides: { root: { zIndex: 1600 } } },
    MuiLinearProgress: { styleOverrides: { root: { height: 4, borderRadius: 4, backgroundColor: '#E8EFEB' }, bar: { borderRadius: 4 } } },
    MuiTabs: { styleOverrides: { root: { minHeight: 40 }, indicator: { height: 2 } } },
    MuiTab: { styleOverrides: { root: { minHeight: 40, padding: '8px 16px', minWidth: 64, fontSize: 14, fontWeight: 500, textTransform: 'none', '&.Mui-focusVisible': focusRing } } },
  },
});
