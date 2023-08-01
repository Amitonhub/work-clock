import { getServerSession } from '@/utils/getServerSession';
import { redirect } from 'next/navigation';

async function page() {
  const session = await getServerSession()
  if (!session) {
    redirect('/login')
  } else {
    redirect('/dashboard')
  }
}

export default page