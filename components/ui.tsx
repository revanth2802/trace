'use client';

import type { ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, HTMLAttributes, ReactNode, ChangeEventHandler } from 'react';
import { isValidElement } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';

/** Shared adapters keep the existing form contracts while using MUI primitives. */
export function ActionButton({ className = '', type = 'button', ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>) {
  if (className.split(' ').includes('icon-button')) {
    return <IconButton type={type} className={className} {...props} />;
  }
  const variant = className.split(' ').includes('primary') ? 'contained' : className.split(' ').includes('ghost') ? 'outlined' : 'text';
  return <Button type={type} variant={variant} className={className} {...props} />;
}

export function FormInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const { type = 'text', className, name, value, defaultValue, onChange, disabled, required, placeholder, ...htmlInput } = props;
  if (type === 'checkbox') {
    const { checked, defaultChecked, ...inputProps } = htmlInput;
    return <Checkbox className={className} name={name} value={value} defaultChecked={defaultChecked} checked={checked} disabled={disabled} required={required} onChange={onChange} slotProps={{ input: inputProps }} />;
  }
  // File and season-replay inputs retain native browser behavior.
  if (type === 'file' || type === 'range') return <input {...props} />;
  return <TextField className={className} type={type} name={name} value={value} defaultValue={defaultValue} disabled={disabled} required={required} placeholder={placeholder} onChange={onChange as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>} slotProps={{ htmlInput }} />;
}

export function FormSelect({ children, className, value, defaultValue, onChange, name, disabled, required, ...selectProps }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <TextField className={className} select name={name} value={value} defaultValue={defaultValue} disabled={disabled} required={required} onChange={onChange as unknown as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>} slotProps={{ select: { native: true }, htmlInput: selectProps }}>{children}</TextField>;
}

export function FormTextarea({ rows = 4, className, name, value, defaultValue, onChange, required, disabled, placeholder, ...htmlInput }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <TextField fullWidth multiline rows={rows} className={className} name={name} value={value} defaultValue={defaultValue} onChange={onChange as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>} required={required} disabled={disabled} placeholder={placeholder} slotProps={{ htmlInput }} />;
}

export function StatusChip({ children, className = '', ...props }: Omit<HTMLAttributes<HTMLSpanElement>, 'color'>) {
  return <Chip component="span" className={className} label={children} {...props} />;
}

export function ReviewProgress({ children, className = '', ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'color'>) {
  const child = isValidElement<{ style?: { width?: string } }>(children) ? children : null;
  const value = Math.min(100, Math.max(0, parseFloat(child?.props.style?.width || '0')));
  return <LinearProgress aria-label="Review progress" className={className} variant="determinate" value={value} {...props} />;
}

export function WorkpaperPanel({ children, className, ...props }: HTMLAttributes<HTMLElement> & { children?: ReactNode }) {
  return <Paper component="section" variant="outlined" className={className} {...props}>{children}</Paper>;
}
