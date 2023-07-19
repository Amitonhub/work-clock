import { getServerSession } from '@/utils/getServerSession'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Work Clock',
  description: 'Attendance Application Using QR Code',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }
  return (
    <div className='dashboard-layout'>
      {children}
    </div>
  )
}
