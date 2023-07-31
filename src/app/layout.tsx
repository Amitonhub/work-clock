'use client'
import './globals.css'
import { Inter, Roboto_Slab } from 'next/font/google'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const roboto_slab = Roboto_Slab({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <head>
        <link rel='manifest' href='/manifest.json'/>
        <link rel='styleSheet' href='	https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'/>
       </head>
      <body className={roboto_slab.className}>
        {children}
        <ToastContainer/>
        </body>
    </html>
  )
}