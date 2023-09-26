import { useAppSelector } from "@/redux/store"

export const metadata = {
  title: 'Work Clock - Dashboard',
  description: 'Attendance Application Using QR Code',
  icons: {
    icon: './favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) { 
  return (
    <>
      {children}
    </>
  )
}
