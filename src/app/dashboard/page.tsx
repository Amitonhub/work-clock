import { getServerSession } from "@/utils/getServerSession";
import { redirect } from "next/navigation";
import { Dashboard } from '@/views'

async function page() {
  const session = await getServerSession()
  if (!session) {
    redirect('/login')
  } else {
    return <Dashboard />
  }
}

export default page;
