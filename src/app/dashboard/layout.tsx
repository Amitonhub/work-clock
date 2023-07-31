export const metadata = {
  title: 'Work Clock',
  description: 'Attendance Application Using QR Code',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    
  return (
    <div className='dashboard-layout'>
      {children}
    </div>
  )
}
