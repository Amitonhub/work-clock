import { redirect } from 'next/navigation';
import { getServerSession } from '../utils/getServerSession';

async function Page() {

  const session = await getServerSession()
  if (!session) {
    redirect('/login')
  } else {
    redirect('/dashboard')
  }
}

export default Page;