import type { Metadata } from 'next';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './globals.css';
import Providers from './providers';
export const metadata: Metadata = { title: 'Trace · Tax review workspace', description: 'Every figure has a source. Every decision has a record.' };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en"><body><Providers>{children}</Providers></body></html>; }
