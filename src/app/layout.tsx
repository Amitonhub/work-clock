'use client'
import './globals.css';
import {Plus_Jakarta_Sans } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { store } from '@/redux/store';
import { Provider } from 'react-redux'
const PlusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="styleSheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          />
        </head>
        <body className={PlusJakartaSans.className}>
              <CssBaseline />
              {children}
              <ToastContainer />
        </body>
      </html>
    </Provider>
  );
}
