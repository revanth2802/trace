import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Trace · Tax review workspace', description: 'Every figure has a source. Every decision has a record.' };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en"><body>{children}</body></html>; }
